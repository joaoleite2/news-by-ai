# E.A.I News

Uma aplicação web moderna que gera notícias personalizadas usando inteligência artificial. O front-end é construído com Next.js, React e Tailwind CSS, oferecendo uma experiência de usuário fluida e responsiva.

## 🚀 Funcionalidades

- **Interface Moderna**: Design limpo e intuitivo com animações suaves
- **Seleção de Tópicos**: Escolha entre diversos temas de notícias
- **Tipos de Texto**: Diferentes estilos de escrita (formal, informal, técnico, etc.)
- **Geração em Tempo Real**: Barra de progresso animada durante a geração
- **Responsivo**: Funciona perfeitamente em desktop e mobile
- **Tratamento de Erros**: Páginas de erro personalizadas para diferentes cenários

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React com Turbopack
- **React 19** - Biblioteca de interface do usuário
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Motion** - Animações e transições
- **Axios** - Cliente HTTP
- **Lucide React** - Ícones modernos

## 📦 Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/joaoleite2/news-by-ai.git
   cd news-by-ai
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   
   Crie um arquivo `.env.local` na raiz do projeto:
   ```env
   # Configurações do Google Cloud (OPCIONAL para testes)
   GOOGLE_APPLICATION_CREDENTIALS_JSON={"type":"service_account",...}
   CLOUD_RUN_URL=https://seu-servico.cloud.run
   ```

4. **Execute o projeto**
   ```bash
   npm run dev
   ```

   A aplicação estará disponível em `http://localhost:3000`

## 🔧 Configuração para Desenvolvimento

### Testando sem Credenciais (Recomendado para Desenvolvimento)

Para testar o front-end sem configurar as credenciais do Google Cloud, você pode usar dados mock:

#### Opção 1: Modificar a API Route

Edite o arquivo `app/api/news/route.ts`:

```typescript
export async function POST(request: Request) {
  // Comentar ou remover esta verificação
  // if (!process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || !process.env.CLOUD_RUN_URL) {
  //   console.error('❌ ERRO: Variáveis de ambiente não configuradas.');
  //   return NextResponse.json(
  //     { error: 'Configuração do servidor incompleta.' },
  //     { status: 500 }
  //   );
  // }

  // Retornar dados mock para testes
  return NextResponse.json({
    title: "Notícia de Teste",
    text: "Esta é uma notícia gerada para fins de teste. O sistema está funcionando corretamente!",
    font: ["Arial", "Helvetica"]
  });
}
```

#### Opção 2: Usar Variáveis de Ambiente Vazias

Configure o `.env.local` com valores vazios:

```env
GOOGLE_APPLICATION_CREDENTIALS_JSON=
CLOUD_RUN_URL=
```

E modifique a verificação na API para permitir valores vazios:

```typescript
if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON && process.env.CLOUD_RUN_URL) {
  // Lógica original com credenciais
} else {
  // Retornar dados mock
  return NextResponse.json({
    title: "Notícia de Teste",
    text: "Esta é uma notícia gerada para fins de teste.",
    font: ["EA.I. News"]
  });
}
```

### Conectando com Backend Local

Se você tem o backend [news-by-ai-back](https://github.com/joaoleite2/news-by-ai-back) rodando localmente, você pode configurar o front-end para se conectar a ele:

1. **Configure a variável de ambiente** no `.env.local`:
   ```env
   CLOUD_RUN_URL=http://localhost:8080
   ```

2. **Certifique-se de que o backend está rodando** na porta 8080 (ou ajuste a URL conforme necessário)

3. **Execute o front-end**:
   ```bash
   npm run dev
   ```

Agora o front-end se conectará ao seu backend local em vez de usar dados mock.

### Para Produção

Se você quiser usar a funcionalidade completa com IA em produção, configure as credenciais do Google Cloud:

1. **Crie uma conta de serviço no Google Cloud Console**
2. **Baixe o arquivo JSON das credenciais**
3. **Configure as variáveis de ambiente**:
   - `GOOGLE_APPLICATION_CREDENTIALS_JSON`: Conteúdo do arquivo JSON das credenciais
   - `CLOUD_RUN_URL`: URL do seu serviço Cloud Run

## 📁 Estrutura do Projeto

```
app/
├── api/
│   └── news/
│       └── route.ts          # API para geração de notícias
├── components/
│   ├── ui/
│   │   ├── Button.tsx        # Componente de botão reutilizável
│   │   ├── Card.tsx          # Componente de card
│   │   └── TopicSelector.tsx # Seletor de tópicos
│   ├── EaiNews.tsx           # Componente principal de boas-vindas
│   ├── GeneratedNews.tsx     # Exibição da notícia gerada
│   ├── NewsTopic.tsx         # Seleção de tópicos de notícias
│   └── TextType.tsx          # Seleção do tipo de texto
├── error/
│   └── page.tsx              # Página de tratamento de erros
├── globals.css               # Estilos globais
├── layout.tsx                # Layout principal da aplicação
└── page.tsx                  # Página inicial
```

## 🎨 Componentes Principais

### EaiNews
Componente de boas-vindas com logo + slogan e animações de introdução ao sistema.

### NewsTopic
Interface para seleção de tópicos que serão usados para montar a notícia, com botões interativos.

### TextType
Cards para selecionar o tipo de leitura/texto: Leitura Rápida ou Leitura Detalhada.

### GeneratedNews
Exibição da notícia gerada com opções de gerar outra notícia ou copiar o texto gerado.

## 🚀 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento com Turbopack
- `npm run build` - Gera a build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter ESLint

## 🔍 Tratamento de Erros

A aplicação inclui tratamento robusto de erros:

- **429**: Limite de requisições excedido
- **500**: Erro interno do servidor
- **400**: Requisição inválida
- **Configuração**: Erro de configuração das credenciais

Cada erro redireciona para uma página específica com mensagens claras.

## 📄 Licença

Este projeto está sob licença não licenciada (UNLICENSED).

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request para sugerir melhorias.