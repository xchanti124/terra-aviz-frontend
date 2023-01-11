import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

function* fetchLocations(action) {
    try {
       const locations = yield call(Api.fetchLocations, action.payload.allLocations);
       yield put({type: "LOCATIONS_FETCH_SUCCEEDED", locations: location});
    } catch (e) {
       yield put({type: "LOCATIONS_FETCH_FAILED", message: e.message});
    }
 }

 function* mySaga() {
    yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
  }
