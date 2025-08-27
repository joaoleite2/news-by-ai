import { NextResponse } from 'next/server';
import { GoogleAuth } from 'google-auth-library';
import axios from 'axios';

export async function POST(request: Request) {
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || !process.env.CLOUD_RUN_URL) {
    console.error('❌ ERRO: Variáveis de ambiente não configuradas.');
    return NextResponse.json(
      { error: 'Configuração do servidor incompleta.' },
      { status: 500 }
    );
  }

  try {
    const newsInfo = await request.json();
    const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON!);
    const cloudRunUrl = process.env.CLOUD_RUN_URL;

    const auth = new GoogleAuth({
      credentials,
    });

    const client = await auth.getIdTokenClient(cloudRunUrl);
    const response = await client.request({
      url: `${cloudRunUrl}/news`,
      method: 'POST',
      data: newsInfo,
    });
    
    return NextResponse.json(response.data);

  } catch (error) {
    console.error('Erro na API de notícias:', error);
    
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Erro na configuração das credenciais do Google Cloud.' },
        { status: 500 }
      );
    }

    if (axios.isAxiosError(error)) {
        return NextResponse.json(
            { error: 'Erro ao buscar dados do serviço.', details: error.response?.data || error.message },
            { status: error.response?.status || 500 }
        );
    }

    return NextResponse.json(
      { error: 'Ocorreu um erro interno no servidor.' },
      { status: 500 }
    );
  }
}