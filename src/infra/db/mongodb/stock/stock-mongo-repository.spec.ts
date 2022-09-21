import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import { StockMongoRepository } from './stock-mongo-repository'

let stockCollection: Collection

const makeStockRequest = () => ({
  modelName: 'any_name',
  color: 'any_color',
  quantity: 1
})

describe('StockMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  beforeEach(async () => {
    stockCollection = MongoHelper.getCollection('stocks')
    await stockCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  const makeSut = (): StockMongoRepository => {
    return new StockMongoRepository()
  }

  describe('add()', () => {
    test('Should create a new stock data on success', async () => {
      const sut = makeSut()
      await sut.add(makeStockRequest())
      const stockData = await stockCollection.findOne({ modelName: 'any_name' })
      expect(stockData).toBeTruthy()
      expect(stockData?._id).toBeTruthy()
      expect(stockData?.modelName).toBe('any_name')
      expect(stockData?.color).toBe('any_color')
      expect(stockData?.quantity).toBe(1)
    })
  })

  describe('loadByName()', () => {
    test('Should return a stock data on success', async () => {
      const sut = makeSut()
      await stockCollection.insertOne(makeStockRequest())
      const stockData = await sut.loadByName('any_name')
      expect(stockData).toBeTruthy()
      expect(stockData?.id).toBeTruthy()
      expect(stockData?.modelName).toBe('any_name')
      expect(stockData?.color).toBe('any_color')
      expect(stockData?.quantity).toBe(1)
    })
  })

  describe('loadAll()', () => {
    test('Should return an array of stocks on success', async () => {
      const sut = makeSut()
      const stockData = await sut.loadAll()
      expect(stockData).toBeTruthy()
    })
  })

  describe('getById()', () => {
    test('Should return a stock on success', async () => {
      const stock = await stockCollection.insertOne(makeStockRequest())
      const sut = makeSut()
      const stockData = await sut.getById(stock.insertedId.toString())
      expect(stockData).toBeTruthy()
    })
  })
})
