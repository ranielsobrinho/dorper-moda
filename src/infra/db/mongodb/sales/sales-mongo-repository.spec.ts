import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import { SalesMongoRepository } from './sales-mongo-repository'
import MockDate from 'mockdate'

const makeFakeSaleRequest = () => ({
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

const makeGetSales = () => ({
  id: 'any_id',
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
  })
})
