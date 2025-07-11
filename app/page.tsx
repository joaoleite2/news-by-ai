'use client'

import { useState } from 'react'
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
  const [ newsInfo, setNewsInfo ] = useState<NewsInfo>({
    topics: [],
    textType: '',
  })
  const [ generatedNews, setGeneratedNews ] = useState<News | null>(null)

  const handleGenerateNews = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/news`, newsInfo)
    setGeneratedNews(response.data)
  }

  return (
    <main className='flex flex-col items-center justify-center py-12 bg-gray-100 min-h-[100dvh]'>
      {
        generatedNews ? (
          <GeneratedNews news={generatedNews} />
        ) : (
          <>
            <EaiNews />
            <NewsTopic setNewsInfo={setNewsInfo} newsInfo={newsInfo} />
            <TextType setNewsInfo={setNewsInfo} newsInfo={newsInfo} />
            <div className='flex absolute bottom-30 right-30 gap-2'>
              <Button variant='secondary'>Cancelar</Button>
              <Button variant='primary' onClick={handleGenerateNews}>Gerar</Button>
            </div>
          </>
      )}
    </main>
  )
}

export default Home