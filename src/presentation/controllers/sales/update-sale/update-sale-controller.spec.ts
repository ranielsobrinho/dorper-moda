import { UpdateSale } from '../../../../domain/usecases/sales/update-sale'
import { HttpRequest } from '../../../protocols'
import { UpdateSaleController } from './update-sale-controller'
import MockDate from 'mockdate'
import { badRequest, serverError } from '../../../helpers/http-helper'
import { InvalidParamError } from '../../../errors'

const makeFakeSaleRequest = (): HttpRequest => ({
  params: {
    saleId: 'any_id'
  },
  body: {
    data: {
      clientName: 'any_client_name',
      deliveryFee: 25,
      paymentForm: 'CREDIT CARD',
      products: [
        {
          modelName: 'any_model_name',
          color: 'any_color_name',
          quantity: 1
        }
      ],
      soldAt: new Date(),
      total: 110
    }
  }
})

const makeUpdateSaleRequest = (): UpdateSale.Params => ({
  saleId: 'any_id',
  data: {
    clientName: 'any_client_name',
    deliveryFee: 25,
    paymentForm: 'CREDIT CARD',
    products: [
      {
        modelName: 'any_model_name',
        color: 'any_color_name',
        quantity: 1
      }
    ],
    soldAt: new Date(),
    total: 110
  }
})

const makeUpdateSaleStub = (): UpdateSale => {
  class UpdateSaleStub implements UpdateSale {
    async execute(params: UpdateSale.Params): Promise<UpdateSale.Result> {
      return Promise.resolve('ok')
    }
  }
  return new UpdateSaleStub()
}

type SutTypes = {
  sut: UpdateSaleController
  updateSaleStub: UpdateSale
}

const makeSut = (): SutTypes => {
  const updateSaleStub = makeUpdateSaleStub()
  const sut = new UpdateSaleController(updateSaleStub)
  return {
    sut,
    updateSaleStub
  }
}

describe('UpdateSaleController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call UpdateSale with correct values', async () => {
    const { sut, updateSaleStub } = makeSut()
    const updateSaleSpy = jest.spyOn(updateSaleStub, 'execute')
    await sut.handle(makeFakeSaleRequest())
    expect(updateSaleSpy).toHaveBeenCalledWith(makeUpdateSaleRequest())
  })

  test('Should return 500 if UpdateSale throws', async () => {
    const { sut, updateSaleStub } = makeSut()
    jest.spyOn(updateSaleStub, 'execute').mockRejectedValueOnce(new Error())
    const httpRequest = await sut.handle(makeFakeSaleRequest())
    expect(httpRequest).toEqual(serverError(new Error()))
  })

  test('Should return 400 if UpdateSale returns null', async () => {
    const { sut, updateSaleStub } = makeSut()
    jest.spyOn(updateSaleStub, 'execute').mockResolvedValueOnce(null)
    const httpRequest = await sut.handle(makeFakeSaleRequest())
    expect(httpRequest).toEqual(badRequest(new InvalidParamError('saleId')))
  })
})
