import { Collection } from 'mongodb'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '../config/app'

let accountCollection: Collection
describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /singup', () => {
    test('Should return 204 on success', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          username: 'raniel_sobrinho',
          password: '123456789',
          isAdmin: false
        })
        .expect(200)
    })
  })
})
