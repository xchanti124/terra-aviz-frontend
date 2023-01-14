import { call, put, takeEvery } from "redux-saga/effects";
import { fetchFailed, fetchSuccess } from "./locationsListSlice";

const URL = {
  base: "http://localhost:4000/api",
  all: function () {
    return `${this.base}/locations`;
  },
  byID: function (id) {
    return `${this.all()}/${id}`;
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

export function* fetchLocation(action) {
  try {
    const response = yield call(fetch, URL.byID(action.payload));
    const location = yield response.json();
    yield put(fetchSuccess(location));
    // needs to be tested
  } catch (e) {
    yield put(fetchFailed(e.message));
  }
}

export default function* locationsSaga() {
  yield takeEvery("LOCATIONS_REQUESTED", fetchLocationsList);
  yield takeEvery("LOCATION_REQUESTED", fetchLocation);
}
