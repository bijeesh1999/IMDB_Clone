import React, { useState } from "react";
import "./watchlist.css";
import axios from "axios";
import { useContext } from "react";
import { Watchlist_Context } from "../../context_Collection/watchlist_Context";
import { useNavigate, } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Watchlist_Component() {
  const [list, setList] = useState(false);
  const { count, listdata, getcount } = useContext(Watchlist_Context);

  const notify = () =>
    toast.error("Movie deleted successfully!", {
      autoClose: 2000,
      style: {
        backgroundColor: "black",
        color: "white",
        border: "1px solid red",
      },
    });

  const deleteData = async (movie) => {
    const id = movie.id;
    try {
      await axios
        .delete(`http://localhost:8080/${id}`)
        .then((res) => console.log("delete secess"));
      getcount();
      notify();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleWatchlist = () => {
    setList((ListVisible) => !ListVisible);
    getcount();
  };
  const navigate=useNavigate();
  const homePage=()=>{
    navigate('/')
  };
  const hello=(data)=>{
    navigate(`/Movie/${data.id}`);
  }

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

      {list && (
        <div id="list">
          {listdata && Array.isArray(listdata) ? (
            listdata.map((item) => (
              <div key={item.id}>
                <div id="watchlist">
                  <div id="movie" onClick={()=>{hello(item)}}>
                    <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${item.backdroppath}`}></img>
                  </div>
                  <div id="details">
                    <h3>Title:{item.originaltitle}</h3>
                    <h4>Date:{item.releasedate}</h4>
                    <div style={{display:"flex"}}>status:<h5 style={{border:"1px solid grey"}}>{item.status}</h5></div>
                    <h5>duration:{item.runtime} min</h5>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        color: "#2f2f62",
                      }}
                      >
                      <i className="fa-solid fa-trash" onClick={() => { deleteData(item); }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      )}
    </>
  );
}
export default Watchlist_Component;
