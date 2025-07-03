interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

const Button = ({children, variant = 'primary'}: ButtonProps) => {
  const ui = {
    base: 'rounded-full py-2 px-4 cursor-pointer select-none border-2 transition-all duration-300',
    primary: 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600 hover:border-blue-600',
    secondary: 'bg-white text-gray-800 text-gray-700 border-gray-200 hover:border-gray-300',
  }
  
  return (
    <button className={`${ui.base} ${ui[variant]}`}>
      <span>{children}</span>
    </button>
  )
}

export default Button