import { MongoHelper } from '../helpers/mongo-helper'
import { CreateClientRepository } from '../../../../data/protocols/db/clients/create-client-repository'
import { GetClientByCpfRepository } from '../../../../data/protocols/db/clients/get-client-by-cpf-repository'
import { GetClientsRepository } from '../../../../data/protocols/db/clients/get-clients-repository'
import { DeleteClientRepository } from '../../../../data/protocols/db/clients/delete-client-repository'
import { UpdateClientRepository } from '../../../../data/protocols/db/clients/update-client-repository'
import { ClientsModel } from '../../../../domain/models/clients'

export class ClientsMongoRepository
  implements
    CreateClientRepository,
    GetClientByCpfRepository,
    GetClientsRepository,
    DeleteClientRepository,
    UpdateClientRepository
{
  async create(
    params: CreateClientRepository.Params
  ): Promise<CreateClientRepository.Result> {
    const clientsCollection = MongoHelper.getCollection('clients')
    const { cpf } = params
    await clientsCollection.insertOne(params)
    const client = await clientsCollection.findOne({ cpf })
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

  async update(
    params: UpdateClientRepository.Params
  ): Promise<UpdateClientRepository.Result> {
    const clientsCollection = MongoHelper.getCollection('clients')
    const { cpf, address, baseFee, name, telephone } = params
    await clientsCollection.findOneAndUpdate(
      { cpf },
      {
        $set: {
          name: name,
          address: address,
          telephone: telephone,
          cpf: cpf,
          baseFee: baseFee
        }
      }
    )
    const client = await clientsCollection.findOne({ cpf })
    return client && MongoHelper.map(client)
  }
}
