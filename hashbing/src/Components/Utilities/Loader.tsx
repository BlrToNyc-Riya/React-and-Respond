import React from "react"

type Props = {}

const Loader = (props: Props) => {
  return (
    <div className='flex w-1/4 h-1/4 items-center justify-space-between absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='flex'>
        <span className='animate-bounce h-10 w-10 rounded-full bg-sky-400 opacity-75'></span>
        <span className='animate-bounce h-10 w-10 animation-delay-200 rounded-full bg-sky-400 opacity-75'></span>
        <span className='animate-bounce h-10 w-10 animation-delay-400 rounded-full bg-sky-400 opacity-75'></span>
      </div>
    </div>
  )
}

export default Loader
