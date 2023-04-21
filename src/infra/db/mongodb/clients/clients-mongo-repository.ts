import { MongoHelper } from '../helpers/mongo-helper'
import { CreateClientRepository } from '../../../../data/protocols/db/clients/create-client-repository'
import { GetClientByCpfRepository } from '../../../../data/protocols/db/clients/get-client-by-cpf-repository'
import { GetClientsRepository } from '../../../../data/protocols/db/clients/get-clients-repository'
import { DeleteClientRepository } from '../../../../data/protocols/db/clients/delete-client-repository'

export class ClientsMongoRepository
  implements
    CreateClientRepository,
    GetClientByCpfRepository,
    GetClientsRepository,
    DeleteClientRepository
{
  async create(
    params: CreateClientRepository.Params
  ): Promise<CreateClientRepository.Result> {
    const clientsCollection = MongoHelper.getCollection('clients')
    const client = await clientsCollection.insertOne(params)
    return client && MongoHelper.map(client)
  }

  async getByCpf(cpf: string): Promise<GetClientByCpfRepository.Result> {
    const clientsCollection = MongoHelper.getCollection('clients')
    const clientData = await clientsCollection.findOne({ cpf: cpf })
    if (!clientData) {
      return null
    }
    return clientData && MongoHelper.map(clientData)
  }

  async getAll(): Promise<GetClientsRepository.Result> {
    const clientsCollection = MongoHelper.getCollection('clients')
    const clientData = await clientsCollection.find().toArray()
    return clientData && MongoHelper.mapCollection(clientData)
  }

  async delete(cpf: string): Promise<DeleteClientRepository.Result> {
    const clientsCollection = MongoHelper.getCollection('clients')
    const clientData = await clientsCollection.deleteOne({ cpf })
    if (clientData.deletedCount > 0) {
      return 'OK'
    }
    return null
  }
}
