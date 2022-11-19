import { AccountModel } from '../../models/account'

export type CreateAccountModel = Omit<AccountModel, 'id'>

export interface CreateAccount {
  execute(params: CreateAccount.Params): Promise<CreateAccount.Result>
}

export namespace CreateAccount {
  export type Params = CreateAccountModel
  export type Result = AccountModel | null
}
