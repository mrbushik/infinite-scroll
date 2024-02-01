import axios from "axios";

import { CardDataModel } from "../models/cardsModel";

interface CardDataServiceArgs {
  (
    URL: string,
    pageNumber?: number,
    startElementsIndex?: number,
    setCurrentCardNumber?: any
  ): Promise<CardDataModel | undefined>;
}

export const CardDataService: CardDataServiceArgs = (
  URL,
  pageNumber,
  startElementsIndex
) => {
  if (pageNumber && pageNumber > 1) {
    return getCardData(URL, pageNumber, startElementsIndex);
  } else {
    return getFirstCards(URL);
  }
};

const getCardData = async (
  URL: string,
  pageNumber: number,
  startElementsIndex?: number
): Promise<CardDataModel | undefined> => {
  try {
    const response: any = await axios
      .get(URL, { params: { page: pageNumber } })
      .then((response: any) => response.data);
    response.startElementsIndex = startElementsIndex;
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getFirstCards = async (
  URL: string
): Promise<CardDataModel | undefined> => {
  try {
    return await axios.get(URL).then((response: any) => response.data);
  } catch (error) {
    console.log(error);
  }
};
