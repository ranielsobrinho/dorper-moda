import { Collection } from 'mongodb'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '../config/app'
import MockDate from 'mockdate'

let salesCollection: Collection
let stockCollection: Collection
describe('Sales Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
    MockDate.set(new Date())
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
    MockDate.reset()
  })

  beforeEach(async () => {
    stockCollection = MongoHelper.getCollection('stocks')
    salesCollection = MongoHelper.getCollection('sales')
    await stockCollection.deleteMany({})
    await salesCollection.deleteMany({})
  })

  describe('POST /sales', () => {
    test('Should return 204 on success', async () => {
      await stockCollection.insertOne({
        modelName: 'any_model_name',
        color: 'any_color_name',
        quantity: 10
      })
      await request(app)
        .post('/api/sales')
        .send({
          clientName: 'any_client_name',
          deliveryFee: 25,
          paymentForm: 'CREDIT CARD',
          products: [
            {
              modelName: 'any_model_name',
              color: 'any_color_name',
              quantity: 1
            }
          ],
          soldAt: new Date(),
          total: 110
        })
        .expect(204)
    })
  })
})
