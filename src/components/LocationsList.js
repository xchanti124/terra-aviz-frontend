import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import LocationPreview from "./LocationPreview";
import SearchForm from "./SearchForm";

import styles from "../styles/locationPreview.module.css";

const LocationsList = () => {
  const { locations, maxPage } = useSelector(state => state.locations);
  const [searchParams, setSearchParams] = useSearchParams([["page", "1"]]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (!searchParams.get("page")) {
      setQuery({});
      setPage(1);
    }
  }, [searchParams]);

  useEffect(() => {
    dispatch({ type: "LOCATIONS_REQUESTED", payload: { pageNumber: page, ...query } });
  }, [dispatch, page, query]);

  const onSearch = params => {
    setSearchParams([["page", "1"], ...Object.entries(params)]);
    setQuery(params);
  };

  const isFirstPage = page <= 1;
  const isLastPage = page >= maxPage;

  const onPrevBtnClick = () => {
    if (!isFirstPage) {
      setSearchParams([["page", page - 1]]);
      setPage(page - 1);
      window.scrollTo(0, 0);
    }
  };

  const onNextBtnClick = () => {
    if (!isLastPage) {
      setSearchParams([["page", page + 1]]);
      setPage(page + 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <SearchForm onSearch={onSearch} />

      {locations.map(location => (
        <LocationPreview key={location._id} location={location} />
      ))}

      <div className={styles.btnContainer}>
        <button className={styles.prevBtn} disabled={isFirstPage} onClick={onPrevBtnClick}>
          PREVIOUS
        </button>
        <button className={styles.nextBtn} disabled={isLastPage} onClick={onNextBtnClick}>
          NEXT
        </button>
      </div>
    </>
  );
};

export default LocationsList;
