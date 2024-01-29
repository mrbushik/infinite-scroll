import { CardInfoModel, CardResultModel } from "../../api/models/cardsModel";

export interface CardItemReducer {
  info: CardInfoModel | {};
  results: CardResultModel | [];
  loading: boolean;
  pageNumber: number;
}
