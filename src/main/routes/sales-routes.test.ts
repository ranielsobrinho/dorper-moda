import { Collection } from 'mongodb'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '../config/app'
import MockDate from 'mockdate'
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

let salesCollection: Collection
let stockCollection: Collection
let accountCollection: Collection
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
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
    await stockCollection.deleteMany({})
    await salesCollection.deleteMany({})
  })

  describe('POST /sales', () => {
    test('Should return 204 on success', async () => {
      const accessToken = await makeAccessToken()
      await stockCollection.insertOne({
        modelName: 'any_model_name',
        description: [
          {
            color: 'any_color_name',
            quantity: 10
          }
        ]
      })
      await request(app)
        .post('/api/sales')
        .set('x-access-token', accessToken)
        .send({
          clientName: 'any_client_name',
          deliveryFee: 25,
          paymentForm: 'CREDIT CARD',
          products: [
            {
              modelName: 'any_model_name',
              description: [
                {
                  color: 'any_color_name',
                  quantity: 1
                }
              ]
            }
          ],
          description: 'any_description',
          soldAt: new Date(),
          total: 110
        })
        .expect(204)
    })
  })

  describe('GET /sales', () => {
    test('Should return 200 on success', async () => {
      const accessToken = await makeAccessToken()
      await salesCollection.insertOne({
        id: 'any_id',
        clientName: 'any_client_name',
        deliveryFee: 25,
        paymentForm: 'CREDIT CARD',
        products: [
          {
            modelName: 'any_model_name',
            description: [
              {
                color: 'any_color_name',
                quantity: 1
              }
            ]
          }
        ],
        description: 'any_description',
        soldAt: new Date(),
        total: 110
      })
      await request(app)
        .get('/api/sales')
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 204 if wrong sale id is provided', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/sales')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })

  describe('GET /sales/saleId', () => {
    test('Should return 200 on success', async () => {
      const accessToken = await makeAccessToken()
      const sale = await salesCollection.insertOne({
        id: 'any_id',
        clientName: 'any_client_name',
        deliveryFee: 25,
        paymentForm: 'CREDIT CARD',
        products: [
          {
            modelName: 'any_model_name',
            description: [
              {
                color: 'any_color_name',
                quantity: 1
              }
            ]
          }
        ],
        description: 'any_description',
        soldAt: new Date(),
        total: 110
      })
      const saleId = sale.insertedId.toString()
      await request(app)
        .get(`/api/sales/${saleId}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 400 if wrong sale id is provided', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/sales/123343555224')
        .set('x-access-token', accessToken)
        .expect(400)
    })
  })

  describe('PUT /sales/saleId', () => {
    test('Should return 204 on success', async () => {
      const accessToken = await makeAccessToken()
      const sale = await salesCollection.insertOne({
        clientName: 'any_client_name',
        deliveryFee: 25,
        paymentForm: 'CREDIT CARD',
        products: [
          {
            modelName: 'any_model_name',
            description: [
              {
                color: 'any_color_name',
                quantity: 1
              }
            ]
          }
        ],
        description: 'any_description',
        soldAt: new Date(),
        total: 110
      })
      const saleId = sale.insertedId.toString()
      await request(app)
        .put(`/api/sales/${saleId}`)
        .set('x-access-token', accessToken)
        .send({
          data: {
            clientName: 'other_client_name',
            deliveryFee: 25,
            paymentForm: 'CREDIT CARD',
            products: [
              {
                modelName: 'any_model_name',
                description: [
                  {
                    color: 'any_color_name',
                    quantity: 1
                  }
                ]
              }
            ],
            description: 'any_description',
            soldAt: new Date(),
            total: 110
          }
        })
        .expect(204)
    })

    test('Should return 403 if wrong id is provided', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .put('/api/sales/123343555224')
        .set('x-access-token', accessToken)
        .send({
          data: {
            clientName: 'other_client_name',
            deliveryFee: 25,
            paymentForm: 'CREDIT CARD',
            products: [
              {
                modelName: 'any_model_name',
                description: [
                  {
                    color: 'any_color_name',
                    quantity: 1
                  }
                ]
              }
            ],
            description: 'any_description',
            soldAt: new Date(),
            total: 110
          }
        })
        .expect(400)
    })

    describe('DELETE /sales/saleId', () => {
      test('Should return 204 on success', async () => {
        const accessToken = await makeAccessToken()
        const sale = await salesCollection.insertOne({
          id: 'any_id',
          clientName: 'any_client_name',
          deliveryFee: 25,
          paymentForm: 'CREDIT CARD',
          products: [
            {
              modelName: 'any_model_name',
              description: [
                {
                  color: 'any_color_name',
                  quantity: 1
                }
              ]
            }
          ],
          description: 'any_description',
          soldAt: new Date(),
          total: 110
        })
        const saleId = sale.insertedId.toString()
        await request(app)
          .delete(`/api/sales/${saleId}`)
          .set('x-access-token', accessToken)
          .expect(204)
      })

      test('Should return 400 if wrong sale id is provided', async () => {
        const accessToken = await makeAccessToken()
        await request(app)
          .delete('/api/sales/123343555224')
          .set('x-access-token', accessToken)
          .expect(400)
      })
    })
  })
})
