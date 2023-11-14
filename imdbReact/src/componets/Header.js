import React from "react";
import Home_Button from "./headercomponents/home_Button";
import Watchlist_Component from "./headercomponents/watclist_Component";
import "./Header.css";
import Watchlist_Data from "../context_Collection/watclist_Context/watchlist_Context";

function Header() {
  return (
    <header>
      <Home_Button />
      <Watchlist_Data>
        <Watchlist_Component />
      </Watchlist_Data>
    </header>
  );
}
export default Header;
