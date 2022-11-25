export type AuthenticationModel = {
  username: string
  password: string
}

export interface Authentication {
  auth(params: Authentication.Params): Promise<Authentication.Result>
}

export namespace Authentication {
  export type Params = AuthenticationModel
  export type Result = string | null
}
