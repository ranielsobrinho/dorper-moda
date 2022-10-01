import express from 'express'
import setupRoutes from './routes'
import setupMiddlewares from './middlewares'
import morgan from 'morgan'

morgan.token('body', (req: express.Request) => {
  const isNotGet = req.method !== 'GET'
  if (isNotGet) {
    return JSON.stringify(req.body)
  }
  return 'body-empty'
})

const app = express()
app.use(morgan(':date[iso] :method :url :status :body - :total-time ms'))
setupMiddlewares(app)
setupRoutes(app)

export default app
