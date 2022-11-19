import { MongoHelper } from '../helpers/mongo-helper'
import { Collection, ObjectId } from 'mongodb'
import { SalesMongoRepository } from './sales-mongo-repository'
import MockDate from 'mockdate'

const makeFakeSaleRequest = () => ({
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

const makeGetSales = () => ({
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

let salesCollection: Collection
describe('SalesMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
    MockDate.set(new Date())
  })

  beforeEach(async () => {
    salesCollection = MongoHelper.getCollection('sales')
    await salesCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
    MockDate.reset()
  })

  const makeSut = (): SalesMongoRepository => {
    return new SalesMongoRepository()
  }

  describe('create()', () => {
    test('Should create a new sales data on success', async () => {
      const sut = makeSut()
      await sut.create(makeFakeSaleRequest())
      const salesData = await salesCollection.findOne({
        clientName: 'any_client_name'
      })
      expect(salesData).toBeTruthy()
      expect(salesData?._id).toBeTruthy()
      expect(salesData?.clientName).toEqual('any_client_name')
    })
  })

  describe('getAll()', () => {
    test('Should return array of sales on success', async () => {
      await salesCollection.insertOne(makeGetSales())
      const sut = makeSut()
      const salesData = await sut.getAll()
      expect(salesData).toBeTruthy()
      expect(salesData).toBeInstanceOf(Array)
    })
  })

  describe('getById()', () => {
    test('Should return a sale on success', async () => {
      const sale = await salesCollection.insertOne(makeGetSales())
      const sut = makeSut()
      const salesData = await sut.getById(sale.insertedId.toString())
      expect(salesData).toBeTruthy()
      expect(salesData?.id).toBeTruthy()
    })

    test('Should return null on fail', async () => {
      const sut = makeSut()
      const salesData = await sut.getById('6338470e2c2a01971011214f')
      expect(salesData).toBe(null)
    })
  })

  describe('update()', () => {
    test('Should update a sale on success', async () => {
      const insertedId = await salesCollection.insertOne(makeFakeSaleRequest())
      const sale = await salesCollection.findOne({ _id: insertedId.insertedId })
      expect(sale).toBeTruthy()
      expect(sale?._id).toBeTruthy()
      expect(sale?.clientName).toBe('any_client_name')
      expect(sale?.total).toBe(110)
      const sut = makeSut()
      await sut.update({
        saleId: insertedId.insertedId.toString(),
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
          total: 150
        }
      })
      const saleUpdate = await salesCollection.findOne({ _id: sale?._id })
      expect(saleUpdate).toBeTruthy()
      expect(saleUpdate?._id).toBeTruthy()
      expect(saleUpdate?.clientName).toBe('other_client_name')
      expect(saleUpdate?.total).toBe(150)
    })
  })

  describe('cancelSale()', () => {
    test('Should return true on delete success', async () => {
      const sale = await salesCollection.insertOne(makeGetSales())
      const sut = makeSut()
      const salesData = await sut.cancelSale(sale.insertedId.toString())
      expect(salesData).toBeTruthy()
    })

    test('Should return false if delete fails', async () => {
      const sale = await salesCollection.insertOne(makeGetSales())
      await salesCollection.deleteOne({ _id: sale.insertedId })
      const sut = makeSut()
      const salesData = await sut.cancelSale(sale.insertedId.toString())
      expect(salesData).toBeFalsy()
    })
  })
})
