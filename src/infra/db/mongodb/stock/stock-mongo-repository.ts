import { AddStockRepository } from '../../../../data/protocols/db/stock/addStockRepository'
import { GetStockByIdRepository } from '../../../../data/protocols/db/stock/getStockByIdRepository'
import { LoadStockByNameRepository } from '../../../../data/protocols/db/stock/loadStockByNameRepository'
import { LoadStocksRepository } from '../../../../data/protocols/db/stock/loadStocksRepository'
import { MongoHelper } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'
import { DeleteStockRepository } from '../../../../data/protocols/db/stock/deleteStockRepository'
import { UpdateStockRepository } from '../../../../data/protocols/db/stock/updateStockRepository'
import { CheckNameStockRepository } from '../../../../data/protocols/db/stock/checkNameStockRepository'

export class StockMongoRepository
  implements
    AddStockRepository,
    LoadStockByNameRepository,
    LoadStocksRepository,
    GetStockByIdRepository,
    DeleteStockRepository,
    UpdateStockRepository,
    CheckNameStockRepository
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

  async delete(stockId: string): Promise<number> {
    const stockCollection = MongoHelper.getCollection('stocks')
    const objectId = new ObjectId(stockId)
    const deletedData = await stockCollection.deleteOne({ _id: objectId })
    return deletedData.deletedCount
  }

  async update(
    params: UpdateStockRepository.Params
  ): Promise<UpdateStockRepository.Result> {
    const { stockId, data } = params
    const stockCollection = MongoHelper.getCollection('stocks')
    const objectId = new ObjectId(stockId)
    await stockCollection.findOneAndUpdate(
      { _id: objectId },
      {
        $set: {
          modelName: data.modelName,
          color: data.color,
          quantity: data.quantity
        }
      }
    )
  }

  async checkStock(
    data: CheckNameStockRepository.Params
  ): Promise<CheckNameStockRepository.Result> {
    const names = Object.values(data)
    const stockCollection = MongoHelper.getCollection('stocks')
    const search = stockCollection.find({ modelName: { $in: names } })
    const stockData = await search.toArray()
    if (stockData.length >= 1) {
      return true
    }
    return false
  }
}
