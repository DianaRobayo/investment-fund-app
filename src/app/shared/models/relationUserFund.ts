export interface RelationUserFund {
  id?: string;
  idUser: string;
  idFund: number;
  quantityFund: number;
}

export interface UnionRelationUserFund extends RelationUserFund {
  nameFund: string;
  category: string;
  minAmount: number;
  totalAmount?: number;
}
