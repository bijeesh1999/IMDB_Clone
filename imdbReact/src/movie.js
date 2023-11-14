import axios from "axios";
import React, { useEffect, useState } from "react";
import "./movie.css";
import PopulerCollection from "./popularCollection";
import { useParams } from "react-router-dom";
import Search from "./componets/search/search";
import { useContext } from "react";
import { Watchlist_Context } from "./context_Collection/watclist_Context/watchlist_Context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Movie() {
  let { id } = useParams();

  const { getcount } = useContext(Watchlist_Context);

  //navigated movie component to get an purticular movie data

  const [add, setAdd] = useState(true);
  const [movie, setMovie] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getMovie();
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
        zIndex: "10",
        position: "relative",
      },
    });

  const addWatch = async (movie) => {
    const dataToSend = {
      backdroppath: movie.backdrop_path,
      id: movie.id,
      originaltitle: movie.original_title,
      runtime: movie.runtime,
      releasedate: movie.release_date,
      status:movie.status,
    };

    try {
      const response = await axios
        .post("http://localhost:8080", dataToSend)
        .then((res) => console.log("movie add secess"));
      getcount();
      notify();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Search onSearch={handleSearchData} />
      <div className="roureComponent">
        <div className="movieContainer">
          <div className="viewImage">
            <img
              src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
            />
          </div>
          <div className="movieData">
            <h1 className="title">{movie.original_title}</h1>
            <div className="contents">
              <h3 className="pg"></h3>
              <h3 className="date">{movie.release_date}</h3>
            </div>
            <div id="events">
              {add ? (
                <button className="add" onClick={() => addWatch(movie)}>
                  <i className="fa-solid fa-plus"></i>watchlist
                </button>
              ) : null}
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

// style={{ backgroundImage: `url(https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.backdrop_path})`,width:"100%" , backgroundSize: 'cover' }
