import { makeAuthenticationValidation } from './login-validation-factory'
import { Validation } from '../../../../../presentation/protocols/validation'
import {
  RequiredFieldValidation,
  ValidationComposite
} from '../../../../../validation/validators'

jest.mock('../../../../../validation/validators/validation-composite')

describe('CreateAccountValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAuthenticationValidation()
    const validations: Validation[] = []
    for (const field of ['username', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
