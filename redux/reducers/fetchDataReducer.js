import { actionTypes } from "../actions/fetchDataAction";

export const initialState = {
    dataTable: [],
}

const fetchDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_DATA_SUCCESS: {
            return {
                ...state,
                dataTable: action.payload
            }
        }
        case actionTypes.UPDATE_SUCCESS: {
            return {
                ...state,
                dataTable: action.payload
            }
        }
        default:
            return state;
    }
};

export default fetchDataReducer;
