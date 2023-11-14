import React, { Fragment } from "react";
import VideoCard from "./bodycomponents/videoCard";
import "./bodycard.css"
function CardCollection(props){
    return(
        <Fragment>
            <VideoCard {...props}/>
        </Fragment>
    )
}
export default CardCollection