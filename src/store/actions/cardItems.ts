import { ReduxActionTypesNames } from "../../shared/constants/reduxActionTypesNames";

export const getFirstCards = (theme: any) => ({
  type: ReduxActionTypesNames.getFirstCards,
  payload: theme,
});

export const getCardsData = (theme: any) => ({
  type: ReduxActionTypesNames.getCardsData,
  payload: theme,
});

export const isLoading = (theme: any) => ({
  type: ReduxActionTypesNames.loading,
  payload: theme,
});
