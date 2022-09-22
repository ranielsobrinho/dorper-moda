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

  describe('POST /stock', () => {
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

  describe('GET /stock', () => {
    test('Should return 200 on success', async () => {
      await stockCollection.insertOne({
        modelName: 'any_name',
        color: 'any_color',
        quantity: 1
      })
      await request(app).get('/api/stock').expect(200)
    })
  })

  describe('GET /stock/1', () => {
    test('Should return 200 on success', async () => {
      const stockData = await stockCollection.insertOne({
        modelName: 'any_name',
        color: 'any_color',
        quantity: 1
      })
      const id = stockData.insertedId.toString()
      await request(app).get(`/api/stock/${id}`).expect(200)
    })

    test('Should return 403 if wrong id is provided', async () => {
      await request(app).get('/api/stock/123343555224').expect(403)
    })
  })

  describe('DELETE /stock/1', () => {
    test('Should return 200 on success', async () => {
      const stockData = await stockCollection.insertOne({
        modelName: 'any_name',
        color: 'any_color',
        quantity: 1
      })
      const id = stockData.insertedId.toString()
      await request(app).delete(`/api/stock/${id}`).expect(204)
    })

    test('Should return 403 if wrong id is provided', async () => {
      await request(app).delete('/api/stock/123343555224').expect(403)
    })
  })
})
