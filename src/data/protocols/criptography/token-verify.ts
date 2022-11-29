export interface TokenVerify {
  verify(token: string): Promise<string>
}
