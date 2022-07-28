import { all } from "redux-saga/effects";
import { watchDemoDataTableSaga } from "../saga/demoData.saga"

export default function* rootSaga() {
    yield all([
        //all listener watches
        watchDemoDataTableSaga()
    ]);
}
