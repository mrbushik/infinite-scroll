export const getFirstCards = (theme: any) => ({
  type: "GET_FIRST_CARDS",
  payload: theme,
});

export const getCardsData = (theme: any) => ({
  type: "GET_CARDS_DATA",
  payload: theme,
});

export const isLoading = (theme: any) => ({
  type: "LOADING",
  payload: theme,
});
