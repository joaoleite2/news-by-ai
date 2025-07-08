'use client'

import { useState } from 'react'
import EaiNews from './components/EaiNews'
import NewsTopic from './components/NewsTopic'
import TextType from './components/TextType'
import Button from './components/ui/Button'

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

  console.log(newsInfo)

  return (
    <main className='flex flex-col items-center justify-center py-12 bg-gray-100 h-[100dvh]'>
      <EaiNews />
      <NewsTopic setNewsInfo={setNewsInfo} newsInfo={newsInfo} />
      <TextType setNewsInfo={setNewsInfo} newsInfo={newsInfo} />
      <div className='flex absolute bottom-30 right-30 gap-2'>
        <Button variant='secondary'>Cancelar</Button>
        <Button variant='primary'>Próximo</Button>
      </div>
    </main>
  )
}

export default Home