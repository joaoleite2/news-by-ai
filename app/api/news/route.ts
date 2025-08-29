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

    // Obter o token de autenticação
    const client = await auth.getIdTokenClient(cloudRunUrl);
    const token = await client.idTokenProvider.fetchIdToken(cloudRunUrl);

    // Usar Axios diretamente para ter melhor controle dos erros
    const response = await axios.post(`${cloudRunUrl}/news`, newsInfo, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
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
        const status = error.response?.status || 500;
        let errorMessage = 'Erro ao conectar com o servidor.';
        
        // Tratar especificamente o erro 429
        if (status === 429) {
          errorMessage = error.response?.data?.message || 'Você atingiu o limite de noticias por hoje. Tente novamente amanhã.';
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
        }
        
        return NextResponse.json(
            { error: errorMessage },
            { status: status }
        );
    }

    return NextResponse.json(
      { error: 'Ocorreu um erro interno no servidor.' },
      { status: 500 }
    );
  }
}