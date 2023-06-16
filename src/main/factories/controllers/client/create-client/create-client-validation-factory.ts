import { Validation } from '../../../../../presentation/protocols'
import {
  RequiredFieldValidation,
  ValidationComposite
} from '../../../../../validation/validators'

export const makeCreateClientValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'address']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
