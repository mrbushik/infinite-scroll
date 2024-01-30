import { CardInfoModel, CardResultModel } from "./cardsModel";

export interface CardItemReducerModel {
  info: Partial<CardInfoModel>;
  results: CardResultModel[];
  loading: boolean;
  pageNumber: number;
}
