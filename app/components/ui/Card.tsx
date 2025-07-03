interface CardProps {
  title: string
  description: string
  icon: React.ReactNode
  color?: string
}

const Card = ({ title, description, icon, color }: CardProps) => {
  const colors = {
    'amber': 'hover:border-amber-500',
    'blue': 'hover:border-blue-500',
    'red': 'hover:border-red-500'
  }
  
  return (
    <div className={`
      cursor-pointer flex flex-col bg-white border-2 border-gray-200 p-4 rounded-3xl
      w-[250px] h-[280px] transition-all duration-300 ${colors[color as keyof typeof colors] || ''}
      hover:scale-103`}
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