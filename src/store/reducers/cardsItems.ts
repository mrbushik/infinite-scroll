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
    const cardArr = [...state.results];
    cardArr.splice(
      action.payload.startElementsIndex,
      20,
      ...action.payload.results
    );
    return {
      ...state,
      info: action.payload.info,
      results: cardArr,
      loading: false,
    };
  } else if (action.type === ReduxActionTypesNames.getMockCard) {
    return {
      ...state,
      results: [...state.results, ...action.payload],
    };
  } else if (action.type === ReduxActionTypesNames.loading) {
    return {
      ...state,
      loading: action.payload,
    };
  } else if (action.type === ReduxActionTypesNames.increasePageNumber) {
    return {
      ...state,
      pageNumber: (state.pageNumber += 1),
    };
  }

  return state;
};

export default cardsItems;
