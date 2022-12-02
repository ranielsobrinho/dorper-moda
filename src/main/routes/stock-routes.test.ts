import { Collection } from 'mongodb'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '../config/app'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

const makeAccessToken = async (): Promise<string> => {
  const account = await accountCollection.insertOne({
    username: 'any_name',
    password: 'hashed_password',
    isAdmin: false
  })
  return sign(account.insertedId.toString(), env.jwtToken)
}

let stockCollection: Collection
let accountCollection: Collection
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
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /stock', () => {
    test('Should return 204 on success', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/api/stock')
        .set('x-access-token', accessToken)
        .send({
          modelName: 'any_name',
          description: [
            {
              color: 'any_color',
              quantity: 1
            }
          ]
        })
        .expect(204)
    })

    test('Should return 403 if no accessToken is provided', async () => {
      await request(app)
        .post('/api/stock')
        .send({
          modelName: 'any_name',
          description: [
            {
              color: 'any_color',
              quantity: 1
            }
          ]
        })
        .expect(403)
    })
  })

  describe('GET /stock', () => {
    test('Should return 200 on success', async () => {
      const accessToken = await makeAccessToken()
      await stockCollection.insertOne({
        modelName: 'any_name',
        description: [
          {
            color: 'any_color',
            quantity: 1
          }
        ]
      })
      await request(app)
        .get('/api/stock')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  describe('GET /stock/1', () => {
    test('Should return 200 on success', async () => {
      const accessToken = await makeAccessToken()
      const stockData = await stockCollection.insertOne({
        modelName: 'any_name',
        description: [
          {
            color: 'any_color',
            quantity: 1
          }
        ]
      })
      const id = stockData.insertedId.toString()
      await request(app)
        .get(`/api/stock/${id}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 403 if wrong id is provided', async () => {
      await request(app).get('/api/stock/123343555224').expect(403)
    })
  })

  describe('GET /stock/any_name', () => {
    test('Should return 200 on success', async () => {
      const accessToken = await makeAccessToken()
      await stockCollection.insertOne({
        modelName: 'any_name',
        description: [
          {
            color: 'any_color',
            quantity: 1
          }
        ]
      })
      await request(app)
        .post('/api/stock/by-name')
        .set('x-access-token', accessToken)
        .send({ stockName: 'any_name' })
        .expect(200)
    })

    test('Should return 403 if wrong stock name is provided', async () => {
      const accessToken = await makeAccessToken()
      await stockCollection.insertOne({
        modelName: 'any_name',
        description: [
          {
            color: 'any_color',
            quantity: 1
          }
        ]
      })
      await request(app)
        .post('/api/stock/by-name')
        .set('x-access-token', accessToken)
        .send({ stockName: 'wrong_name' })
        .expect(403)
    })
  })

  describe('DELETE /stock/1', () => {
    test('Should return 204 on success', async () => {
      const accessToken = await makeAccessToken()
      const stockData = await stockCollection.insertOne({
        modelName: 'any_name',
        description: [
          {
            color: 'any_color',
            quantity: 1
          }
        ]
      })
      const id = stockData.insertedId.toString()
      await request(app)
        .delete(`/api/stock/${id}`)
        .set('x-access-token', accessToken)
        .expect(204)
    })

    test('Should return 403 if wrong id is provided', async () => {
      await request(app).delete('/api/stock/123343555224').expect(403)
    })
  })

  describe('UPDATE /stock/1', () => {
    test('Should return 204 on success', async () => {
      const accessToken = await makeAccessToken()
      const stockData = await stockCollection.insertOne({
        modelName: 'any_name',
        description: [
          {
            color: 'any_color',
            quantity: 1
          }
        ]
      })
      const id = stockData.insertedId.toString()
      await request(app)
        .put(`/api/stock/${id}`)
        .set('x-access-token', accessToken)
        .send({
          data: {
            modelName: 'other_name',
            description: [
              {
                color: 'other_color',
                quantity: 22
              }
            ]
          }
        })
        .expect(204)
    })

    test('Should return 403 if wrong id is provided', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .put('/api/stock/123343555224')
        .set('x-access-token', accessToken)
        .send({
          data: {
            modelName: 'other_name',
            description: [
              {
                color: 'other_color',
                quantity: 22
              }
            ]
          }
        })
        .expect(403)
    })
  })
})
