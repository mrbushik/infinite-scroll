import axios from "axios";

import { CardDataModel } from "../models/cardsModel";

interface CardDataServiceArgs {
  (URL: string, pageNumber?: number): Promise<CardDataModel | undefined>;
}

export const CardDataService: CardDataServiceArgs = (URL, pageNumber) => {
  if (pageNumber){
    return getCardData(URL, pageNumber);
  }else{
    return getFirstCards(URL);
  }
};

const getCardData = async (URL: string, pageNumber: number): Promise<CardDataModel | undefined> => {
  try {
    return await axios.get(URL, {params: {page: pageNumber}}).then((response: any) => response.data);
  } catch (error) {
    console.log(error);
  }
};

const getFirstCards = async (URL: string): Promise<CardDataModel | undefined> => {
  try {
    return await axios.get(URL).then((response: any) => response.data);
  } catch (error) {
    console.log(error);
  }
};
