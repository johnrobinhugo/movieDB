import React from "react";

import Teaser from "../molecules/Teaser";

function ContentGrid(props) {
  const baseUrl = props.configBaseUrl;
  const posterSize = props.configPosterSizes[4];
  const posterUrlBase = baseUrl.concat(posterSize);

  const content = props.content;
  const contentBaseUrl = props.contentBaseUrl;

  const gridItems = props.gridItems;

  if (gridItems !== undefined) {
    content.length = gridItems;
  }

  content.map(function (contentItem) {
    return (contentItem.teaserImgUrl = posterUrlBase.concat(
      contentItem.poster_path
    ));
  });

  return (
    <div className="grid grid--5-col">
      {props.content.map(function (contentItem) {
        return (
          <Teaser
            imgUrl={contentItem.teaserImgUrl}
            title={`${
              contentItem.title !== undefined
                ? contentItem.title
                : contentItem.original_name
            }`}
            baseUrl={contentBaseUrl}
            id={contentItem.id}
            key={contentItem.id}
          />
        );
      })}
    </div>
  );
}

export default ContentGrid;
