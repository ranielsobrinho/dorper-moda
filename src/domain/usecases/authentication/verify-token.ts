export interface VerifyToken {
  execute(token: string): Promise<VerifyToken.Result>
}

export namespace VerifyToken {
  export type Result = void | null
}
