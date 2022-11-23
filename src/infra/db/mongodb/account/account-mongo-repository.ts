import { AddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async create(
    params: AddAccountRepository.Params
  ): Promise<AddAccountRepository.Result> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(params)
    const accountId = result.insertedId
    const account = await accountCollection.findOne(accountId)
    if (account) {
      return MongoHelper.map(account)
    }
    return null
  }
}
