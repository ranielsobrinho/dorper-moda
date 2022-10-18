import { GetSaleByIdRepository } from '../../../protocols/db/sales/get-sale-by-id-repository'
import { CancelSaleUseCase } from './cancel-sale-use-case'

const makeGetSale = (): GetSaleByIdRepository.Result => ({
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

const makeGetSaleByIdRepository = (): GetSaleByIdRepository => {
  class GetSaleByIdRepositoryStub implements GetSaleByIdRepository {
    async getById(saleId: string): Promise<GetSaleByIdRepository.Result> {
      return makeGetSale()
    }
  }
  return new GetSaleByIdRepositoryStub()
}

type SutTypes = {
  sut: CancelSaleUseCase
  getSaleByIdRepositoryStub: GetSaleByIdRepository
}

const makeSut = (): SutTypes => {
  const getSaleByIdRepositoryStub = makeGetSaleByIdRepository()
  const sut = new CancelSaleUseCase(getSaleByIdRepositoryStub)
  return {
    sut,
    getSaleByIdRepositoryStub
  }
}

describe('CancelSaleUseCase', () => {
  test('Should call GetSaleByIdRepository with correct values', async () => {
    const { sut, getSaleByIdRepositoryStub } = makeSut()
    const getSaleSpy = jest.spyOn(getSaleByIdRepositoryStub, 'getById')
    await sut.cancel('any_id')
    expect(getSaleSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if GetSaleByIdRepository throws', async () => {
    const { sut, getSaleByIdRepositoryStub } = makeSut()
    jest
      .spyOn(getSaleByIdRepositoryStub, 'getById')
      .mockRejectedValueOnce(new Error())
    const promise = sut.cancel('any_id')
    await expect(promise).rejects.toThrow()
  })
})
