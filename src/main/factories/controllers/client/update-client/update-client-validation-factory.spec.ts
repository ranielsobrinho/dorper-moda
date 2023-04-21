import { makeUpdateClientValidation } from './update-client-validation-factory'
import { Validation } from '../../../../../presentation/protocols/validation'
import {
  RequiredFieldValidation,
  ValidationComposite
} from '../../../../../validation/validators'

jest.mock('../../../../../validation/validators/validation-composite')

describe('UpdateClientValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeUpdateClientValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'address', 'telephone', 'baseFee']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
