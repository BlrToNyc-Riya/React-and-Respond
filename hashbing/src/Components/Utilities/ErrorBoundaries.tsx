import React, { ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

class ErrorBoundaries extends React.Component<Props, {}> {
  state = {
    error: null
  }

  static getDerivedStateFromError (error: Error) {
    // Update state so next render shows fallback UI.
    return { error: error }
  }

  componentDidCatch (error: Error, info: ErrorInfo) {
    // Log the error to an error reporting service
    console.error('Uncaught error:', error, info)
  }

  render () {
    if (this.state.error) {
      // You can render any custom fallback UI
      return (
        <p>Oops an Error has occurred. Our support team will be notified</p>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundaries
