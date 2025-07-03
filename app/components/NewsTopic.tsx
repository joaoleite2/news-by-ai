'use client'

import { useState } from 'react'
import TopicSelector from './ui/TopicSelector'

const topics = [
  'Política Nacional',
  'Economia',
  'Tecnologia',
  'Saúde',
  'Educação',
  'Esportes',
  'Entretenimento',
  'Meio Ambiente',
  'Internacional',
  'Ciência',
  'Cultura',
  'Segurança Pública'
]

const NewsTopic = () => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  
  const handleSelect = (topic: string) => {
    if(selectedTopics.length < 7) {
      setSelectedTopics([...selectedTopics, topic])
    }
    if(selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic))
    }
  }
  
  return (
    <section className='flex flex-col justify-center items-center mt-5'>
      <div className='flex justify-center flex-wrap w-[900px] gap-2 bg-white rounded-lg p-4'>
        {topics.map((topic, index) => (
          <TopicSelector key={index} topic={topic} isSelected={selectedTopics.includes(topic)} onSelect={handleSelect} />
        ))}
      </div>
      <p className='text-gray-500 text-sm mt-5'>{selectedTopics.length}/7 assuntos selecionados</p>
    </section>
  )
}

export default NewsTopic