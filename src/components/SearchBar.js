import { useDispatch } from "react-redux";

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
    <div>
      <form onSubmit={onFormSubmit}>
        <input type="search" placeholder="Search here" />
        <button>Search</button>
      </form>

      <label htmlFor="categories">Filter by category:</label>

      <select name="categories" id="categories" onChange={onCategorySubmit}>
        <option value="nature">nature</option>
        <option value="place">place</option>
        <option value="urban spot">urban spot</option>
        <option value="hidden">hidden</option>
      </select>
    </div>
  );
};

export default SearchBar;
