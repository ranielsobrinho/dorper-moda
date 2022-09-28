import { makeCreatSalesValidation } from './create-sales-validation-factory'
import { Validation } from '../../../../../presentation/protocols/validation'
import {
  RequiredFieldValidation,
  ValidationComposite
} from '../../../../../validation/validators'

jest.mock('../../../../../validation/validators/validation-composite')

describe('CreateSalesValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeCreatSalesValidation()
    const validations: Validation[] = []
    for (const field of [
      'clientName',
      'deliveryFee',
      'paymentForm',
      'products',
      'total'
    ]) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
