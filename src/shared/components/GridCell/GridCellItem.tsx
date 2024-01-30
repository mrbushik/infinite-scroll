import React from "react";
import { useSelector } from "react-redux";

import { gridData } from "../../constants/gridData";
import { CardResultModel } from "../../../api/models/cardsModel";

import GridCellItemSkeleton from "./GridCellItemSkeleton";

interface Props {
  rowIndex: number;
  columnIndex: number;
  style: React.CSSProperties;
}

export const GridCellItem: React.FC<Props> = ({
  rowIndex,
  columnIndex,
  style,
}) => {
  const cardsDataResults: CardResultModel[] = useSelector(
    (state: any) => state.cardItems.results
  );

  const itemIndex = rowIndex * gridData.columnsCountDisplayed + columnIndex;

  return (
    <div
      style={{
        ...style,
      }}
      className="grid-item"
    >
      {cardsDataResults?.[itemIndex] ? (
        <div className="card">
          <div>
            <h3 className="card-title">
              <span> {cardsDataResults[itemIndex]?.id}</span>
              {cardsDataResults[itemIndex]?.name}
            </h3>
            <div className="card-characters-characterization">
              <p className="card-species">
                Species: {cardsDataResults[itemIndex].species}
              </p>
              <p className="card-species">
                Status: {cardsDataResults[itemIndex].status}
              </p>
            </div>
          </div>
          <div className="card-image-wrapper">
            <img
              loading="lazy"
              className="card-image"
              src={cardsDataResults[itemIndex].image}
              alt={cardsDataResults[itemIndex].name}
            />
          </div>
        </div>
      ) : (
        <GridCellItemSkeleton />
      )}
    </div>
  );
};
