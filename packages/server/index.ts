import dotenv from 'dotenv'
import cors from 'cors'
import type { ViteDevServer } from 'vite'
import { createServer as createViteServer } from 'vite'
import express from 'express'
import * as path from 'path'
import * as fs from 'fs'

dotenv.config()

async function startServer() {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001

  const isDev = () => process.env.NODE_ENV === 'development'

  let vite: ViteDevServer | undefined
  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const clientPath = path.dirname(require.resolve('client'))
  const ssrDistPath = require.resolve('client/dist-ssr/client.cjs')

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  }

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string

      if (!isDev()) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        )
      } else {
        template = fs.readFileSync(
          path.resolve(clientPath, 'index.html'),
          'utf-8'
        )

        template = await vite!.transformIndexHtml(url, template)
      }

      let render: () => Promise<string>
      if (!isDev()) {
        render = (await import(ssrDistPath)).render
      } else {
        render = (
          await vite!.ssrLoadModule(path.resolve(clientPath, 'ssr.tsx'))
        ).render
      }

      const appHtml = await render()

      const html = template.replace(`<!--ssr-outlet-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite!.ssrFixStacktrace(e as Error)
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
