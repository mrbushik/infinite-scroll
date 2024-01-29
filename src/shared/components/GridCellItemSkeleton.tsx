import React from "react";
const GridCellItemSkeleton: React.FC = () => {
  return (
    <div className="card-skelet">
      <span className="loading-title"></span>
      <div className="loading-image"></div>
    </div>
  );
};

export default GridCellItemSkeleton;
