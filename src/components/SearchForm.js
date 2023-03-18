import { useState } from "react";

import styles from "../styles/searchBar.module.css";

const SearchForm = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  function handleInputSubmit(event) {
    event.preventDefault();
    const query = {};
    if (searchInput) {
      query.search = searchInput;
    }
    if (selectedCategory) {
      query.category = selectedCategory;
    }

    Object.keys(query).length && onSearch(query);
  }

  function handleCategorySubmit(event) {
    setSelectedCategory(event.target.value);
  }

  return (
    <form className={styles.searchForm} onSubmit={handleInputSubmit}>
      <input
        className={styles.searchBar}
        type="search"
        placeholder="Type here..."
        value={searchInput}
        onChange={event => setSearchInput(event.target.value)}
      />

      <select className={styles.searchBar} name="categories" value={selectedCategory} onChange={handleCategorySubmit}>
        <option disabled value="">
          Select category...
        </option>
        <option value="Attractions">Attractions</option>
        <option value="Culture">Culture</option>
        <option value="Nature">Nature</option>
        <option value="Museum">Museum</option>
        <option value="Museum">Mall</option>
        <option value="Museum">Garden</option>
      </select>

      <button className={styles.searchButton}>Search</button>
    </form>
  );
};

export default SearchForm;
