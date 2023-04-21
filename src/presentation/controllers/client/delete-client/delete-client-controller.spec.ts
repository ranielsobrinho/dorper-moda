import { DeleteClientController } from './delete-client-controller'
import { HttpRequest } from '../../../protocols'
import {
  badRequest,
  noContent,
  serverError
} from '../../../helpers/http-helper'
import { DeleteClient } from '../../../../domain/usecases/clients/delete-client'

const makeFakeClientRequest = (): HttpRequest => ({
  params: {
    cpf: 'any_cpf'
  }
})

const makeDeleteClientStub = (): DeleteClient => {
  class DeleteClientStub implements DeleteClient {
    async execute(cpf: string): Promise<DeleteClient.Result> {
      return Promise.resolve('OK')
    }
  }
  return new DeleteClientStub()
}

type SutTypes = {
  sut: DeleteClientController
  deleteClientStub: DeleteClient
}

const makeSut = (): SutTypes => {
  const deleteClientStub = makeDeleteClientStub()
  const sut = new DeleteClientController(deleteClientStub)
  return {
    sut,
    deleteClientStub
  }
}

describe('DeleteClientController', () => {
  test('Should call DeleteClient with correct values', async () => {
    const { sut, deleteClientStub } = makeSut()
    const createClientSpy = jest.spyOn(deleteClientStub, 'execute')
    await sut.handle(makeFakeClientRequest())
    expect(createClientSpy).toHaveBeenCalledWith('any_cpf')
  })

  test('Should return 500 if DeleteClient throws', async () => {
    const { sut, deleteClientStub } = makeSut()
    jest
      .spyOn(deleteClientStub, 'execute')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(makeFakeClientRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 400 if DeleteClient returns null', async () => {
    const { sut, deleteClientStub } = makeSut()
    jest
      .spyOn(deleteClientStub, 'execute')
      .mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeFakeClientRequest())
    expect(httpResponse).toEqual(
      badRequest(new Error('Não há cliente com o cpf cadastrado.'))
    )
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeClientRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
