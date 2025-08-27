import { GoogleAuth } from 'google-auth-library';
import { NextRequest, NextResponse } from 'next/server';

// TROQUE PELA SUA URL REAL DO CLOUD RUN
const BACKEND_URL = 'https://news-by-ai-207795730317.southamerica-east1.run.app';

async function handler(req: NextRequest) {
  try {
    const client_email = process.env.GCP_CLIENT_EMAIL;
    const private_key = process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!client_email || !private_key) {
      throw new Error("Credenciais do GCP não configuradas no ambiente.");
    }

    const auth = new GoogleAuth({
      credentials: {
        client_email,
        private_key,
      },
    });

    const client = await auth.getIdTokenClient(BACKEND_URL);

    // Constrói a URL do backend, repassando o caminho original
    const backendRequestUrl = `${BACKEND_URL}${req.nextUrl.pathname.replace('/api', '')}`;

    // Filtra os headers para remover os problemáticos
    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      // Remove headers que podem causar problemas de certificado
      if (!['host', 'origin', 'referer'].includes(key.toLowerCase())) {
        headers[key] = value;
      }
    });

    // Adiciona headers específicos para a requisição ao backend
    headers['Content-Type'] = 'application/json';
    headers['User-Agent'] = 'news-by-ai-frontend/1.0';

    // Faz a requisição para o backend com o token de autenticação
    const backendResponse = await client.request({
      url: backendRequestUrl,
      method: req.method,
      headers: headers,
      data: req.body, // Usa 'data' em vez de 'body' para o axios
    });

    // Retorna a resposta do backend para o frontend
    return new NextResponse(JSON.stringify(backendResponse.data), {
      status: backendResponse.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    const errorResponse = (error as { response?: { data?: unknown } })?.response?.data;
    
    console.error("Erro no proxy da API:", errorResponse || errorMessage);
    return NextResponse.json(
      { message: "Erro ao se comunicar com o serviço de backend.", error: errorMessage },
      { status: 500 }
    );
  }
}

// Exporta o mesmo handler para todos os métodos HTTP
export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH };