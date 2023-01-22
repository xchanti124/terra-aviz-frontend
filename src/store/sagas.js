import { call, put, takeEvery } from "redux-saga/effects";
import { fetchFailed, fetchSuccess } from "./locationsListSlice";

const URL = {
  base: "http://localhost:3000/api",
  all: function () {
    return `${this.base}/locations`;
  },
  byID: function (id) {
    return `${this.all()}/${id}`;
  },
  byInput: function (input) {
    return `${this.base()}/search?description=${input}`;
  },
  byCategory: function (category) {
    return `${this.base()}/search?category=${category}`;
  },
  byHashTag: function (hashtag) {
    return `${this.base()}/search?hashtag=${hashtag}`;
  },
};

export function* fetchLocationsList() {
  try {
    const response = yield call(fetch, URL.all());
    const locationsList = yield response.json();
    yield put(fetchSuccess(locationsList));
  } catch (e) {
    yield put(fetchFailed(e.message));
  }
}

export function* fetchLocation(ID) {
  try {
    console.log(ID.payload, "id to look for");
    const response = yield call(fetch, URL.byID(ID.payload));
    const location = yield response.json();
    yield put(fetchSuccess(location));
    // needs to be tested
  } catch (e) {
    yield put(fetchFailed(e.message));
  }
}

export function* fetchByInput(value) {
  try {
    console.log(value.payload, "input for search");
    // console.log(new URLSearchParams(input.payload).toString());  this has = at the end
    const input = encodeURIComponent(value.payload).replace('%20','+');

    const response = yield call(fetch, URL.byInput(input));
    const locations = yield response.json();
    yield put(fetchSuccess(locations));
  } catch (e) {
    yield put(fetchFailed(e.message));
  }
}

export function* fetchByCategory(category) {
  try {
    console.log(category.payload, "category for search");
    const response = yield call(fetch, URL.byCategory(category.payload));
    const locations = yield response.json();
    yield put(fetchSuccess(locations));
  } catch (e) {
    yield put(fetchFailed(e.message));
  }
}

export function* fetchByHashtag(hashtag) {
  try {
    console.log(hashtag.payload, "hashtag for search");
    const response = yield call(fetch, URL.byHashTag(hashtag.payload));
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
