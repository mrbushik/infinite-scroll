import { CardItemReducerModel } from "../../api/models/reducersModel";
import { ReduxActionTypesNames } from "../../shared/constants/reduxActionTypesNames";

const initialState: CardItemReducerModel = {
  info: {},
  results: [],
  loading: false,
  pageNumber: 1,
};

const cardsItems = (state: any = initialState, action: any) => {
  if (action.type === ReduxActionTypesNames.getFirstCards) {
    return {
      ...state,
      info: action.payload.info,
      results: [...state.results, ...action.payload.results],
      pageNumber: (state.pageNumber += 1),
      loading: false,
    };
  } else if (action.type === ReduxActionTypesNames.getCardsData) {
    return {
      ...state,
      info: action.payload.info,
      results: [...state.results, ...action.payload.results],
      pageNumber: (state.pageNumber += 1),
      loading: false,
    };
  } else if (action.type === ReduxActionTypesNames.loading) {
    return {
      ...state,
      loading: action.payload,
    };
  }

  return state;
};

export default cardsItems;
