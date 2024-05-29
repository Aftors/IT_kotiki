import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './src/components/App/App'
import { Provider } from 'react-redux'
import { store } from './src/store/store'

export const render = async url => {
  return {
    html: ReactDOMServer.renderToString(
      <React.StrictMode>
        <Provider store={store}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </Provider>
      </React.StrictMode>
    ),
    initialState: store.getState(),
  }
}
