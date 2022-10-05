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

describe('GetSaleByIdUseCase', () => {
  test('Should call GetSaleByIdRepository with correct values', async () => {
    class GetSaleByIdRepositoryStub implements GetSaleByIdRepository {
      async getById(saleId: string): Promise<GetSaleByIdRepository.Result> {
        return Promise.resolve(makeGetSale())
      }
    }
    const getSaleByIdRepositoryStub = new GetSaleByIdRepositoryStub()
    const sut = new GetSaleByIdUseCase(getSaleByIdRepositoryStub)
    const getByIdSpy = jest.spyOn(getSaleByIdRepositoryStub, 'getById')
    await sut.getById('any_id')
    expect(getByIdSpy).toHaveBeenCalledWith('any_id')
  })
})
