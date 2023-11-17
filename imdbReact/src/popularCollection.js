import "./movie.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { searchData , popularMovies } from "./apis";
import { useNavigate, } from "react-router-dom";


const PopulerCollection = ({searchDatas}) => {
  const [popular, setPopular] = useState([]);
  const populerData = () => {
    const endpoints =searchDatas ? searchData : popularMovies ;
    axios.get(endpoints,{
        params: {
          query: searchDatas,
        }
      })
      .then((res)=>setPopular(res.data.results))
  };

  useEffect(() => {
    populerData()
  }, [searchDatas]);

  const navigate=useNavigate();

const movie = (id) => {
axios.get(`http://localhost:8080/${id}`)
.then((res) =>  {
    const status=res.data.res
      navigate(`/Movie/${id}`);
  }) .catch((error) => {
    console.error('Error:', error);
})
}




  return (
    <div className="randumCollection">
      {Array.isArray(popular) ? ( 
        popular.map((obj) => (
          <div key={obj.id}>
            <div className="popularData" onClick={()=>{movie(obj.id)}} >
              <div className="imgCollector">
                <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${obj.poster_path}`}/>
              </div>
              <div className="movieDetails">
              <h4 className="movieTitle" style={{maxWidth:"14rem",overflow:"inherit"}}>{obj.original_title}</h4>
              <h4 className="views">Language : {obj.original_language}</h4>
              <h4 className="release_date" style={{fontWeight:"500"}}>{obj.release_date}</h4>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
    
  );
};

export default PopulerCollection;
