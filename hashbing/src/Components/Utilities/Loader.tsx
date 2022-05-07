import React from "react"

type Props = {}

const Loader = (props: Props) => {
  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-indigo-600 scale-150 rounded-full '>
      <svg
        className='animate-spin h-5 w-5 mr-3 bg-blue '
        viewBox='24 24 24 24'
      ></svg>
    </div>
  )
}

export default Loader
