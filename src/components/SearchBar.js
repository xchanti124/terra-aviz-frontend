import { useDispatch } from "react-redux";

import styles from "../styles/searchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();

  const onFormSubmit = e => {
    e.preventDefault();
    const input = e.target[0].value;
    dispatch({ type: "FILTER_BY_INPUT", payload: input });
  };

  const onCategorySubmit = e => {
    e.preventDefault();
    const category = e.target.value;
    dispatch({ type: "FILTER_BY_CATEGORY", payload: category });
  };

  return (
    <>
      <form className={styles.searchForm} onSubmit={onFormSubmit}>
        <input className={styles.searchBar} type="search" placeholder="Type here..." />
        <button className={styles.searchButton}>Search</button>

        {/* <label htmlFor="categories">Filter by category:</label>

        <select className={styles.search_bar} name="categories" id="categories" onChange={onCategorySubmit}>
          <option value="nature">nature</option>
          <option value="place">place</option>
          <option value="urban spot">urban spot</option>
          <option value="hidden">hidden</option>
        </select> */}
      </form>
    </>
  );
};

export default SearchBar;
