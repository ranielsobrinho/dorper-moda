import { AddStockRepository } from '../../../../data/protocols/db/stock/addStockRepository'
import { MongoHelper } from '../helpers/mongo-helper'

export class StockMongoRepository implements AddStockRepository {
  async add(
    stockData: AddStockRepository.Params
  ): Promise<AddStockRepository.Result> {
    const stockCollection = MongoHelper.getCollection('stocks')
    await stockCollection.insertOne(stockData)
  }
}
