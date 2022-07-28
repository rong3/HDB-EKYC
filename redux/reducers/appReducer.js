import { DECREMENT, INCREMENT, LANGUAGESWITCH } from "../actions/appActions";
import { getDefaultLanguage } from "../../utils/common"

const initialState = {
  counter: 0,
  language: getDefaultLanguage()
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + (action.payload || 1),
      };
    case DECREMENT:
      return {
        ...state,
        counter: state.counter - 1,
      };
    case LANGUAGESWITCH:
      return {
        ...state,
        language: action.payload,
      };

    default:
      return state;
  }
};
