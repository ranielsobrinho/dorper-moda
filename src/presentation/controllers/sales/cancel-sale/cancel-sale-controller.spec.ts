import { SalesModel } from '../../../../domain/models/sales'
import { CancelSale } from '../../../../domain/usecases/sales/cancel-sale'
import { GetSaleById } from '../../../../domain/usecases/sales/get-sale-by-id'
import { noContent, serverError } from '../../../helpers/http-helper'
import { HttpRequest } from '../../../protocols/http'
import { CancelSaleController } from './cancel-sale-controller'
import MockDate from 'mockdate'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    saleId: 'any_id'
  }
})

const makeGetSale = (): SalesModel => ({
  id: 'any_id',
  clientName: 'any_client_name',
  deliveryFee: 25,
  paymentForm: 'CREDIT CARD',
  products: [
    {
      modelName: 'any_model_name',
      description: [
        {
          color: 'any_color_name',
          quantity: 1
        }
      ]
    }
  ],
  soldAt: new Date(),
  total: 110
})

const makeCancelSaleStub = (): CancelSale => {
  class CancelSaleStub implements CancelSale {
    async cancel(saleId: string): Promise<void | Error> {}
  }
  return new CancelSaleStub()
}

const makeGetSaleByIdStub = (): GetSaleById => {
  class GetSaleByIdStub implements GetSaleById {
    async getById(saleId: string): Promise<SalesModel | null> {
      return Promise.resolve(makeGetSale())
    }
  }
  return new GetSaleByIdStub()
}

type SutTypes = {
  sut: CancelSaleController
  getSaleByIdStub: GetSaleById
  cancelSaleStub: CancelSale
}

const makeSut = (): SutTypes => {
  const cancelSaleStub = makeCancelSaleStub()
  const getSaleByIdStub = makeGetSaleByIdStub()
  const sut = new CancelSaleController(cancelSaleStub, getSaleByIdStub)
  return {
    sut,
    cancelSaleStub,
    getSaleByIdStub
  }
}

describe('CancelSaleController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Should call GetSaleById with correct values', async () => {
    const { sut, getSaleByIdStub } = makeSut()
    const getByIdSpy = jest.spyOn(getSaleByIdStub, 'getById')
    await sut.handle(makeFakeRequest())
    expect(getByIdSpy).toHaveBeenCalledWith(makeFakeRequest().params.saleId)
  })

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

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
