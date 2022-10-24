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
        description: [
          {
            color: 'any_color_name',
            quantity: 10
          }
        ]
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
              description: [
                {
                  color: 'any_color_name',
                  quantity: 1
                }
              ]
            }
          ],
          soldAt: new Date(),
          total: 110
        })
        .expect(204)
    })
  })

  describe('GET /sales', () => {
    test('Should return 200 on success', async () => {
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
        soldAt: new Date(),
        total: 110
      })
      await request(app).get('/api/sales').expect(200)
    })

    test('Should return 204 on success', async () => {
      await request(app).get('/api/sales').expect(204)
    })
  })

  describe('GET /sales/saleId', () => {
    test('Should return 200 on success', async () => {
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
        soldAt: new Date(),
        total: 110
      })
      const saleId = sale.insertedId.toString()
      await request(app).get(`/api/sales/${saleId}`).expect(200)
    })

    test('Should return 400 on success', async () => {
      await request(app).get('/api/sales/123343555224').expect(400)
    })
  })

  describe('PUT /sales/saleId', () => {
    test('Should return 204 on success', async () => {
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
        soldAt: new Date(),
        total: 110
      })
      const saleId = sale.insertedId.toString()
      await request(app)
        .put(`/api/sales/${saleId}`)
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
            soldAt: new Date(),
            total: 110
          }
        })
        .expect(204)
    })

    test('Should return 403 if wrong id is provided', async () => {
      await request(app)
        .put('/api/sales/123343555224')
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
            soldAt: new Date(),
            total: 110
          }
        })
        .expect(400)
    })

    describe('DELETE /sales/saleId', () => {
      test('Should return 204 on success', async () => {
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
          soldAt: new Date(),
          total: 110
        })
        const saleId = sale.insertedId.toString()
        await request(app).delete(`/api/sales/${saleId}`).expect(204)
      })
    })
  })
})
