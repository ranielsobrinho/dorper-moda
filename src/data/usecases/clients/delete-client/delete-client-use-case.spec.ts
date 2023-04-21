import { DeleteClientRepository } from '../../../protocols/db/clients/delete-client-repository'
import { DeleteClientUseCase } from './delete-client-by-use-case'

const makeDeleteClientRepositoryStub = (): DeleteClientRepository => {
  class DeleteClientRepositoryStub implements DeleteClientRepository {
    async delete(_cpf: string): Promise<DeleteClientRepository.Result> {
      return 'OK'
    }
  }
  return new DeleteClientRepositoryStub()
}

type SutTypes = {
  sut: DeleteClientUseCase
  deleteClientRepositoryStub: DeleteClientRepository
}

const makeSut = (): SutTypes => {
  const deleteClientRepositoryStub = makeDeleteClientRepositoryStub()
  const sut = new DeleteClientUseCase(deleteClientRepositoryStub)
  return {
    sut,
    deleteClientRepositoryStub
  }
}

describe('DeleteClientUseCase', () => {
  test('Should call DeleteClientRepository with correct values', async () => {
    const { sut, deleteClientRepositoryStub } = makeSut()
    const deleteClientSpy = jest.spyOn(deleteClientRepositoryStub, 'delete')
    await sut.execute('any_cpf')
    expect(deleteClientSpy).toHaveBeenCalledWith('any_cpf')
  })

  test('Should throw if DeleteClientRepository throws', async () => {
    const { sut, deleteClientRepositoryStub } = makeSut()
    jest
      .spyOn(deleteClientRepositoryStub, 'delete')
      .mockRejectedValueOnce(new Error())
    const promise = sut.execute('any_cpf')
    await expect(promise).rejects.toThrow(new Error())
  })

  test('Should return null if DeleteClientRepository returns null', async () => {
    const { sut, deleteClientRepositoryStub } = makeSut()
    jest.spyOn(deleteClientRepositoryStub, 'delete').mockResolvedValueOnce(null)
    const response = await sut.execute('any_cpf')
    expect(response).toBe(null)
  })

  test('Should return OK on success', async () => {
    const { sut } = makeSut()
    const response = await sut.execute('any_cpf')
    expect(response).toEqual('OK')
  })
})
