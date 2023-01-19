import { useDispatch } from "react-redux";

const SearchBar = () => {
  const dispatch = useDispatch();

  const onFormSubmit = e => {
    e.preventDefault();
    const input = e.target[0].value;
    dispatch({ type: "FILTER_BY_INPUT", payload: input });
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <input type="search" placeholder="Search here" />

        <button>Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
