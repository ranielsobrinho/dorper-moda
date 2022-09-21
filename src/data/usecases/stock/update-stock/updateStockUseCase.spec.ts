import { UpdateStockRepository } from '../../../protocols/db/stock/updateStockRepository'
import { UpdateStockUseCase } from './updateStockUseCase'

const makeStockDataRequest = (): UpdateStockRepository.Params => ({
  stockId: 'any_id',
  data: {
    modelName: 'any_name',
    color: 'any_color',
    quantity: 1
  }
})

const makeUpdateStockRepositoryStub = (): UpdateStockRepository => {
  class UpdateStockRepositoryStub implements UpdateStockRepository {
    async update(
      params: UpdateStockRepository.Params
    ): Promise<UpdateStockRepository.Result> {}
  }
  return new UpdateStockRepositoryStub()
}

type SutTypes = {
  sut: UpdateStockUseCase
  updateStockRepositoryStub: UpdateStockRepository
}

const makeSut = (): SutTypes => {
  const updateStockRepositoryStub = makeUpdateStockRepositoryStub()
  const sut = new UpdateStockUseCase(updateStockRepositoryStub)
  return {
    sut,
    updateStockRepositoryStub
  }
}

describe('UpdateStockUseCase', () => {
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
