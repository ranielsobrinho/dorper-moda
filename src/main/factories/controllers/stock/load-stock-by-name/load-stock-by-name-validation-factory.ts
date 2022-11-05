import { Validation } from '../../../../../presentation/protocols'
import {
  RequiredFieldValidation,
  ValidationComposite
} from '../../../../../validation/validators'

export const makeLoadStockByNameValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['stockName']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
