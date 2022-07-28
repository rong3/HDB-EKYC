import { put, takeLatest, select } from "redux-saga/effects";
import { updateDataTableSuccess, loadDataTableFailed, loadDataTableSuccess, actionTypes } from "../actions/fetchDataAction"
import { getAllTableData } from "../../services/dataDummyTable"

function* loadDataTableSaga() {
    try {
        const data = yield getAllTableData();
        yield put(loadDataTableSuccess(data));
    }
    catch (err) {
        yield put(loadDataTableFailed(err));
    }
}

function* updateDataTableSaga(payload) {
    try {
        let data = yield payload.dataTable ?? [];
        let _find = yield data.find(x => x.id === payload.params.id);
        if (_find) {
            _find[payload.params.field] = payload.params.value;
        }
        yield put(updateDataTableSuccess(data));
        payload.toastService('success', `Update field ${payload.params.field} with value ${payload.params.value} success`)
    }
    catch (err) {
        yield put(loadDataTableFailed(err));
        payload.toastService('error', `error message: ${err}`)
    }
}

export function* watchDemoDataTableSaga() {
    yield takeLatest(actionTypes.LOAD_DATA_TABLE, loadDataTableSaga);
    yield takeLatest(actionTypes.UPDATE_DATA, updateDataTableSaga);
}
