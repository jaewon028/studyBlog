import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

import createRootReducer from "./redux/reducers/index";
import rootSaga from "./redux/sagas/index";

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const initialState = {};

const middlewares = [sagaMiddleware, routerMiddleware(history)];

// 상태 관리 개발자 도구
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

// 배포 단계에서는 안 보이게 설정해줘야함.
const composeEnhancer =
  process.env.NODE_ENV === "production" ? compose : devtools || compose;

// store 는 모든 상태 값을 저장하는 곳으로, 관리를 편하게 함.
const store = createStore(
  createRootReducer(history),
  initialState,
  composeEnhancer(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);

export default store;
