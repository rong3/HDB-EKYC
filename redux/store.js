import { createStore, applyMiddleware, compose } from "redux"
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk"
import { rootReducer } from "./reducers";
import rootSaga from "../redux/saga/index"

const { composeWithDevTools } = require("redux-devtools-extension");
const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware)
}

const initStore = () => {
  const storeRunning = createStore(rootReducer, bindMiddleware(
    [
      thunk,
      sagaMiddleware
    ]));

  storeRunning.runSagaTask = () => {
    storeRunning.sagaTask = sagaMiddleware.run(rootSaga);
  };

  storeRunning.runSagaTask();

  return storeRunning;
}

export const wrapper = createWrapper(initStore)

