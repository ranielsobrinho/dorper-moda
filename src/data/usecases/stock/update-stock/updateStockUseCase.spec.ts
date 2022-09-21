import { UpdateStockRepository } from '../../../protocols/db/stock/updateStockRepository'
import { GetStockByIdRepository } from '../../../protocols/db/stock/getStockByIdRepository'
import { UpdateStockUseCase } from './updateStockUseCase'
import { StockModel } from '../../../../domain/models/stock'

const makeStockDataRequest = (): UpdateStockRepository.Params => ({
  stockId: 'any_id',
  data: {
    modelName: 'any_name',
    color: 'any_color',
    quantity: 1
  }
})

const makeFakeStockData = (): StockModel => ({
  id: 'any_id',
  modelName: 'any_name',
  color: 'any_color',
  quantity: 1
})

const makeUpdateStockRepositoryStub = (): UpdateStockRepository => {
  class UpdateStockRepositoryStub implements UpdateStockRepository {
    async update(
      params: UpdateStockRepository.Params
    ): Promise<UpdateStockRepository.Result> {}
  }
  return new UpdateStockRepositoryStub()
}

const makeGetStockByIdRepositoryStub = (): GetStockByIdRepository => {
  class GetStockByIdRepositoryStub implements GetStockByIdRepository {
    async getById(stockId: string): Promise<GetStockByIdRepository.Result> {
      return Promise.resolve(makeFakeStockData())
    }
  }
  return new GetStockByIdRepositoryStub()
}

type SutTypes = {
  sut: UpdateStockUseCase
  updateStockRepositoryStub: UpdateStockRepository
  getStockByIdRepositoryStub: GetStockByIdRepository
}

const makeSut = (): SutTypes => {
  const updateStockRepositoryStub = makeUpdateStockRepositoryStub()
  const getStockByIdRepositoryStub = makeGetStockByIdRepositoryStub()
  const sut = new UpdateStockUseCase(
    updateStockRepositoryStub,
    getStockByIdRepositoryStub
  )
  return {
    sut,
    updateStockRepositoryStub,
    getStockByIdRepositoryStub
  }
}

describe('UpdateStockUseCase', () => {
  test('Should call GetStockByIdRepository with correct values', async () => {
    const { sut, getStockByIdRepositoryStub } = makeSut()
    const getByIdSpy = jest.spyOn(getStockByIdRepositoryStub, 'getById')
    await sut.execute(makeStockDataRequest())
    expect(getByIdSpy).toHaveBeenCalledWith(makeStockDataRequest().stockId)
  })

  test('Should throw if GetStockByIdRepository throws', async () => {
    const { sut, getStockByIdRepositoryStub } = makeSut()
    jest
      .spyOn(getStockByIdRepositoryStub, 'getById')
      .mockRejectedValueOnce(new Error())
    const promise = sut.execute(makeStockDataRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if GetStockByIdRepository returns null', async () => {
    const { sut, getStockByIdRepositoryStub } = makeSut()
    jest
      .spyOn(getStockByIdRepositoryStub, 'getById')
      .mockResolvedValueOnce(null)
    const error = await sut.execute(makeStockDataRequest())
    expect(error).toBeNull()
  })

  test('Should call UpdateStockUseCase with correct values', async () => {
    const { sut, updateStockRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateStockRepositoryStub, 'update')
    await sut.execute(makeStockDataRequest())
    expect(updateSpy).toHaveBeenCalledWith(makeStockDataRequest())
  })

  test('Should throw if UpdateStockUseCase throws', async () => {
    const { sut, updateStockRepositoryStub } = makeSut()
    jest
      .spyOn(updateStockRepositoryStub, 'update')
      .mockRejectedValueOnce(new Error())
    const promise = sut.execute(makeStockDataRequest())
    await expect(promise).rejects.toThrow()
  })
})
