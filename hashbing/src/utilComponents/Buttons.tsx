import React from 'react'

type Props = {
  active: boolean
  onMouseDown: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  text?: string
  children?: React.ReactNode
}

function Buttons ({ active, onMouseDown, text, children }: Props) {
  // check if children is icon
  if (children) {
    return (
      <button
        className={`${active ? 'activeIcon' : 'disabledIcon'}`}
        onMouseDown={onMouseDown}
      >
        {children}
      </button>
    )
  }
  return (
    <button
      className={`btn ${active ? 'activeBtn' : 'disabledBtn'}`}
      onMouseDown={onMouseDown}
    >
      {text ? text : children}
    </button>
  )
}

export default Buttons
