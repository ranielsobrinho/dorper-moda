import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import { StockMongoRepository } from './stock-mongo-repository'

let stockCollection: Collection
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

  describe('add()', () => {
    test('Should create a new stock data on success', async () => {
      const sut = new StockMongoRepository()
      await sut.add({
        modelName: 'any_name',
        color: 'any_color',
        quantity: 1,
      })
      const stockData = await stockCollection.findOne({ modelName: 'any_name' })
      expect(stockData).toBeTruthy()
      expect(stockData?._id).toBeTruthy()
      expect(stockData?.modelName).toBe('any_name')
      expect(stockData?.color).toBe('any_color')
      expect(stockData?.quantity).toBe(1)
    })
  })
})
