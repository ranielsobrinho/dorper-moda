import { CancelSale } from '../../../../domain/usecases/sales/cancel-sale'
import { HttpRequest } from '../../../protocols/http'
import { CancelSaleController } from './cancel-sale-controller'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    saleId: 'any_id'
  }
})

describe('CancelSaleController', () => {
  test('Should call CancelSale with correct values', async () => {
    class CancelSaleStub implements CancelSale {
      async cancel(saleId: string): Promise<void | Error> {}
    }
    const cancelSaleStub = new CancelSaleStub()
    const sut = new CancelSaleController(cancelSaleStub)
    const cancelSpy = jest.spyOn(cancelSaleStub, 'cancel')
    await sut.handle(makeFakeRequest())
    expect(cancelSpy).toHaveBeenCalledWith(makeFakeRequest().params.saleId)
  })
})
