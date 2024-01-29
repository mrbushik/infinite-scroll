import axios from "axios";

import { CardDataModel } from "../models/cardsModel";

interface CardDataServiceArgs {
  (URL: string): Promise<CardDataModel | undefined>;
}

export const CardDataService: CardDataServiceArgs = (URL) => {
  return getCardData(URL);
};

const getCardData = async (URL: string): Promise<CardDataModel | undefined> => {
  try {
    return await axios.get(URL).then((response: any) => response.data);
  } catch (error) {
    console.log(error);
  }
};
