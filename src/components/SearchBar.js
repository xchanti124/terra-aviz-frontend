import { useDispatch } from "react-redux";

import styles from "../styles/searchBar.module.css";

const SearchBar = ({ page }) => {
  const dispatch = useDispatch();

  const onInputSubmit = e => {
    e.preventDefault();
    const input = e.target[0].value;
    dispatch({ type: "FILTER_BY_INPUT", payload: { page, input } });
  };

  const onCategorySubmit = e => {
    e.preventDefault();
    const category = e.target.value;
    dispatch({ type: "FILTER_BY_CATEGORY", payload: { page, category } });
  };

  return (
    <>
      <form className={styles.searchForm} onSubmit={onInputSubmit}>
        <input className={styles.searchBar} type="search" placeholder="Type here..." />
        <button className={styles.searchButton}>Search</button>

        <select className={styles.searchBar} name="categories" onChange={onCategorySubmit}>
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
