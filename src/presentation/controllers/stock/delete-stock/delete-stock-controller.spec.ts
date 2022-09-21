import { DeleteStock } from '../../../../domain/usecases/stock/delete-stock'
import { noContent, serverError } from '../../../helpers/http-helper'
import { HttpRequest } from '../../../protocols'
import { DeleteStockController } from './delete-stock-controller'

const makeDeleteRequest = (): HttpRequest => ({
  body: {
    stockId: 1
  }
})

const makeDeleteStockStub = (): DeleteStock => {
  class DeleteStockStub implements DeleteStock {
    async execute(stockId: string): Promise<void> {}
  }
  return new DeleteStockStub()
}

type SutTypes = {
  sut: DeleteStockController
  deleteStockStub: DeleteStock
}

const makeSut = (): SutTypes => {
  const deleteStockStub = makeDeleteStockStub()
  const sut = new DeleteStockController(deleteStockStub)
  return {
    sut,
    deleteStockStub
  }
}

describe('DeleteStockController', () => {
  test('Should call DeleteStock with correct values', async () => {
    const { sut, deleteStockStub } = makeSut()
    const deleteStockSpy = jest.spyOn(deleteStockStub, 'execute')
    await sut.handle(makeDeleteRequest())
    expect(deleteStockSpy).toHaveBeenCalledWith(
      makeDeleteRequest().body.stockId
    )
  })

  test('Should return 500 if DeleteStock throws', async () => {
    const { sut, deleteStockStub } = makeSut()
    jest.spyOn(deleteStockStub, 'execute').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(makeDeleteRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeDeleteRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
