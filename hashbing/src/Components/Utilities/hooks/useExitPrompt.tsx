import { useState, useEffect } from 'react'

const useBeforeUnload = ({
  when,
  message = 'Are you sure you want to leave the page'
}: {
  when: boolean
  message: string
}) => {
  console.log('here', { when })
  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      event.preventDefault()
      console.log('here testing')
      event.returnValue = message
      return message
    }

    if (when) {
      window.addEventListener('beforeunload', handleBeforeUnload)
    }

    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [when, message])
}

export default useBeforeUnload
