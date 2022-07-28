import { UPDATE_USER } from "../actions/userActions";

const initialState = {
  userInfo: {
    id: '1',
    name: '',
    phone: '',
    job: '',
    email: ''
  }
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        userInfo: action.payload
      };
    default:
      return state;
  }
};
