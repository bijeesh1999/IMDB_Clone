import React from "react";
// import "";

function Search({ handleOnSearch }) {
  
  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    handleOnSearch(searchQuery);
  };

  return (
    <div className="search">
      <input
        type="search"
        placeholder="search here"
        onChange={handleSearch}
      />
    </div>
  );
}

export default Search;


