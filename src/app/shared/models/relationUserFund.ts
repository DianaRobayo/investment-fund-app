export interface RelationUserFund {
  id?: string;
  idUser: string;
  idFund: number;
  unitsFund: number;
}

// export interface UnionRelationUserFund extends RelationUserFund {
//   nameFund: string;
//   category: string;
//   minAmount: number;
// }
export interface UnionRelationUserFund {
  id?: string;
  idUser: string;
  idFund: number;
  unitsFund: number;
  nameFund: string;
  category: string;
  minAmount: number;
}
