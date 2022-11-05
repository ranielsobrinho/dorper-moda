import { AddStockRepository } from '../../../../data/protocols/db/stock/add-stock-repository'
import { GetStockByIdRepository } from '../../../../data/protocols/db/stock/get-stock-by-id-repository'
import { LoadStockByNameRepository } from '../../../../data/protocols/db/stock/load-stock-by-name-repository'
import { LoadStocksRepository } from '../../../../data/protocols/db/stock/load-stocks-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'
import { DeleteStockRepository } from '../../../../data/protocols/db/stock/delete-stock-repository'
import { UpdateStockRepository } from '../../../../data/protocols/db/stock/update-stock-repository'
import { CheckNameStockRepository } from '../../../../data/protocols/db/stock/check-name-stock-repository'
import { CheckQuantityStockRepository } from '../../../../data/protocols/db/stock/check-quantity-stock-repository'
import { RefundStockRepository } from '../../../../data/protocols/db/stock/refund-stock-repository'

export class StockMongoRepository
  implements
    AddStockRepository,
    LoadStockByNameRepository,
    LoadStocksRepository,
    GetStockByIdRepository,
    DeleteStockRepository,
    UpdateStockRepository,
    CheckNameStockRepository,
    CheckQuantityStockRepository,
    RefundStockRepository
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
          description: data.description
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

  async checkStockQuantity(
    data: CheckQuantityStockRepository.Params
  ): Promise<CheckQuantityStockRepository.Result> {
    const stockCollection = MongoHelper.getCollection('stocks')
    const search = stockCollection.find({
      modelName: { $in: data.map(({ modelName }) => modelName) }
    })
    const stockData = await search.toArray()
    for (const stock of stockData) {
      for (const dataCompare of data) {
        if (dataCompare.modelName === stock.modelName) {
          for (const dataDescription of dataCompare.description) {
            for (const description of stock.description) {
              if (
                dataDescription.color === description.color &&
                dataDescription.quantity <= description.quantity
              ) {
                const newQuantity =
                  description.quantity - dataDescription.quantity
                await stockCollection.updateOne(
                  {
                    modelName: dataCompare.modelName,
                    'description.color': description.color
                  },
                  { $set: { 'description.$.quantity': newQuantity } }
                )
              } else if (
                dataCompare.modelName === stock.modelName &&
                dataDescription.quantity > description.quantity
              ) {
                return false
              }
            }
          }
        }
      }
    }
    return true
  }

  async refundStock(
    params: RefundStockRepository.Params
  ): Promise<RefundStockRepository.Result> {
    const stockCollection = MongoHelper.getCollection('stocks')
    const search = stockCollection.find({
      modelName: { $in: params.map(({ modelName }) => modelName) }
    })
    const stockData = await search.toArray()

    for (const stock of stockData) {
      for (const dataCompare of params) {
        if (dataCompare.modelName === stock.modelName) {
          for (const dataDescription of dataCompare.description) {
            for (const description of stock.description) {
              if (dataDescription.color === description.color) {
                const newQuantity =
                  Number(description.quantity) +
                  Number(dataDescription.quantity)
                const success = await stockCollection.updateOne(
                  {
                    modelName: dataCompare.modelName,
                    'description.color': dataDescription.color
                  },
                  { $set: { 'description.$.quantity': newQuantity } }
                )
                if (success.matchedCount < 1) {
                  return false
                }
              }
            }
          }
        }
      }
    }
    return true
  }
}
