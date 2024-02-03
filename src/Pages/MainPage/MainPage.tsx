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
} from "../../store/actions/cardItems";
import { GridCellItem } from "../../shared/components/GridCell";
import { AppDispatch } from "../../store/store";
import { initCartData } from "../../shared/constants/CardsData";

const MainPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const cardsDataResults: CardResultModel[] = useSelector(
    (state: any) => state.cardItems.results
  );
  const cardsDataInfo: CardInfoModel = useSelector(
    (state: any) => state.cardItems.info
  );

  const [currentCardNumber, setCurrentCardNumber] = React.useState<number>(
    initCartData.startCardIndex
  );
  const [currentPageNumber, setCurrentPageNumber] = React.useState<number>(
    initCartData.startPageNumber
  );

  const elementsCount = cardsDataInfo.count
    ? cardsDataInfo.count / gridData.columnsCountDisplayed
    : 0;
  const mockCards = Array(initCartData.cardsInRequestCount)
    .fill(1, initCartData.cardsInRequestCount)
    .map(() => []);

  const getFirstCardsData: () => void = async () => {
    const response = await CardDataService(apiGetCardsData);
    dispatch(getFirstCards(response));
  };

  const handleChangeCardData = () => {
    setCurrentCardNumber(
      (prevState) => (prevState += initCartData.cardsInRequestCount)
    );
    setCurrentPageNumber((prevState) => (prevState += 1));
  };

  useEffect(() => {
    dispatch(getMockCard(mockCards));
    getFirstCardsData();
    window.scrollTo(0, 0);
  }, []);

  const loadMoreCards = async (startIndex: number, stopIndex: number) => {
    if (
      currentPageNumber <= cardsDataInfo.pages &&
      currentPageNumber * 10 <= stopIndex
    ) {
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
              isItemLoaded={() => initCartData.loaded}
              itemCount={elementsCount}
              loadMoreItems={loadMoreCards}
              threshold={10}
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
