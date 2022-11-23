import { AccountModel } from '../../../../domain/models/account'
import { CreateAccountModel } from '../../../../domain/usecases/account/create-account'

export interface AddAccountRepository {
  create(
    params: AddAccountRepository.Params
  ): Promise<AddAccountRepository.Result>
}

export namespace AddAccountRepository {
  export type Params = CreateAccountModel
  export type Result = AccountModel | null
}
