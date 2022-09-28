import { Validation } from '../../../../../presentation/protocols'
import {
  RequiredFieldValidation,
  ValidationComposite
} from '../../../../../validation/validators'

export const makeCreatSalesValidation = (): ValidationComposite => {
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
  return new ValidationComposite(validations)
}
