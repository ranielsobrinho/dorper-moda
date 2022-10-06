import { CreateSalesRepository } from '../../../../data/protocols/db/sales/createSalesRepository'
import { GetSalesRepository } from '../../../../data/protocols/db/sales/get-sales-repository'
import { GetSaleByIdRepository } from '../../../../data/protocols/db/sales/get-sale-by-id-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'
import { UpdateSaleRepository } from '../../../../data/protocols/db/sales/update-sale-repository'

export class SalesMongoRepository
  implements
    CreateSalesRepository,
    GetSalesRepository,
    GetSaleByIdRepository,
    UpdateSaleRepository
{
  async create(
    params: CreateSalesRepository.Params
  ): Promise<CreateSalesRepository.Result> {
    const salesCollection = MongoHelper.getCollection('sales')
    await salesCollection.insertOne(params)
  }

  async getAll(): Promise<GetSalesRepository.Result> {
    const salesCollection = MongoHelper.getCollection('sales')
    const salesData = await salesCollection
      .find()
      .sort({ soldAt: -1 })
      .toArray()
    return MongoHelper.mapCollection(salesData)
  }

  async getById(saleId: string): Promise<GetSaleByIdRepository.Result> {
    const salesCollection = MongoHelper.getCollection('sales')
    const objectId = new ObjectId(saleId)
    const saleData = await salesCollection.findOne({ _id: objectId })
    if (!saleData) {
      return null
    }
    return saleData && MongoHelper.map(saleData)
  }

  async update(
    params: UpdateSaleRepository.Params
  ): Promise<UpdateSaleRepository.Result> {
    const { saleId, data } = params
    const salesCollection = MongoHelper.getCollection('sales')
    const objectId = new ObjectId(saleId)
    await salesCollection.findOneAndUpdate(
      { _id: objectId },
      {
        $set: {
          clientName: data.clientName,
          deliveryFee: data.deliveryFee,
          paymentForm: data.paymentForm,
          products: data.products,
          total: data.total
        }
      }
    )
  }
}
