'use client'

import { useState } from 'react'
import EaiNews from './components/EaiNews'
import NewsTopic from './components/NewsTopic'
import TextType from './components/TextType'
import Button from './components/ui/Button'
import axios from 'axios'

export interface NewsInfo {
  topics: string[]
  textType: string
  text: string
}

const Home = () => {
  const [ newsInfo, setNewsInfo ] = useState<NewsInfo>({
    topics: [],
    textType: '',
    text: ''
  })

  const handleGenerateNews = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/news`, newsInfo)
    console.log(response.data)
  }

  return (
    <main className='flex flex-col items-center justify-center py-12 bg-gray-100 h-[100dvh]'>
      <EaiNews />
      <NewsTopic setNewsInfo={setNewsInfo} newsInfo={newsInfo} />
      <TextType setNewsInfo={setNewsInfo} newsInfo={newsInfo} />
      <div className='flex absolute bottom-30 right-30 gap-2'>
        <Button variant='secondary'>Cancelar</Button>
        <Button variant='primary' onClick={handleGenerateNews}>Gerar</Button>
      </div>
    </main>
  )
}

export default Home