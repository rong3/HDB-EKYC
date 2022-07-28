// You can use CONSTANTS.js file for below definitions of constants and import here.
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const LANGUAGESWITCH = "LANGUAGESWITCH";

// Without THUNK MIDDLEWARE only actions can be dispatched.
export const incrementAction = (payload) => ({
  type: INCREMENT,
  payload
});

export const decrementAction = () => ({
  type: DECREMENT,
});

export const languageSwitchAction = (payload) => ({
  type: LANGUAGESWITCH,
  payload
});

// THUNK MIDDLEWARE enables dispatch within action function's return method.
export const increment = (step) => {
  return (dispatch) => {
    dispatch(incrementAction(step));
  };
};

export const updateLanguage = (value) => {
  return (dispatch) => {
    dispatch(languageSwitchAction(value));
  };
}
//EXAMPLE fetch data server
// export const fetchData = async (value) => {
//   const apicall = await cancelIdleCallback();
//   return (dispatch) => {
//     dispatch(otheraction(apicall));
//   };
// }
