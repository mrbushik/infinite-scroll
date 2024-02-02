import { ReduxData } from "../../shared/constants/reduxData";

export const getFirstCards = (theme: any) => ({
  type: ReduxData.getFirstCards,
  payload: theme,
});

export const getCardsData = (theme: any) => ({
  type: ReduxData.getCardsData,
  payload: theme,
});

export const getMockCard = (theme: any) => ({
  type: ReduxData.getMockCard,
  payload: theme,
});
