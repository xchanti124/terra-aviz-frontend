import { useDispatch } from "react-redux";

import styles from "../styles/searchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();

  const onSearchSubmit = e => {
    e.preventDefault();
    const input = e.target[0].value;
    dispatch({ type: "FILTER_BY_QUERY", payload: input });
  };

  const onCategorySubmit = e => {
    e.preventDefault();
    const category = e.target.value;
    dispatch({ type: "FILTER_BY_CATEGORY", payload: category });
  };

  return (
    <>
      <form className={styles.searchForm} onSubmit={onSearchSubmit}>
        <input className={styles.searchBar} type="search" placeholder="Type here..." />
        <button className={styles.searchButton}>Search</button>

        <select className={styles.searchBar} name="categories" onChange={onSearchSubmit}>
          <option value="Attractions">Attractions</option>
          <option value="Culture">Culture</option>
          <option value="Nature">Nature</option>
          <option value="Museum">Museum</option>
        </select>
      </form>
    </>
  );
};

export default SearchBar;
