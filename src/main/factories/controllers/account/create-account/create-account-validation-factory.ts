import { Validation } from '../../../../../presentation/protocols'
import {
  RequiredFieldValidation,
  ValidationComposite
} from '../../../../../validation/validators'

export const makeCreateAccountValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['username', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
