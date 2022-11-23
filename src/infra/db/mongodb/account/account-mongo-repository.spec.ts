import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import { AccountMongoRepository } from './account-mongo-repository'

let accountCollection: Collection

const makeCreateAccountRequest = () => ({
  username: 'any_username',
  password: 'hashed_password',
  isAdmin: false
})
describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  describe('create()', () => {
    test('Should create a new account on success', async () => {
      const sut = makeSut()
      const accountData = await sut.create(makeCreateAccountRequest())
      expect(accountData).toBeTruthy()
      expect(accountData?.id).toBeTruthy()
      expect(accountData?.username).toEqual('any_username')
      expect(accountData?.password).toEqual('hashed_password')
      expect(accountData?.isAdmin).toBeFalsy()
    })
  })

  describe('loadByUsername()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      await accountCollection.insertOne(makeCreateAccountRequest())
      const accountData = await sut.loadByUsername('any_username')
      expect(accountData).toBeTruthy()
      expect(accountData?.id).toBeTruthy()
      expect(accountData?.username).toEqual('any_username')
      expect(accountData?.password).toEqual('hashed_password')
      expect(accountData?.isAdmin).toBeFalsy()
    })

    test('Should return null on fail', async () => {
      const sut = makeSut()
      const accountData = await sut.loadByUsername('any_username')
      expect(accountData).toBeFalsy()
    })
  })
})
