import { CreateSalesRepository } from '../../../../data/protocols/db/sales/createSalesRepository'
import { GetSalesRepository } from '../../../../data/protocols/db/sales/get-sales-repository'
import { GetSaleByIdRepository } from '../../../../data/protocols/db/sales/get-sale-by-id-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class SalesMongoRepository
  implements CreateSalesRepository, GetSalesRepository, GetSaleByIdRepository
{
  async create(
    params: CreateSalesRepository.Params
  ): Promise<CreateSalesRepository.Result> {
    const salesCollection = MongoHelper.getCollection('sales')
    await salesCollection.insertOne(params)
  }

  async getAll(): Promise<GetSalesRepository.Result> {
    const salesCollection = MongoHelper.getCollection('sales')
    const salesData = await salesCollection.find().toArray()
    return MongoHelper.mapCollection(salesData)
  }

  async getById(saleId: string): Promise<GetSaleByIdRepository.Result> {
    const salesCollection = MongoHelper.getCollection('sales')
    const objectId = new ObjectId(saleId)
    const saleData = await salesCollection.findOne({ _id: objectId })
    return saleData && MongoHelper.map(saleData)
  }
}
