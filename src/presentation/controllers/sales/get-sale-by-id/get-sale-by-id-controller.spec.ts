import { SalesModel } from '../../../../domain/models/sales'
import { GetSaleById } from '../../../../domain/usecases/sales/get-sale-by-id'
import { InvalidParamError } from '../../../errors'
import { badRequest, serverError, ok } from '../../../helpers/http-helper'
import { HttpRequest } from '../../../protocols'
import { GetSaleByIdController } from './get-sale-by-id-controller'
import MockDate from 'mockdate'

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
  description: 'any_description',
  soldAt: new Date(),
  total: 110
})

const httpRequest = (): HttpRequest => ({
  params: {
    saleId: 1
  }
})

const makeGetSaleByIdStub = (): GetSaleById => {
  class GetSaleByIdStub implements GetSaleById {
    async getById(saleId: string): Promise<SalesModel | null> {
      return Promise.resolve(makeGetSale())
    }
  }
  return new GetSaleByIdStub()
}

type SutTypes = {
  sut: GetSaleByIdController
  getSaleByIdStub: GetSaleById
}

const makeSut = (): SutTypes => {
  const getSaleByIdStub = makeGetSaleByIdStub()
  const sut = new GetSaleByIdController(getSaleByIdStub)
  return {
    sut,
    getSaleByIdStub
  }
}

describe('GetSaleByIdController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call GetSaleById with correct values', async () => {
    const { sut, getSaleByIdStub } = makeSut()
    const getSaleSpy = jest.spyOn(getSaleByIdStub, 'getById')
    await sut.handle(httpRequest())
    expect(getSaleSpy).toHaveBeenCalledWith(httpRequest().params.saleId)
  })

  test('Should return 500 if GetSaleById throws', async () => {
    const { sut, getSaleByIdStub } = makeSut()
    jest.spyOn(getSaleByIdStub, 'getById').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(httpRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 400 if GetSaleById returns null', async () => {
    const { sut, getSaleByIdStub } = makeSut()
    jest.spyOn(getSaleByIdStub, 'getById').mockResolvedValueOnce(null)
    const httpResponse = await sut.handle(httpRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('saleId')))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(httpRequest())
    expect(httpResponse).toEqual(ok(makeGetSale()))
  })
})
