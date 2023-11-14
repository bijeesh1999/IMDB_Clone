import { useState, useEffect } from "react";
import "./App.css";
import CardCollection from "./componets/bodycard";
import axios from "axios";
import { popularMovies, searchData } from "./apis";
import Search from "./componets/search/search";

function App() {
  const [data, setData] = useState([]);
  const [search, searchDatas] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);

  console.log(search);
  const searcHandle = (searchQuery) => {
    searchDatas(searchQuery);
  };

  const IMDB_Data = () => {
    const endpoints = search ? searchData : popularMovies;
    axios
      .get(endpoints, {
        params: {
          query: search,
          page: currentPage,
        },
      })
      .then((res) => {
        const { results, total_pages } = res.data;
        setData(results);
        settotalPages(total_pages);
        console.log(total_pages);
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });
  };

  console.log(searchData);

  useEffect(() => {
    IMDB_Data();
  }, [search, currentPage, totalPages]);

  const prevPage = () => {
    if (currentPage > 1) {
      setcurrentPage((prev) => prev - 1);
    }
  };
  const nextPage = () => {
    if (currentPage < totalPages) {
      setcurrentPage((next) => next + 1);
    }
  };

  return (
    <div id="wrapper">
      <Search onSearch={searcHandle} />

      <div className="container">
        <div className="body">
          {data.map((obj, index) => (
            <CardCollection key={index} {...obj} />
          ))}
        </div>
      </div>

      <footer>
        <div className="footerButtons">
          {currentPage > 1 && (
            <button className="prevPage" onClick={prevPage}>
              prev
            </button>
          )}
          <h5>{currentPage}</h5>

          {currentPage < totalPages && (
            <button className="nextPage" onClick={nextPage}>
              next
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

export default App;
