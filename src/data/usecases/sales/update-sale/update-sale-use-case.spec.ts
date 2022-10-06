import { UpdateSale } from '../../../../domain/usecases/sales/update-sale'
import { GetSaleByIdRepository } from '../../../protocols/db/sales/get-sale-by-id-repository'
import { UpdateSaleUseCase } from './update-sale-use-case'

const makeUpdateRequest = (): UpdateSale.Params => ({
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

describe('UpdateSaleUseCase', () => {
  test('Should call GetSaleByIdRepository with correct values', async () => {
    class GetSaleByIdRepositoryStub implements GetSaleByIdRepository {
      async getById(saleId: string): Promise<GetSaleByIdRepository.Result> {
        return Promise.resolve(makeGetSale())
      }
    }
    const getSaleByIdRepositoryStub = new GetSaleByIdRepositoryStub()
    const sut = new UpdateSaleUseCase(getSaleByIdRepositoryStub)
    const getByIdSpy = jest.spyOn(getSaleByIdRepositoryStub, 'getById')
    await sut.execute(makeUpdateRequest())
    expect(getByIdSpy).toHaveBeenCalledWith('any_id')
  })
})
