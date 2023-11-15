import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../bodycard.css";
import { useContext } from "react";
import { Watchlist_Context } from "../../context_Collection/watclist_Context/watchlist_Context";



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
  const [tru, setTru] = useState(false);
  const { listdata } = useContext(Watchlist_Context);

  const watchlistData=()=>{
    if (listdata && listdata.length > 0) {
      const array = listdata.map(movie => movie.id);
      const hasMovie = array.some(id => id === props.id);
      console.log(hasMovie);
      setTru(hasMovie);
  }
  }
  
  useEffect(() => {
    watchlistData();
  }, [listdata, props.id]);
  
  // Rest of your component code...
  
// =============================================================
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
         {tru ? <i className="fa-solid fa-bookmark true" style={{color:"green"}}></i>:<i className="fa-solid fa-bookmark false"></i>}
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
