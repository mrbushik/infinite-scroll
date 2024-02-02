import {
  CardItemReducerModel,
  GetTargetArrayModel,
} from "../../api/models/reducersModel";
import { reducersData, ReduxData } from "../../shared/constants/reduxData";

const initialState: CardItemReducerModel = {
  info: {},
  results: [],
};

const getTargetArr: GetTargetArrayModel = (
  targetIndex,
  targetArr,
  actionData
) => {
  const data = [...targetArr];
  data.splice(targetIndex, reducersData.deleteCountElements, ...actionData);
  return data;
};

const cardsItems = (state: any = initialState, action: any) => {
  if (action.type === ReduxData.getFirstCards) {
    return {
      ...state,
      info: action.payload.info,
      results: getTargetArr(
        reducersData.arrayStartIndex,
        state.results,
        action.payload.results
      ),
    };
  } else if (action.type === ReduxData.getCardsData) {
    return {
      ...state,
      info: action.payload.info,
      results: getTargetArr(
        action.payload.startElementsIndex,
        state.results,
        action.payload.results
      ),
    };
  } else if (action.type === ReduxData.getMockCard) {
    return {
      ...state,
      results: [...state.results, ...action.payload],
    };
  }

  return state;
};

export default cardsItems;
