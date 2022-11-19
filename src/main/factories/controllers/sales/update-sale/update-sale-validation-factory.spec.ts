import { makeUpdateSaleValidation } from './update-sale-validation-factory'
import { Validation } from '../../../../../presentation/protocols/validation'
import {
  RequiredFieldValidation,
  ValidationComposite
} from '../../../../../validation/validators'

jest.mock('../../../../../validation/validators/validation-composite')

describe('UpdateSaleValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeUpdateSaleValidation()
    const validations: Validation[] = []
    for (const field of [
      'clientName',
      'deliveryFee',
      'paymentForm',
      'products',
      'description',
      'total'
    ]) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
