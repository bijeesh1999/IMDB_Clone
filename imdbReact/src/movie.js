import axios from "axios";
import "./movie.css";
import React, { useEffect, useState } from "react";
import PopulerCollection from "./popularCollection";
import { useParams } from "react-router-dom";
import Search from "./componets/search/search";
import { useContext } from "react";
import { Watchlist_Context } from "./context_Collection/watchlist_Context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Movie() {
  let { id } = useParams();
  const { getcount, listdata } = useContext(Watchlist_Context);

  /*navigated movie component to get an purticular movie data*/

  const [add, setAdd] = useState(true);
  const [movie, setMovie] = useState([]);
  const [year, setYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fullDate = movie.release_date;

  const isData = () => {
    if (listdata?.length > 0) {
      listdata.map((movie) => {
        if (movie.id == id) {
          setAdd(false);
        }
      });
    }
    if (fullDate) {
      const year = fullDate.split("-")[0];
      setYear(year);
    }
  };

  useEffect(() => {
    isData();
  }, [listdata, fullDate,id]);

  useEffect(() => {
    getMovie(id);
  }, [id]);

  const getMovie = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=79f745f658d28bec4188474826de4e3c`
      )
      .then((res) => {
        const results = res.data;
        setMovie(results);
      });
  };

  const handleSearchData = (dataFromSearch) => {
    setSearchQuery(dataFromSearch);
  };

  const notify = () =>
    toast.success("Movie added successfully!", {
      autoClose: 2000,
      style: {
        backgroundColor: "black",
        color: "white",
        border: "1px solid green",
      },
    });

  const deleteId = () =>
    toast.error("Movie deleted sucessfully", {
      autoClose: 2000,
      style: {
        backgroundColor: "black",
        color: "white",
        border: "1px solid red",
      },
    });

  const addWatchList = async (movie) => {
    const dataToSend = {
      backdroppath: movie.backdrop_path,
      id: movie.id,
      originaltitle: movie.original_title,
      runtime: movie.runtime,
      releasedate: movie.release_date,
      status: movie.status,
    };

    const res = await axios.post("http://localhost:8080", dataToSend);
    if (res.status === 201) {
      getcount();
      notify();
    }
  };

  /* delete frome wachlist in the movie  */
  const deleteFromeWatchlist = (id) => {
    axios.delete(`http://localhost:8080/${id}`).then((res) => console.log(res));
    setAdd(true)
    deleteId();
    getcount();
  };

  // =======================================

  return (
    <>
      <Search handleOnSearch={handleSearchData} />
      <div className="roureComponent">
        <div className="movieContainer">
          <div className="viewImage">
            <img
              src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
            />
          </div>
          <div className="movieData">
            <h1 className="title">
              {movie.original_title}({year})
            </h1>
            <div className="contents">
              <h3 className="pg"></h3>
              <h3
                className="status"
                style={{ display: "flex", paddingLeft: "10px" }}
              >
                status:
                <h5 style={{ border: "1px solid grey", padding: "3px" }}>
                  {movie.status}
                </h5>
              </h3>
            </div>
            <div id="events">
              {add ? (
                <button className="add" onClick={() => addWatchList(movie)}>
                  <i className="fa-solid fa-plus"></i>watchlist
                </button>
              ) : (
                <button
                  className="add"
                  onClick={() => deleteFromeWatchlist(movie.id)}
                >
                  <i className="material-symbols-outlined" style={{fontSize:"20px"}}>bookmark_remove</i>
                  Remove
                </button>
              )}
            </div>
            <div className="overView">
              <h2>overview</h2>
              <p>{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
      <PopulerCollection searchDatas={searchQuery} />
      <div className="background"></div>
    </>
  );
}
export default Movie;


