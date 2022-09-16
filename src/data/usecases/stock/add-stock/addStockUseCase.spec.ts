import { StockModel } from '../../../../domain/models/stock'
import { AddStockRepository } from '../../../protocols/db/stock/addStockRepository'
import { LoadStockByNameRepository } from '../../../protocols/db/stock/loadStockByNameRepository'
import { AddStockUseCase } from './addStockUseCase'

const makeStockDataRequest = () => ({
  modelName: 'any_name',
  color: 'any_color',
  quantity: 1,
})

const makeStockData = (): StockModel => ({
  id: 'any_id',
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

const makeFakeLoadStockRepositoryStub = (): LoadStockByNameRepository => {
  class LoadStocByNamekRepositoryStub implements LoadStockByNameRepository {
    async loadByName(name: string): Promise<StockModel | null> {
      return null
    }
  }
  return new LoadStocByNamekRepositoryStub()
}

type SutTypes = {
  sut: AddStockUseCase
  addStockRepositoryStub: AddStockRepository
  loadStockByNameRepositoryStub: LoadStockByNameRepository
}

const makeSut = (): SutTypes => {
  const addStockRepositoryStub = makeFakeAddStockRepositoryStub()
  const loadStockByNameRepositoryStub = makeFakeLoadStockRepositoryStub()
  const sut = new AddStockUseCase(
    addStockRepositoryStub,
    loadStockByNameRepositoryStub
  )
  return {
    sut,
    addStockRepositoryStub,
    loadStockByNameRepositoryStub,
  }
}

describe('AddStockUseCase', () => {
  test('Should call LoadStockByNameRepository with correct values', async () => {
    const { sut, loadStockByNameRepositoryStub } = makeSut()
    const loadStockSpy = jest.spyOn(loadStockByNameRepositoryStub, 'loadByName')
    await sut.execute(makeStockDataRequest())
    expect(loadStockSpy).toHaveBeenCalledWith(makeStockDataRequest().modelName)
  })

  test('Should throw if LoadStockByNameRepository throws', async () => {
    const { sut, loadStockByNameRepositoryStub } = makeSut()
    jest
      .spyOn(loadStockByNameRepositoryStub, 'loadByName')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.execute(makeStockDataRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an error if AddStockRepository returns an stockModel', async () => {
    const { sut, loadStockByNameRepositoryStub } = makeSut()
    jest
      .spyOn(loadStockByNameRepositoryStub, 'loadByName')
      .mockReturnValueOnce(Promise.resolve(makeStockData()))
    const error = sut.execute(makeStockDataRequest())
    await expect(error).rejects.toThrow(
      new Error('A stock with this name already exists')
    )
  })

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
