import { makeCreateClientValidation } from './create-client-validation-factory'
import { Validation } from '../../../../../presentation/protocols/validation'
import {
  RequiredFieldValidation,
  ValidationComposite
} from '../../../../../validation/validators'

jest.mock('../../../../../validation/validators/validation-composite')

describe('CreateClientValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeCreateClientValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'address']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
