type Props = {
  name: string
  children?: React.ReactNode
  onClick?: () => void
  type?: 'submit' | 'button'
  className?: string
}

function Button ({
  name,
  children,
  onClick,
  type,
  className
}: Props): React.ReactElement {
  if (children) {
    return (
      <button
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${className} flex items-center justify-center`}
        type={type}
        onClick={onClick}
      >
        {`${name ? name : 'button'}`}
        {children}
      </button>
    )
  }
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${className}`}
      type={type}
      onClick={onClick}
    >{`${name ? name : 'button'}`}</button>
  )
}

export default Button
