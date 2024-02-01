import React, { useEffect } from "react";
import { VariableSizeGrid as Grid } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { useDispatch, useSelector } from "react-redux";
import AutoSizer from "react-virtualized-auto-sizer";

import { CardDataService } from "../../api/services/cardDataService";
import { gridData } from "../../shared/constants/gridData";
import { apiGetCardsData } from "../../api/apiUrls";
import { CardInfoModel, CardResultModel } from "../../api/models/cardsModel";

import {
  getCardsData,
  getFirstCards,
  getMockCard,
  isLoading,
} from "../../store/actions/cardItems";
import { GridCellItem } from "../../shared/components/GridCell";
import { AppDispatch } from "../../store/store";
import { cardsInRequestCount } from "../../shared/constants/CardsData";

const MainPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const cardsDataResults: CardResultModel[] = useSelector(
    (state: any) => state.cardItems.results
  );
  const cardsDataInfo: CardInfoModel = useSelector(
    (state: any) => state.cardItems.info
  );
  const loading: boolean = useSelector((state: any) => state.cardItems.loading);

  const [currentCardNumber, setCurrentCardNumber] = React.useState<number>(20);
  const [currentPageNumber, setCurrentPageNumber] = React.useState<number>(2);

  const elementsCount = cardsDataInfo.count
    ? cardsDataInfo.count / gridData.columnsCountDisplayed
    : 0;

  const getFirstCardsData: () => void = async () => {
    dispatch(isLoading(true));
    const response = await CardDataService(apiGetCardsData);
    dispatch(getFirstCards(response));
  };

  const mockCards = Array(cardsInRequestCount)
    .fill(1, cardsInRequestCount)
    .map(() => []);

  const handleChangeCardData = () => {
    setCurrentCardNumber((prevState) => (prevState += cardsInRequestCount));
    setCurrentPageNumber((prevState) => (prevState += 1));
  };

  useEffect(() => {
    getFirstCardsData();
    window.scrollTo(0, 0);
  }, []);

  const loadMoreCards = async (data: any) => {
    if (currentPageNumber < cardsDataInfo.pages + 1) {
      handleChangeCardData();
      dispatch(getMockCard(mockCards));
      const response: any = await CardDataService(
        apiGetCardsData,
        currentPageNumber,
        currentCardNumber
      );
      dispatch(getCardsData(response));
    }
  };

  return (
    <div className="scroll-wrapper">
      {cardsDataResults && (
        <AutoSizer>
          {({ height, width }: any) => (
            <InfiniteLoader
              isItemLoaded={() => loading}
              itemCount={elementsCount}
              loadMoreItems={loadMoreCards}
            >
              {({ onItemsRendered, ref }) => (
                <Grid
                  className="grid-component"
                  columnCount={gridData.columnsCountDisplayed}
                  columnWidth={() => width / gridData.columnsCountDisplayed}
                  height={height}
                  rowHeight={() => height / gridData.rowCountDisplayed}
                  width={width}
                  rowCount={elementsCount}
                  onItemsRendered={({
                    visibleRowStartIndex,
                    visibleRowStopIndex,
                    overscanRowStopIndex,
                    overscanRowStartIndex,
                  }) => {
                    onItemsRendered({
                      overscanStartIndex: overscanRowStartIndex,
                      overscanStopIndex: overscanRowStopIndex,
                      visibleStartIndex: visibleRowStartIndex,
                      visibleStopIndex: visibleRowStopIndex,
                    });
                  }}
                  ref={ref}
                >
                  {GridCellItem}
                </Grid>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      )}
    </div>
  );
};

export default MainPage;
