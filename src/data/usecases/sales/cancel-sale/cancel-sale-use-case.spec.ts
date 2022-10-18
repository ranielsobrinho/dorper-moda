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

describe('CancelSaleUseCase', () => {
  test('Should call GetSaleByIdRepository with correct values', async () => {
    class GetSaleByIdRepositoryStub implements GetSaleByIdRepository {
      async getById(saleId: string): Promise<GetSaleByIdRepository.Result> {
        return makeGetSale()
      }
    }
    const getSaleByIdRepositoryStub = new GetSaleByIdRepositoryStub()
    const sut = new CancelSaleUseCase(getSaleByIdRepositoryStub)
    const getSaleSpy = jest.spyOn(getSaleByIdRepositoryStub, 'getById')
    await sut.cancel('any_id')
    expect(getSaleSpy).toHaveBeenCalledWith('any_id')
  })
})
