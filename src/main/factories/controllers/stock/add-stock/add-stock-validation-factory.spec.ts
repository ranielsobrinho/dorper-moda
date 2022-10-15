import { makeAddStockValidation } from './add-stock-validation-factory'
import { Validation } from '../../../../../presentation/protocols/validation'
import {
  RequiredFieldValidation,
  ValidationComposite
} from '../../../../../validation/validators'

jest.mock('../../../../../validation/validators/validation-composite')

describe('AddStockValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddStockValidation()
    const validations: Validation[] = []
    for (const field of ['modelName', 'description']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
