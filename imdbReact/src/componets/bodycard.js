import React, { Fragment } from "react";
import VideoCard from "./bodycomponents/videoCard";
import "./bodycard.css";
import Watchlist_Data from "../context_Collection/watchlist_Context";

function CardCollection(props) {
  return (
      <Watchlist_Data>
        <VideoCard {...props} />
      </Watchlist_Data>
  );
}
export default CardCollection;
