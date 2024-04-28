import { renderToString } from 'react-dom/server'
import { App } from 'antd'

export function render() {
  return renderToString(<App />)
}
