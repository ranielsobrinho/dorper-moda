import { Validation } from '../../../../../presentation/protocols'
import {
  RequiredFieldValidation,
  ValidationComposite
} from '../../../../../validation/validators'

export const makeUpdateClientValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'address', 'telephone', 'baseFee']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
