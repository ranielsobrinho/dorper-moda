import { CancelSale } from '../../../../domain/usecases/sales/cancel-sale'
import { serverError } from '../../../helpers/http-helper'
import { HttpRequest } from '../../../protocols/http'
import { CancelSaleController } from './cancel-sale-controller'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    saleId: 'any_id'
  }
})

const makeCancelSaleStub = (): CancelSale => {
  class CancelSaleStub implements CancelSale {
    async cancel(saleId: string): Promise<void | Error> {}
  }
  return new CancelSaleStub()
}

type SutTypes = {
  sut: CancelSaleController
  cancelSaleStub: CancelSale
}

const makeSut = (): SutTypes => {
  const cancelSaleStub = makeCancelSaleStub()
  const sut = new CancelSaleController(cancelSaleStub)
  return {
    sut,
    cancelSaleStub
  }
}

describe('CancelSaleController', () => {
  test('Should call CancelSale with correct values', async () => {
    const { sut, cancelSaleStub } = makeSut()
    const cancelSpy = jest.spyOn(cancelSaleStub, 'cancel')
    await sut.handle(makeFakeRequest())
    expect(cancelSpy).toHaveBeenCalledWith(makeFakeRequest().params.saleId)
  })

  test('Should return 500 if CancelSale throws', async () => {
    const { sut, cancelSaleStub } = makeSut()
    jest.spyOn(cancelSaleStub, 'cancel').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
