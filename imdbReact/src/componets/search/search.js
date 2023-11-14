import React from "react";
// import "";

function Search({ onSearch }) {
  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    onSearch(searchQuery);
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


