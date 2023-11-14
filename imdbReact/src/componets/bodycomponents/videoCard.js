import React from "react";
import { useNavigate } from "react-router-dom";
import "../bodycard.css";

/* this is one car for frond page popular collection*/
function VideoCard(props) {
  const navigate = useNavigate();

  /*using this code for calculate the rating and retun*/
  const rating = (avarage) => {
    const array = [];
    const popularity = Math.ceil(avarage);
    for (let i = 1; i < popularity; i++) {
      array.push(<i className="fa-solid fa-star" key={`filled-${i}`}></i>);
    }
    for (let j = 1; j <= 10 - popularity; j++) {
      array.push(<i className="fa-regular fa-star" key={`empty-${j}`}></i>);
    }

    return array;
  };
  // ======================================================

  const navigateData = () => {
    navigate(`/Movie/${props.id}`);
  };

  return (
    <>
      <div className="card" onClick={navigateData}>
        <div style={{ position: "relative" }}>
          <img
            id="video"
            src={`https://www.themoviedb.org/t/p/w220_and_h330_face${props.poster_path}`}
          />
          <i className="fa-solid fa-bookmark"></i>
        </div>
        <div style={{ display: "grid", gap: "10px" }}>
          <div id="title">{props.name || props.title}</div>
          <div id="rating">{rating(props.vote_average)}</div>
          <div id="date">Date:{props.release_date}</div>
          <button className="options">more options</button>
        </div>
      </div>
    </>
  );
}
export default VideoCard;
