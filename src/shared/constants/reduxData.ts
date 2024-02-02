import { ReducersDataModel } from "../../api/models/reducersModel";

export enum ReduxData {
  getFirstCards = "GET_FIRST_CARDS",
  getCardsData = "GET_CARDS_DATA",
  loading = "LOADING",
  getMockCard = "GET_MOCK_CARDS",
  increasePageNumber = "INCREASE_PAGE_NUMBER",
}

export const reducersData: ReducersDataModel = {
  deleteCountElements: 20,
  arrayStartIndex: 0,
};
