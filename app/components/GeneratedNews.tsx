import { News } from '../page'

interface GeneratedNewsProps {
  news: News
}

const GeneratedNews = ({ news }: GeneratedNewsProps) => {
  console.log(news)
  
  const splitIntoParagraphs = (text: string): string[] => {
    if (!text) return []
    const cleaned = text.replace(/\[\d+(,\s*\d+)*\]/g, '')
  
    const paragraphRegex = /\. (?=[A-ZÁÉÍÓÚÃÕÂÊÎÔÛ])/g
    const paragraphs = cleaned
      .split(paragraphRegex)
      .map((part, index, arr) => (index < arr.length - 1 ? part + '.' : part))
      .map(p => p.trim())
      .filter(p => p.length > 0)
  
    return paragraphs
  }

  return (
    <div className='w-1/2 min-w-[500px] bg-white rounded-lg overflow-hidden'>
      <div className='flex flex-col justify-center bg-blue-100 p-4'>
        <h1 className='text-2xl font-bold'>{news.title}</h1>
        <span>Gerada em 10/07/2025, 20:30</span>
      </div>
      <div className='flex flex-col justify-center bg-red-100 p-4'>
        {splitIntoParagraphs(news.text).map((paragraph, index) => (
          <>
          <p key={index}>{paragraph}</p><br />
          </>
        ))}
      </div>
      <div className='flex flex-col justify-center bg-amber-100 p-4'>
        {news.font?.map((font, index) => (
          <>
          <p key={index}>{font}</p><br/>
          </>
        ))}
      </div>
    </div>
  )
}

export default GeneratedNews