import { Library, ListCollapse, Zap } from 'lucide-react'
import Card from './ui/Card'

const cards = [
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
    icon: <ListCollapse fill='currentColor'  size={30} className='text-red-500' />,
    color: 'red'
  }
]

const TextType = () => {
  return (
    <section className='flex flex-col justify-center items-center mt-5'>
      <div className='flex gap-4'>
        {cards.map((card) => (
          <Card key={card.title} title={card.title} description={card.description} icon={card.icon} color={card.color} />
        ))}
      </div>
    </section>
  )
}

export default TextType