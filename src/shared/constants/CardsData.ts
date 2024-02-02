import { InitCartDataModel } from "../../api/models/cardsModel";

export const cardsInRequestCount: number = 20;

export const initCartData: InitCartDataModel = {
  cardsInRequestCount: 20,
  startCardIndex: 20,
  startPageNumber: 2,
  loaded: false,
};
