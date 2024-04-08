import { Component } from 'react'
import { ServerErrorPage } from '../../pages/ErrorPage/ServerErrorPage'

export class ErrorBoundary extends Component<any, any> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch() {
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return <ServerErrorPage />
    }

    return this.props.children
  }
}
export default ErrorBoundary
