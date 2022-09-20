import { Collection } from 'mongodb'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '../config/app'

let stockCollection: Collection
describe('Stock Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    stockCollection = MongoHelper.getCollection('stocks')
    await stockCollection.deleteMany({})
  })

  test('Should return 204 on success', async () => {
    await request(app)
      .post('/api/stock')
      .send({
        modelName: 'any_name',
        color: 'any_color',
        quantity: 1
      })
      .expect(204)
  })
})
