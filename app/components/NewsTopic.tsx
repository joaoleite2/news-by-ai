'use client'

import TopicSelector from './ui/TopicSelector'
import { NewsInfo } from '../page'

interface NewsTopicProps {
    setNewsInfo: React.Dispatch<React.SetStateAction<NewsInfo>>
    newsInfo: NewsInfo
}

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
  'Internacional',
  'Esportes',
  'Entretenimento',
  'Meio Ambiente',
  'Ciência',
  'Cultura',
  'Meio Ambiente',
  'Internacional',
  'Esportes',
  'Ciência',
  'Cultura',
  'Entretenimento',
  'Segurança Pública'
]

const NewsTopic: React.FC<NewsTopicProps> = ({ setNewsInfo, newsInfo }) => {
  const handleSelect = (topic: string) => {
    if(newsInfo.topics.length < 4) {
      setNewsInfo({ ...newsInfo, topics: [...newsInfo.topics, topic] })
    }
    if(newsInfo.topics.includes(topic)) {
      setNewsInfo({ ...newsInfo, topics: newsInfo.topics.filter(t => t !== topic) })
    }
  }
    
  return (
    <section className='flex flex-col justify-center items-center mt-5 px-4'>
      <div className='flex justify-center flex-wrap w-full max-w-4xl gap-2 bg-white rounded-lg p-3 sm:p-4 md:p-6'>
        {topics.map((topic, index) => (
          <TopicSelector key={index} topic={topic} isSelected={newsInfo.topics.includes(topic)} onSelect={handleSelect} />
        ))}
      </div>
      <p className='text-gray-500 text-xs sm:text-sm mt-4 sm:mt-5 text-center'>
        {newsInfo.topics.length}/4 assuntos selecionados
      </p>
    </section>
  )
}

export default NewsTopic