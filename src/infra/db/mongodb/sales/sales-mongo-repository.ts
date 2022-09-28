import { CreateSalesRepository } from '../../../../data/protocols/db/sales/createSalesRepository'
import { GetSalesRepository } from '../../../../data/protocols/db/sales/get-sales-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class SalesMongoRepository
  implements CreateSalesRepository, GetSalesRepository
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
}
