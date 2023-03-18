import { call, put, takeEvery } from "redux-saga/effects";

import { authenticatedFetch } from "../helpers";
import { fetchFailed, fetchSuccess } from "./locationsListSlice";
import { URL } from "../service/APIs";

export function* fetchLocationsList({ payload }) {
  const queryString = Object.entries(payload)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  try {
    const response = yield call(authenticatedFetch, URL.all(queryString));
    const locationsList = yield response.json();
    yield put(fetchSuccess(locationsList));
  } catch (e) {
    yield put(fetchFailed(e.message));
  }
}

export function* fetchLocation(ID) {
  try {
    const response = yield call(authenticatedFetch, URL.byID(ID.payload));
    const location = yield response.json();
    yield put(fetchSuccess(location));
  } catch (e) {
    yield put(fetchFailed(e.message));
  }
}

export default function* locationsSaga() {
  yield takeEvery("LOCATIONS_REQUESTED", fetchLocationsList);
  yield takeEvery("LOCATION_REQUESTED", fetchLocation);
}
