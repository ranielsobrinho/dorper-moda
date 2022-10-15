import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import { StockMongoRepository } from './stock-mongo-repository'

let stockCollection: Collection

const makeStockRequest = () => ({
  modelName: 'any_name',
  description: [
    {
      color: 'any_color',
      quantity: 1
    }
  ]
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
      expect(stockData?.description).toBeTruthy()
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
      expect(stockData?.description).toBeTruthy()
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

  describe('delete()', () => {
    test('Should delete a stock on success', async () => {
      const stock = await stockCollection.insertOne(makeStockRequest())
      expect(stock).toBeTruthy()
      const sut = makeSut()
      await sut.delete(stock.insertedId.toString())
      const stockData = await stockCollection.findOne({ _id: stock.insertedId })
      expect(stockData).toBeFalsy()
    })
  })

  describe('update()', () => {
    test('Should update a stock data on success', async () => {
      const inserted = await stockCollection.insertOne(makeStockRequest())
      const stock = await stockCollection.findOne({ _id: inserted.insertedId })
      expect(stock).toBeTruthy()
      expect(stock?._id).toBeTruthy()
      expect(stock?.modelName).toBe('any_name')
      expect(stock?.description).toBeTruthy()

      const sut = makeSut()
      const id = inserted.insertedId.toString()
      await sut.update({
        stockId: id,
        data: {
          modelName: 'other_name',
          description: [
            {
              color: 'any_color',
              quantity: 1
            }
          ]
        }
      })
      const stockData = await stockCollection.findOne({ _id: stock?._id })
      expect(stockData).toBeTruthy()
      expect(stockData?._id).toBeTruthy()
      expect(stockData?.modelName).toBe('other_name')
      expect(stockData?.description).toBeTruthy()
    })
  })

  describe('checkStock()', () => {
    test('Should return true if the names provided exists', async () => {
      const stock = await stockCollection.insertOne(makeStockRequest())
      expect(stock).toBeTruthy()
      const sut = makeSut()
      const stockData = await sut.checkStock(['any_name', 'other_name'])
      expect(stockData).toBeTruthy()
    })

    test('Should return false if the names provided does not exists', async () => {
      const stock = await stockCollection.insertOne(makeStockRequest())
      expect(stock).toBeTruthy()
      const sut = makeSut()
      const stockData = await sut.checkStock(['wrong_name'])
      expect(stockData).toBeFalsy()
    })
  })

  describe('checkStockQuantity()', () => {
    test('Should return true if the quantity provided is less or equal product quantity', async () => {
      await stockCollection.insertOne({
        modelName: 'other_name',
        description: [
          {
            color: 'other_color',
            quantity: 10
          }
        ]
      })
      const stock = await stockCollection.insertOne(makeStockRequest())
      expect(stock).toBeTruthy()
      const sut = makeSut()
      const stockData = await sut.checkStockQuantity([
        {
          modelName: 'any_name',
          description: {
            color: 'any_color',
            quantity: 1
          }
        },
        {
          modelName: 'other_name',
          description: {
            color: 'other_color',
            quantity: 1
          }
        }
      ])
      expect(stockData).toBeTruthy()
    })

    test('Should return false if the quantity provided is more than product quantity', async () => {
      await stockCollection.insertOne({
        modelName: 'other_name',
        description: [
          {
            color: 'other_color',
            quantity: 10
          }
        ]
      })
      const stock = await stockCollection.insertOne(makeStockRequest())
      expect(stock).toBeTruthy()
      const sut = makeSut()
      const stockData = await sut.checkStockQuantity([
        {
          modelName: 'any_name',
          description: {
            color: 'any_color',
            quantity: 1
          }
        },
        {
          modelName: 'other_name',
          description: {
            color: 'other_color',
            quantity: 50
          }
        }
      ])
      expect(stockData).toBeFalsy()
    })
  })
})
