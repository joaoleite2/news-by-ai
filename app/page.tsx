'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import EaiNews from './components/EaiNews'
import NewsTopic from './components/NewsTopic'
import TextType from './components/TextType'
import Button from './components/ui/Button'
import axios from 'axios'
import GeneratedNews from './components/GeneratedNews'

export interface News {
  title: string,
  text: string,
  font?: string[]
}

export interface NewsInfo {
  topics: string[]
  textType: string
}

const Home = () => {
  const [ nextStep, setNextStep ] = useState(false)
  const [ newsInfo, setNewsInfo ] = useState<NewsInfo>({
    topics: [],
    textType: '',
  })
  const [ generatedNews, setGeneratedNews ] = useState<News | null>(null)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ loadingProgress, setLoadingProgress ] = useState(0)

  const handleGenerateNews = async () => {
    setIsLoading(true)
    setLoadingProgress(0)
    
    const steps = [
      { progress: 20, message: 'Analisando tópicos selecionados...' },
      { progress: 40, message: 'Processando informações...' },
      { progress: 60, message: 'Gerando conteúdo...' },
      { progress: 80, message: 'Finalizando...' },
      { progress: 90, message: 'Quase pronto!' }
    ]
    
    let currentStep = 0
    
    const progressInterval = setInterval(() => {
      if (currentStep < steps.length) {
        setLoadingProgress(steps[currentStep].progress)
        currentStep++
      } else {
        clearInterval(progressInterval)
      }
    }, 1000)

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/news`, newsInfo)
      setLoadingProgress(100)
      setTimeout(() => {
        setGeneratedNews(response.data)
        setIsLoading(false)
        setLoadingProgress(0)
      }, 500)
    } catch (error) {
      console.error('Erro ao gerar notícia:', error)
      setIsLoading(false)
      setLoadingProgress(0)
    }
  }

  return (
    <main className='flex flex-col items-center justify-center py-12 bg-gray-100 min-h-[100dvh]'>
      {isLoading ? (
        <div className='flex flex-col items-center justify-center'>
          <motion.div 
            className='w-64 h-4 bg-gray-200 rounded-full overflow-hidden'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className='h-full bg-blue-500 rounded-full'
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          <motion.p 
            className='text-gray-600 mt-4 text-lg font-medium'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Gerando sua notícia... {Math.round(loadingProgress)}%
          </motion.p>
          <motion.p 
            className='text-gray-500 mt-2 text-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {loadingProgress < 30 && 'Analisando tópicos selecionados...'}
            {loadingProgress >= 30 && loadingProgress < 60 && 'Processando informações...'}
            {loadingProgress >= 60 && loadingProgress < 90 && 'Finalizando conteúdo...'}
            {loadingProgress >= 90 && 'Quase pronto!'}
          </motion.p>
        </div>
              ) : generatedNews ? (
          <GeneratedNews 
            news={generatedNews} 
            onReset={() => {
              setGeneratedNews(null)
              setNextStep(false)
              setNewsInfo({ topics: [], textType: '' })
            }}
          />
        ) : (
        <>
          <EaiNews />
          <AnimatePresence mode="wait">
            {nextStep ? (
              <motion.div
                key="textType"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <TextType setNewsInfo={setNewsInfo} newsInfo={newsInfo} />
              </motion.div>
            ) : (
              <motion.div
                key="newsTopic"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <NewsTopic setNewsInfo={setNewsInfo} newsInfo={newsInfo} />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div 
            className='flex absolute bottom-30 right-30 gap-2'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {nextStep ? (
              <>
                <Button variant='secondary' onClick={() => setNextStep(false)}>Voltar</Button>
                <Button variant='primary' onClick={handleGenerateNews}>Gerar</Button>
              </>
            ) : (
              <Button variant='primary' onClick={() => setNextStep(true)}>Próximo</Button>
            )}
          </motion.div>
        </>
      )}
    </main>
  )
}

export default Home