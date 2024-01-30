import React from "react";
const GridCellItemSkeleton: React.FC = () => {
  return (
    <div className="card card-skeleton">
      <div className="loading-text-wrapper">
        <span className="card-title loading-title"></span>
        <div className="card-characters-characterization card-characters-loading">
          <span className="card-species loading-text"></span>
          <span className="card-species loading-text"></span>
        </div>
      </div>
      <div className="card-image-wrapper loading-image"></div>
    </div>
  );
};

export default GridCellItemSkeleton;
