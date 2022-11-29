export interface VerifyToken {
  execute(token: string): Promise<void | Error>
}
