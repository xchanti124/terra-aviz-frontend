import { call, put, takeEvery } from "redux-saga/effects";
import { authenticatedFetch } from "../helpers";
import { fetchFailed, fetchSuccess } from "./locationsListSlice";

import { URL } from "../service/APIs";

export function* fetchLocationsList(page) {
  try {
    const response = yield call(authenticatedFetch, URL.all(page.payload));
    const locationsList = yield response.json();
    console.log(locationsList);
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

export function* fetchByInput(value) {
  try {
    const input = encodeURIComponent(value.payload).replace("%20", "+");

    const response = yield call(authenticatedFetch, URL.byInput(input));
    const locations = yield response.json();
    yield put(fetchSuccess(locations));
  } catch (e) {
    yield put(fetchFailed(e.message));
  }
}

export function* fetchByCategory(category) {
  try {
    const response = yield call(authenticatedFetch, URL.byCategory(category.payload));
    const locations = yield response.json();
    yield put(fetchSuccess(locations));
  } catch (e) {
    yield put(fetchFailed(e));
  }
}

export default function* locationsSaga() {
  yield takeEvery("LOCATIONS_REQUESTED", fetchLocationsList);
  yield takeEvery("LOCATION_REQUESTED", fetchLocation);
  yield takeEvery("FILTER_BY_QUERY", fetchByInput);
  yield takeEvery("FILTER_BY_CATEGORY", fetchByCategory);
}
