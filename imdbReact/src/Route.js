import App from "./App";
import Movie from "./movie";
import Header from "./componets/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Watchlist_Data from "./context_Collection/watclist_Context/watchlist_Context";
function Routers() {
  return (
    <>
      <Watchlist_Data>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/Movie/:id" element={<Movie />} />
          </Routes>
        </Router>
      </Watchlist_Data>
    </>
  );
}
export default Routers;
