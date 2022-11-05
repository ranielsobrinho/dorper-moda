import { AddStockRepository } from '../../../protocols/db/stock/add-stock-repository'
import { AddStockUseCase } from './add-stock-use-case'

const makeStockDataRequest = (): AddStockRepository.Params => ({
  modelName: 'any_name',
  description: [
    {
      color: 'any_color',
      quantity: 1
    }
  ]
})

const makeFakeAddStockRepositoryStub = (): AddStockRepository => {
  class AddStockRepositoryStub implements AddStockRepository {
    // eslint-disable-next-line no-empty-pattern
    async add({}): Promise<void> {}
  }
  return new AddStockRepositoryStub()
}

type SutTypes = {
  sut: AddStockUseCase
  addStockRepositoryStub: AddStockRepository
}

const makeSut = (): SutTypes => {
  const addStockRepositoryStub = makeFakeAddStockRepositoryStub()
  const sut = new AddStockUseCase(addStockRepositoryStub)
  return {
    sut,
    addStockRepositoryStub
  }
}

describe('AddStockUseCase', () => {
  test('Should call AddStockRepository with correct values', async () => {
    const { sut, addStockRepositoryStub } = makeSut()
    const addStockSpy = jest.spyOn(addStockRepositoryStub, 'add')
    await sut.execute(makeStockDataRequest())
    expect(addStockSpy).toHaveBeenCalledWith(makeStockDataRequest())
  })

  test('Should throw if AddStockRepository throws', async () => {
    const { sut, addStockRepositoryStub } = makeSut()
    jest
      .spyOn(addStockRepositoryStub, 'add')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.execute(makeStockDataRequest())
    await expect(promise).rejects.toThrow()
  })
})
