import { Link2 } from 'lucide-react'
import { News } from '../page'
import EaiNews from './EaiNews'
import axios from 'axios'

interface GeneratedNewsProps {
  news: News
}

const GeneratedNews = ({ news }: GeneratedNewsProps) => {  
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

  const fontIsUrl = (font: string) => {
    try {
      const url = new URL(font)
      const checkExists = axios.get(url.href)
      return true
    } catch (error) {
      return false
    }
  }
  
  return (
    <>
    <EaiNews />
    <div className='w-1/2 min-w-[500px] bg-white rounded-lg overflow-hidden shadow mt-10'>
      <div className='flex flex-col justify-center bg-blue-50 p-8'>
        <h1 className='text-2xl font-bold'>{news.title}</h1>
        <span>Gerada em 10/07/2025, 20:30</span>
      </div>
      <div className='flex flex-col justify-center bg-white p-8 text-lg'>
        {splitIntoParagraphs(news.text).map((paragraph, index) => (
          <>
          <p key={index}>{paragraph}</p><br />
          </>
        ))}
      </div>
      <div className='flex flex-col justify-center bg-gray-50 p-8 gap-2'>
        <h2 className='text-lg font-bold'>Fontes utilizadas</h2>
        <ul className='flex flex-col gap-2'>
          {news.font?.map((font, index) =>
            <li className='text-gray-600 bg-white cursor-default border-2 break-all border-gray-200 p-4 rounded-lg flex items-center' key={index}>
              {fontIsUrl(font) ? 
              <>
              <div className='w-1/4'>
                <Link2 className='w-4 h-4 mr-2' /> 
              </div>
              {font}
              </>
              : null}
              {font}
            </li>
          )}
        </ul>
      </div>
    </div>
    </>
  )
}

export default GeneratedNews