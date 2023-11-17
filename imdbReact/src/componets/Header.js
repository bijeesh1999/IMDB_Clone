import React from "react";
import Home_Button from "./headercomponents/home_Button";
import Watchlist_Component from "./headercomponents/watclist_Component";
import "./Header.css";

function Header() {
  return (
    <header>
        <Home_Button />
        <Watchlist_Component />
    </header>
  );
}
export default Header;
