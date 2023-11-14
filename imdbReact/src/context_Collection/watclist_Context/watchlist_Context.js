import { useState, useEffect, createContext } from "react";
import axios from "axios";

// console.log(process.env.REACT_APP_WATCH);

export const Watchlist_Context = createContext();

function Watchlist_Data({ children }) {
  const [count, setCount] = useState();
  const [listdata, setListData] = useState();

  const getcount = () => {
    axios.get("http://localhost:8080").then((res) => {
      const data = res.data;
      const count = res.data.length;
      setCount(count);
      setListData(data);
    });
  };

  useEffect(() => {
    getcount();
  }, []);

  return (
    <Watchlist_Context.Provider value={{ count, listdata, getcount }}>
      {children}
    </Watchlist_Context.Provider>
  );
}

export default Watchlist_Data;
