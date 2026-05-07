export interface HistoryFund {
  id?: string;
  idUser: string;
  idFund: number;
  nameFund: string;
  totalAmount: number;
  quantityFund: number;
  date: Date;
  action: string;
  subscription: string;
}