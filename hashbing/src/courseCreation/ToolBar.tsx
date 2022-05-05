import React, { Ref, PropsWithChildren } from 'react'

interface BaseProps {
  className: string
  [key: string]: unknown
}
type OrNull<T> = T | null

export const Menu = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <div {...props} ref={ref} className='flex items-center justify-between' />
  )
)

export const Toolbar = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <div className='flex items-center justify-center border-b-2 border-slate-500 my-2'>
      <div className='w-1/2'>
        <Menu {...props} ref={ref} />
      </div>
    </div>
  )
)
