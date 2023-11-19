

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Watchlist_Context } from "../../context_Collection/watchlist_Context";
import axios from "axios";


function Watchlist(){

    const navigate=useNavigate();
    const { listdata, getcount ,deleteWatchlist  } = useContext(Watchlist_Context);

    const hello=(data)=>{
        navigate(`/Movie/${data.id}`);
      }



    return (
<>
<h1 style={{paddingTop:"3rem"}}>Watchlist</h1>
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
                    <div>
                      <i className="material-symbols-outlined trash" onClick={() => { deleteWatchlist(item.id); }}
                      >playlist_remove</i>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
    </>
    )
}

export default Watchlist

