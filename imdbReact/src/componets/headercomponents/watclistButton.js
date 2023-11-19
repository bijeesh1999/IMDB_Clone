import React, { useState } from "react";
import "./watchlist.css";
import axios from "axios";
import { useContext } from "react";
import { Watchlist_Context } from "../../context_Collection/watchlist_Context";
import { useNavigate, } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Watchlist_Component() {
  const { count, listdata } = useContext(Watchlist_Context);
 
  const navigate=useNavigate();
  const toggleWatchlist = () => {
    navigate("/watchList")
    };
  
  const homePage=()=>{
    navigate('/')
  };


  return (
    <>
      <ToastContainer />
      <div className="end">
        <button className="watchlistCollection"> 
        <i className="Home" onClick={homePage}>Home</i>
        </button>
        <button className="watchlistCollection" onClick={toggleWatchlist}>
        <i className="playlist">Playlist</i>
          <span id="count" style={{ color: "white" }}>
            {count}
          </span>
        </button>
        </div>
</>
  );
}
export default Watchlist_Component;
