import React, { useEffect } from "react";
import { VariableSizeGrid as Grid } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { useDispatch, useSelector } from "react-redux";

import { CardDataService } from "../../api/services/cardDataService";
import { gridData } from "../../shared/constants/gridData";
import { apiGetCardsFromPage, apiGetFirstCards } from "../../api/apiUrls";
import { CardInfoModel, CardResultModel } from "../../api/models/cardsModel";

import {
  getCardsData,
  getFirstCards,
  isLoading,
} from "../../store/actions/cardItems";
import { GridCellItem } from "../../shared/components/GridCellItem";

const MainPage: React.FC = () => {
  const dispatch: any = useDispatch();

  const cardsDataResults: CardResultModel[] = useSelector(
    (state: any) => state.cardItems.results
  );

  const cardsDataInfo: CardInfoModel = useSelector(
    (state: any) => state.cardItems.info
  );

  const pageNumber: number = useSelector(
    (state: any) => state.cardItems.pageNumber
  );

  const loading: boolean = useSelector((state: any) => state.cardItems.loading);

  const GET_CARDS_URL = cardsDataInfo.next
    ? `${apiGetCardsFromPage}${pageNumber}`
    : apiGetFirstCards;
  const elementsCount = cardsDataInfo.count
    ? cardsDataInfo.count / gridData.columnsCount
    : 0;

  useEffect(() => {
    getFirstData();
  }, []);

  const getFirstData = async () => {
    dispatch(isLoading(true));
    const response = await CardDataService(GET_CARDS_URL);
    dispatch(getFirstCards(response));
  };

  const loadMoreCards = async () => {
    if (cardsDataInfo.next !== null) {
      dispatch(isLoading(true));
      const response: any = await CardDataService(GET_CARDS_URL);
      dispatch(getCardsData(response));
    }
  };

  return (
    <div>
      {cardsDataResults && (
        <InfiniteLoader
          isItemLoaded={() => loading}
          itemCount={elementsCount}
          loadMoreItems={loadMoreCards}
        >
          {({ onItemsRendered, ref }: any) => (
            <Grid
              className="Grid"
              columnCount={gridData.columnsCount}
              columnWidth={() => gridData.columnWidth}
              height={gridData.height}
              rowHeight={() => gridData.rowHeight}
              width={gridData.width}
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
    </div>
  );
};

export default MainPage;
