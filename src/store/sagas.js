import { call, put, takeEvery } from "redux-saga/effects";
import { authenticatedFetch } from "../helpers";
import { fetchFailed, fetchSuccess } from "./locationsListSlice";

import { URL } from "../service/APIs";

export function* fetchLocationsList() {
  try {
    const response = yield call(authenticatedFetch, URL.all());
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

export function* fetchByInput(value) {
  try {
    // console.log(new URLSearchParams(input.payload).toString());  this has = at the end
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

export function* fetchByHashtag(hashtag) {
  try {
    console.log(hashtag.payload, "hashtag for search");
    const response = yield call(authenticatedFetch, URL.byHashTag(hashtag.payload));
    const locations = yield response.json();
    yield put(fetchSuccess(locations));
  } catch (e) {
    yield put(fetchFailed(e.message));
  }
}

// bottom code should be at the end
export default function* locationsSaga() {
  yield takeEvery("LOCATIONS_REQUESTED", fetchLocationsList);
  yield takeEvery("LOCATION_REQUESTED", fetchLocation);
  yield takeEvery("FILTER_BY_INPUT", fetchByInput);
  yield takeEvery("FILTER_BY_CATEGORY", fetchByCategory);
  yield takeEvery("FILTER_BY_HASHTAG", fetchByHashtag);
}
