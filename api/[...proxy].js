import { GoogleAuth } from 'google-auth-library';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL

export default async function handler(req, res) {
  try {
    // 1. Pega as credenciais das variáveis de ambiente da Vercel
    const client_email = process.env.GCP_CLIENT_EMAIL;
    // O Vercel pode bagunçar as quebras de linha, então corrigimos isso.
    const private_key = process.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n');

    if (!client_email || !private_key) {
      throw new Error("Credenciais do GCP não configuradas na Vercel.");
    }

    // 2. Cria um cliente de autenticação do Google
    const auth = new GoogleAuth({
      credentials: {
        client_email,
        private_key,
      },
    });

    // 3. Gera um token de identidade para a URL do nosso backend
    const client = await auth.getIdTokenClient(BACKEND_URL);

    // 4. Monta a URL completa para o backend
    // req.url remove o prefixo /api que a Vercel usa
    const backendRequestUrl = `${BACKEND_URL}${req.url.replace('/api', '')}`;

    // 5. Faz a requisição para o backend, adicionando o token de autenticação
    const backendResponse = await client.request({
      url: backendRequestUrl,
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        // Copia outros headers da requisição original, se necessário
        ...req.headers,
      },
      body: req.body,
    });

    // 6. Retorna a resposta do backend para o frontend
    res.status(backendResponse.status).send(backendResponse.data);

  } catch (error) {
    console.error("Erro no proxy da API:", error.response?.data || error.message);
    res.status(500).json({
      message: "Erro ao se comunicar com o serviço de backend.",
      error: error.message,
    });
  }
}