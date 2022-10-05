import { GetSaleByIdRepository } from '../../../protocols/db/sales/get-sale-by-id-repository'
import { GetSaleByIdUseCase } from './get-sale-by-id-use-case'

const makeGetSale = (): GetSaleByIdRepository.Result => ({
  id: 'any_id',
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
})

const makeGetSaleByIdRepositoryStub = (): GetSaleByIdRepository => {
  class GetSaleByIdRepositoryStub implements GetSaleByIdRepository {
    async getById(saleId: string): Promise<GetSaleByIdRepository.Result> {
      return Promise.resolve(makeGetSale())
    }
  }
  return new GetSaleByIdRepositoryStub()
}

type SutTypes = {
  sut: GetSaleByIdUseCase
  getSaleByIdRepositoryStub: GetSaleByIdRepository
}

const makeSut = (): SutTypes => {
  const getSaleByIdRepositoryStub = makeGetSaleByIdRepositoryStub()
  const sut = new GetSaleByIdUseCase(getSaleByIdRepositoryStub)
  return {
    sut,
    getSaleByIdRepositoryStub
  }
}

describe('GetSaleByIdUseCase', () => {
  test('Should call GetSaleByIdRepository with correct values', async () => {
    const { sut, getSaleByIdRepositoryStub } = makeSut()
    const getByIdSpy = jest.spyOn(getSaleByIdRepositoryStub, 'getById')
    await sut.getById('any_id')
    expect(getByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if GetSaleByIdRepository throws', async () => {
    const { sut, getSaleByIdRepositoryStub } = makeSut()
    jest
      .spyOn(getSaleByIdRepositoryStub, 'getById')
      .mockRejectedValueOnce(new Error())
    const promise = sut.getById('any_id')
    await expect(promise).rejects.toThrow()
  })
})
