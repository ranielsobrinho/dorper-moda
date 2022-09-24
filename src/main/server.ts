import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    console.log('Mongodb connected')
    const app = (await import('./config/app')).default
    app.listen(env.port, () =>
      console.log(`Server running on http://localhost:${5000}`)
    )
  })
  .catch((err) => console.error(err))
