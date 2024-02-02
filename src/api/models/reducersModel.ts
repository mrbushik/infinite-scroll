import { CardInfoModel, CardResultModel } from "./cardsModel";

export interface CardItemReducerModel {
  info: Partial<CardInfoModel>;
  results: CardResultModel[];
  loading?: boolean;
  pageNumber?: number;
}

export interface ReducersDataModel {
  deleteCountElements: number;
  arrayStartIndex: number;
}

export interface GetTargetArrayModel {
  (
    targetIndex: number,
    targetArr: CardResultModel[],
    actionData: CardResultModel[]
  ): CardResultModel[];
}
