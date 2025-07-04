interface CardProps {
  title: string
  description: string
  icon: React.ReactNode
  color?: string
  selected?: boolean
  onClick?: () => void
}

const Card = ({ title, description, icon, color, selected, onClick }: CardProps) => {
  const colors = {
    'amber': 'border-amber-500',
    'blue': 'border-blue-500',
    'red': 'border-red-500'
  }
  
  return (
    <div className={`
      cursor-pointer flex flex-col p-4 rounded-3xl w-[250px] bg-white h-[280px] transition-all
      duration-300 hover:${colors[color as keyof typeof colors] || ''} hover:scale-103 
      ${selected ? `border-2 ${colors[color as keyof typeof colors]}` : 'border-2 border-gray-200'}`}
      onClick={onClick}
    >
      <h1 className='font-bold text-2xl text-gray-800'>{title}</h1>
      <p className='text-gray-500 text-md mt-2'>
        {description}
      </p>
      <div className='flex-1 flex justify-end items-end'>
        {icon}
      </div>
    </div>
  )
}

export default Card