import { CancelSale } from '../../../../domain/usecases/sales/cancel-sale'
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
})
