interface CardProps {
  title: string
  description: string
  icon: React.ReactNode
  color?: string
  selected?: boolean
  onClick?: () => void
}

const Card = ({ title, description, icon, color, selected, onClick }: CardProps) => {  
  const getColorClasses = (color?: string) => {
    switch (color) {
      case 'amber':
        return {
          border: selected ? 'border-amber-500' : 'border-gray-200',
          hover: 'hover:border-amber-500'
        }
      case 'blue':
        return {
          border: selected ? 'border-blue-500' : 'border-gray-200',
          hover: 'hover:border-blue-500'
        }
      case 'red':
        return {
          border: selected ? 'border-red-500' : 'border-gray-200',
          hover: 'hover:border-red-500'
        }
      default:
        return {
          border: 'border-gray-200',
          hover: 'hover:border-gray-300'
        }
    }
  }

  const colorClasses = getColorClasses(color)
  
  return (
    <div className={`
      cursor-pointer flex flex-col p-4 rounded-3xl w-[250px] bg-white h-[280px] transition-all
      duration-200 border-2 ${colorClasses.border} ${colorClasses.hover} hover:scale-105
    `}
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