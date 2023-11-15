import React, { Fragment } from "react";
import VideoCard from "./bodycomponents/videoCard";
import "./bodycard.css";
import Watchlist_Data from "../context_Collection/watclist_Context/watchlist_Context";

function CardCollection(props) {
  return (
    <Fragment>
      <Watchlist_Data>
        <VideoCard {...props} />
      </Watchlist_Data>
    </Fragment>
  );
}
export default CardCollection;
