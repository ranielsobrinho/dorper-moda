import { CreateSalesRepository } from '../../../../data/protocols/db/sales/createSalesRepository'
import { MongoHelper } from '../helpers/mongo-helper'

export class SalesMongoRepository implements CreateSalesRepository {
  async create(
    params: CreateSalesRepository.Params
  ): Promise<CreateSalesRepository.Result> {
    const salesCollection = MongoHelper.getCollection('sales')
    await salesCollection.insertOne(params)
  }
}
