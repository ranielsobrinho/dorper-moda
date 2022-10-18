export interface CancelSaleRepository {
  cancelSale(saleId: string): Promise<CancelSaleRepository.Result>
}

export namespace CancelSaleRepository {
  export type Result = void | Error
}
