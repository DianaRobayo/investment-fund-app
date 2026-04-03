export interface RelationUserFund {
  id?: string;
  idUser: string;
  idFund: number;
}

export interface UnionRelationUserFund extends RelationUserFund {
  nameFund: string;
  category: string;
  minAmount: number;
}
