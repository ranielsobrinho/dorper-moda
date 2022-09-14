import { AddStockRepository } from '../../../protocols/db/stock/addStockRepository'
import { AddStockUseCase } from './addStockUseCase'

const makeStockDataRequest = () => ({
  modelName: 'any_name',
  color: 'any_color',
  quantity: 1,
})

const makeFakeAddStockRepositoryStub = (): AddStockRepository => {
  class AddStockRepositoryStub implements AddStockRepository {
    async add({}): Promise<void> {
      return
    }
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
    addStockRepositoryStub,
  }
}

describe('AddStockUseCase', () => {
  test('Should call AddStockRepository with correct values', async () => {
    const { sut, addStockRepositoryStub } = makeSut()
    const addStockSpy = jest.spyOn(addStockRepositoryStub, 'add')
    await sut.execute(makeStockDataRequest())
    expect(addStockSpy).toHaveBeenCalledWith(makeStockDataRequest())
  })
})
