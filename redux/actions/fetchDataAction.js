export const actionTypes = {
    LOAD_DATA_TABLE: "LOAD_DATA_TABLE",
    UPDATE_DATA: "UPDATE_DATA",
    UPDATE_SUCCESS: "UPDATE_SUCCESS",
    LOAD_DATA_SUCCESS: "LOAD_DATA_SUCCESS",
    LOAD_DATA_FAILED: "LOAD_DATA_FAILED",
};

export function loadDataTable(payload) {
    return {
        type: actionTypes.LOAD_DATA_TABLE,
        payload
    };
}


export function loadDataTableFailed(error) {
    return {
        type: actionTypes.LOAD_DATA_FAILED,
        error
    };
}
export function loadDataTableSuccess(data) {
    return {
        type: actionTypes.LOAD_DATA_SUCCESS,
        payload: data
    };
}


export function updateDataTable(payload) {
    return {
        type: actionTypes.UPDATE_DATA,
        ...payload
    };
}

export function updateDataTableSuccess(data) {
    return {
        type: actionTypes.UPDATE_SUCCESS,
        payload: data
    };
}