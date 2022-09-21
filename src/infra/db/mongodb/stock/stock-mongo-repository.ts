import { AddStockRepository } from '../../../../data/protocols/db/stock/addStockRepository'
import { GetStockByIdRepository } from '../../../../data/protocols/db/stock/getStockByIdRepository'
import { LoadStockByNameRepository } from '../../../../data/protocols/db/stock/loadStockByNameRepository'
import { LoadStocksRepository } from '../../../../data/protocols/db/stock/loadStocksRepository'
import { MongoHelper } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class StockMongoRepository
  implements
    AddStockRepository,
    LoadStockByNameRepository,
    LoadStocksRepository,
    GetStockByIdRepository
{
  async add(
    stockData: AddStockRepository.Params
  ): Promise<AddStockRepository.Result> {
    const stockCollection = MongoHelper.getCollection('stocks')
    await stockCollection.insertOne(stockData)
  }

  async loadByName(name: string): Promise<LoadStockByNameRepository.Result> {
    const stockCollection = MongoHelper.getCollection('stocks')
    const stockData = await stockCollection.findOne({ modelName: name })
    return stockData && MongoHelper.map(stockData)
  }

  async loadAll(): Promise<LoadStocksRepository.Result> {
    const stockCollection = MongoHelper.getCollection('stocks')
    const stockData = await stockCollection.find().toArray()
    return MongoHelper.mapCollection(stockData)
  }

  async getById(stockId: string): Promise<GetStockByIdRepository.Result> {
    const stockCollection = MongoHelper.getCollection('stocks')
    const objectId = new ObjectId(stockId)
    const stockData = await stockCollection.findOne({ _id: objectId })
    return stockData && MongoHelper.map(stockData)
  }
}
