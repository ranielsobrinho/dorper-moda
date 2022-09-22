import { UpdateStock } from '../../../../domain/usecases/stock/update-stock'
import { InvalidParamError } from '../../../errors'
import { forbidden, serverError } from '../../../helpers/http-helper'
import { HttpRequest } from '../../../protocols/http'
import { UpdateStockController } from './update-stock-controller'

const makeStockDataRequest = (): HttpRequest => ({
  body: {
    stockId: 'any_id',
    data: {
      modelName: 'any_name',
      color: 'any_color',
      quantity: 1
    }
  }
})

const makeUpdateStockStub = (): UpdateStock => {
  class UpdateStockStub implements UpdateStock {
    async execute(params: UpdateStock.Params): Promise<UpdateStock.Result> {}
  }
  return new UpdateStockStub()
}

type SutTypes = {
  sut: UpdateStockController
  updateStockStub: UpdateStock
}

const makeSut = (): SutTypes => {
  const updateStockStub = makeUpdateStockStub()
  const sut = new UpdateStockController(updateStockStub)
  return {
    sut,
    updateStockStub
  }
}

describe('UpdateStockController', () => {
  test('Should call UpdateStock with correct values', async () => {
    const { sut, updateStockStub } = makeSut()
    const updateSpy = jest.spyOn(updateStockStub, 'execute')
    await sut.handle(makeStockDataRequest())
    expect(updateSpy).toHaveBeenCalledWith(makeStockDataRequest().body)
  })

  test('Should return 500 if UpdateStock throws', async () => {
    const { sut, updateStockStub } = makeSut()
    jest.spyOn(updateStockStub, 'execute').mockRejectedValueOnce(new Error())
    const promise = await sut.handle(makeStockDataRequest())
    expect(promise).toEqual(serverError(new Error()))
  })

  test('Should return 403 if UpdateStock returns null', async () => {
    const { sut, updateStockStub } = makeSut()
    jest.spyOn(updateStockStub, 'execute').mockResolvedValueOnce(null)
    const httpResponse = await sut.handle(makeStockDataRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('stockId')))
  })
})
