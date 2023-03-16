import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import LocationPreview from "./LocationPreview";
import SearchBar from "./SearchBar";

import styles from "../styles/locationPreview.module.css";

const LocationsList = () => {
  const { locations, maxPage } = useSelector(state => state.locations);
  const [searchParams, setSearchParams] = useSearchParams([["page", "1"]]);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!searchParams.get("page")) {
      setPage(1);
    }
  }, [searchParams]);

  useEffect(() => {
    dispatch({ type: "LOCATIONS_REQUESTED", payload: searchParams.get("page") ?? 1 });
  }, [dispatch, searchParams]);

  const isFirstPage = page <= 1;
  const isLastPage = page >= maxPage;

  const onPrevBtnClick = () => {
    if (!isFirstPage) {
      setSearchParams([["page", page - 1]]);
      setPage(page - 1);
    }
  };

  const onNextBtnClick = () => {
    if (!isLastPage) {
      setSearchParams([["page", page + 1]]);
      setPage(page + 1);
    }
  };

  return (
    <>
      <SearchBar page={page} />

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
