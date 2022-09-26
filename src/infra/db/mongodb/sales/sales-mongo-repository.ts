import { CreateSalesRepository } from '../../../../data/protocols/db/sales/createSalesRepository'
import { MongoHelper } from '../helpers/mongo-helper'

export class SalesMongoRepository implements CreateSalesRepository {
  private salesCollection = MongoHelper.getCollection('sales')
  async create(
    params: CreateSalesRepository.Params
  ): Promise<CreateSalesRepository.Result> {
    await this.salesCollection.insertOne(params)
  }
}
