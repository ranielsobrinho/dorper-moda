export interface CancelSale {
  cancel(saleId: string): Promise<void | Error>
}
