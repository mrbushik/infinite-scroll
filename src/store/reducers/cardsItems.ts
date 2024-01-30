import { CardItemReducer } from "../interfaces";

const initialState: CardItemReducer = {
  info: {},
  results: [],
  loading: false,
  pageNumber: 1,
};

const cardsItems = (state: any = initialState, action: any) => {
  if (action.type === "GET_FIRST_CARDS") {
    return {
      ...state,
      info: action.payload.info,
      results: [...state.results, ...action.payload.results],
      pageNumber: (state.pageNumber += 1),
      loading: false,
    };
  } else if (action.type === "GET_CARDS_DATA") {
    return {
      ...state,
      info: action.payload.info,
      results: [...state.results, ...action.payload.results],
      pageNumber: (state.pageNumber += 1),
      loading: false,
    };
  } else if (action.type === "LOADING") {
    return {
      ...state,
      loading: action.payload,
    };
  }

  return state;
};

export default cardsItems;
