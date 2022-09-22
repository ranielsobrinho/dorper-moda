import { makeUpdateStockValidation } from './update-stock-validation-factory'
import { Validation } from '../../../../../presentation/protocols/validation'
import {
  RequiredFieldValidation,
  ValidationComposite
} from '../../../../../validation/validators'

jest.mock('../../../../../validation/validators/validation-composite')

describe('UpdateStockValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeUpdateStockValidation()
    const validations: Validation[] = []
    for (const field of ['modelName', 'color', 'quantity']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
