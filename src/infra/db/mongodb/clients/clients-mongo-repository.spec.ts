import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import { ClientsMongoRepository } from './clients-mongo-repository'
import { CreateClientRepository } from '../../../../data/protocols/db/clients/create-client-repository'

const makeFakeClientRequest = (): CreateClientRepository.Params => ({
  name: 'any_name',
  address: 'any_address',
  cpf: 'any_cpf',
  telephone: 'any_telephone',
  baseFee: 10
})

const makeGetClient = (): CreateClientRepository.Params => ({
  name: 'any_name',
  address: 'any_address',
  cpf: 'any_cpf',
  telephone: 'any_telephone',
  baseFee: 10
})

let clientsCollection: Collection
describe('ClientsMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  beforeEach(async () => {
    clientsCollection = MongoHelper.getCollection('clients')
    await clientsCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  const makeSut = (): ClientsMongoRepository => {
    return new ClientsMongoRepository()
  }

  describe('create()', () => {
    test('Should create a new client on success', async () => {
      const sut = makeSut()
      await sut.create(makeFakeClientRequest())
      const clientData = await clientsCollection.findOne({
        cpf: 'any_cpf'
      })
      expect(clientData).toBeTruthy()
      expect(clientData?.name).toEqual('any_name')
    })
  })

  describe('getByCpf()', () => {
    test('Should return a client on success', async () => {
      await clientsCollection.insertOne(makeGetClient())
      const sut = makeSut()
      const clientData = await sut.getByCpf(makeGetClient().cpf)
      expect(clientData).toBeTruthy()
      expect(clientData?.name).toEqual('any_name')
    })

    test('Should return null on fail', async () => {
      const sut = makeSut()
      const clientData = await sut.getByCpf('6338470e2c2a01971011214f')
      expect(clientData).toBe(null)
    })
  })
})
