'use client'

import { motion } from 'motion/react'
import { Link2, Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react'
import { News } from '../page'
import EaiNews from './EaiNews'
import { useState } from 'react'

interface GeneratedNewsProps {
  news: News
  onReset?: () => void
}

const GeneratedNews = ({ news, onReset }: GeneratedNewsProps) => {  
  const [copied, setCopied] = useState(false)
  
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
      new URL(font)
      return true
    } catch (error) {
      if(error) {
        return false
      }
      return false
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(news.text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Erro ao copiar:', error)
    }
  }

  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
  const formattedTime = currentDate.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  })
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto px-4"
    >
      <EaiNews />
             <motion.div 
         className="bg-white rounded-2xl shadow-xl overflow-hidden mt-8 border border-gray-100"
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.5, delay: 0.2 }}
       >
         <div className="news-header-gradient text-white p-4 sm:p-6 md:p-8">
           <motion.h1 
             className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.3 }}
           >
             {news.title}
           </motion.h1>
          
          <motion.div 
            className="flex flex-wrap items-center gap-4 text-blue-100 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{formattedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Gerado por IA</span>
            </div>
          </motion.div>
        </div>

                 <motion.div 
           className="p-4 sm:p-6 md:p-8 lg:p-12"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.5, delay: 0.5 }}
         >
          <div className="news-content">
            {splitIntoParagraphs(news.text).map((paragraph, index) => (
              <motion.p 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>

                 <motion.div 
           className="bg-amber-50 border-l-4 border-amber-400 px-4 sm:px-6 py-3 sm:py-4"
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.5, delay: 0.6 }}
         >
           <div className="flex items-start gap-2 sm:gap-3">
             <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 bg-amber-100 rounded-full flex items-center justify-center">
               <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-600 rounded-full"></div>
             </div>
             <div className="text-xs sm:text-sm text-amber-800">
               <p className="font-medium">Lembrete de Verificação</p>
               <p className="mt-1">Recomendamos revisar este conteúdo antes de utilizá-lo em contextos profissionais ou acadêmicos.</p>
             </div>
           </div>
         </motion.div>

                 <motion.div 
           className="bg-gray-50 px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-t border-gray-100"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.7 }}
         >
           <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
             <div className="flex items-center gap-3">
               <button
                 onClick={handleCopy}
                 className="btn-secondary flex items-center gap-2 text-sm sm:text-base"
               >
                 <Share2 className="w-4 h-4" />
                 {copied ? 'Copiado!' : 'Compartilhar'}
               </button>
             </div>
             
             <button
               onClick={onReset || (() => window.location.reload())}
               className="btn-primary flex items-center gap-2 text-sm sm:text-base"
             >
               <ArrowLeft className="w-4 h-4" />
               Gerar nova notícia
             </button>
           </div>
         </motion.div>
      </motion.div>

      {news.font && news.font.length > 0 && (
                 <motion.div 
           className="mt-8 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.8 }}
         >
           <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-b border-gray-200">
             <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
               <Link2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
               Fontes Utilizadas
             </h2>
             <p className="text-gray-600 mt-1 text-sm sm:text-base">Referências e materiais consultados para esta notícia</p>
           </div>
           
           <div className="p-4 sm:p-6 md:p-8">
             <div className="grid gap-3 sm:gap-4">
              {news.font.map((font, index) => (
                                 <motion.div
                   key={index}
                   className="bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-4 hover:bg-gray-100 transition-colors"
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                 >
                   <div className="flex items-start gap-2 sm:gap-3">
                     <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                       <Link2 className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                     </div>
                     <div className="flex-1 min-w-0">
                       {fontIsUrl(font) ? (
                         <a 
                           href={font} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="text-blue-600 hover:text-blue-800 break-all hover:underline text-sm sm:text-base"
                         >
                           {font}
                         </a>
                       ) : (
                         <span className="text-gray-700 break-all text-sm sm:text-base">{font}</span>
                       )}
                     </div>
                   </div>
                 </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default GeneratedNews