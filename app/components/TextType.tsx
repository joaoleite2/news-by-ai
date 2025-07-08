'use client'

import { Library, ListCollapse, Zap } from 'lucide-react'
import Card from './ui/Card'
import { useState } from 'react'
import { NewsInfo } from '../page'

interface CardType {
  title: string
  description: string
  icon: React.ReactNode
  color: 'amber' | 'blue' | 'red'
}

const cards: CardType[] = [
  {
    title: 'Leitura Rápida',
    description: 'Receba notícias em formato de leitura rápida, com resumos e informações essenciais.',
    icon: <Zap fill='currentColor' size={30} className='text-amber-500' />,
    color: 'amber'
  },
  {
    title: 'Leitura Detalhada',
    description: 'Receba notícias em formato de leitura detalhada, com informações completas e detalhes.',
    icon: <Library fill='currentColor' size={30} className='text-blue-500' />,
    color: 'blue'
  },
  {
    title: 'Pontos-Chave ',
    description: 'Receba notícias em formato de pontos-chave, com informações essenciais e detalhadas.',
    icon: <ListCollapse fill='currentColor' size={30} className='text-red-500' />,
    color: 'red'
  }
]

interface TextTypeProps {
  setNewsInfo: React.Dispatch<React.SetStateAction<NewsInfo>>
  newsInfo: NewsInfo
}

const TextType: React.FC<TextTypeProps> = ({ setNewsInfo, newsInfo }) => {

  const handleClick = (index: number) => {
    setNewsInfo({ ...newsInfo, textType: cards[index].title })
  }

  return (
    <section className='flex flex-col justify-center items-center mt-5'>
      <div className='flex gap-4'>
        {cards.map((card, index) => (
          <Card 
            key={index} 
            title={card.title} 
            description={card.description} 
            icon={card.icon} 
            color={card.color}
            selected={newsInfo.textType === card.title}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </section>
  )
}

export default TextType