import { AddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import { LoadAccountByUsernameRepository } from '../../../../data/protocols/db/account/load-account-by-username-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository
  implements AddAccountRepository, LoadAccountByUsernameRepository
{
  async create(
    params: AddAccountRepository.Params
  ): Promise<AddAccountRepository.Result> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(params)
    const accountId = result.insertedId
    const account = await accountCollection.findOne(accountId)
    return account && MongoHelper.map(account)
  }

  async loadByUsername(
    username: string
  ): Promise<LoadAccountByUsernameRepository.Result> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.findOne({ username })
    return result && MongoHelper.map(result)
  }
}
