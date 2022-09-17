import { AddStockRepository } from '../../../../data/protocols/db/stock/addStockRepository'
import { LoadStockByNameRepository } from '../../../../data/protocols/db/stock/loadStockByNameRepository'
import { MongoHelper } from '../helpers/mongo-helper'

export class StockMongoRepository
  implements AddStockRepository, LoadStockByNameRepository
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
}
