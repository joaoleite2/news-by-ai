'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Button from '../components/ui/Button'

const ErrorContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const errorCode = searchParams.get('code') || '429'
  const errorMessage = searchParams.get('message') || ''

  const handleGoHome = () => {
    router.push('/')
  }

  const getErrorContent = (code: string) => {
    switch (code) {
      case '429':
        return {
          title: 'Limite Atingido',
          description: 'Você já gerou o número máximo de notícias permitidas para hoje. Para continuar, volte amanhã!',
          info: 'Limite diário: 5 notícias',
          color: 'blue'
        }
      case '500':
        return {
          title: 'Erro do Servidor',
          description: 'Ocorreu um erro interno em nossos servidores. Tente novamente em alguns minutos.',
          info: 'Erro interno do sistema',
          color: 'red'
        }
      case '400':
        return {
          title: 'Dados Inválidos',
          description: 'Os dados fornecidos estão incorretos. Verifique as informações e tente novamente.',
          info: 'Verifique os dados enviados',
          color: 'amber'
        }
      default:
        return {
          title: 'Erro Inesperado',
          description: errorMessage || 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
          info: 'Erro desconhecido',
          color: 'gray'
        }
    }
  }

  const errorContent = getErrorContent(errorCode)

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 border-blue-200 text-blue-700'
      case 'red':
        return 'bg-red-50 border-red-200 text-red-700'
      case 'amber':
        return 'bg-amber-50 border-amber-200 text-amber-700'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700'
    }
  }

  return (
    <main className='flex flex-col items-center justify-center py-12 bg-gray-100 min-h-[100dvh]'>
      <div className='bg-white rounded-3xl p-8 shadow-lg border border-gray-200 max-w-md w-full mx-4'>
        <div className='flex flex-col items-center text-center'>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 leading-tight'>
            {errorContent.title.split(' ')[0]} <span className='text-blue-500'>{errorContent.title.split(' ')[1]}</span>
          </h1>
          <p className='text-sm sm:text-base text-gray-600 mt-4 leading-relaxed'>
            {errorContent.description}
          </p>
          
          <div className={`mt-6 p-4 rounded-lg border w-full ${getColorClasses(errorContent.color)}`}>
            <p className='text-sm font-medium'>
              {errorContent.info}
            </p>
          </div>

          <div className='flex justify-center mt-8 w-full'>
            <Button variant='primary' onClick={handleGoHome}>
              Voltar ao Início
            </Button>
          </div>
        </div>
      </div>

      <div className='text-center mt-8 px-4'>
        <p className='text-gray-500 text-sm'>
          Obrigado por usar nossa plataforma!
        </p>
        <p className='text-gray-400 text-xs mt-1'>
          Volte amanhã para mais conteúdo incrível
        </p>
      </div>
    </main>
  )
}

const Error = () => {
  return (
    <Suspense fallback={
      <main className='flex flex-col items-center justify-center py-12 bg-gray-100 min-h-[100dvh]'>
        <div className='bg-white rounded-3xl p-8 shadow-lg border border-gray-200 max-w-md w-full mx-4'>
          <div className='flex flex-col items-center text-center'>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 leading-tight'>
              Carregando...
            </h1>
          </div>
        </div>
      </main>
    }>
      <ErrorContent />
    </Suspense>
  )
}

export default Error