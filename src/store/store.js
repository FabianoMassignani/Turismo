import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { movieListReducer, movieItemReducer } from "./reducers/movie";

export const rootReducer = combineReducers({
  movieList: movieListReducer,
  movieItem: movieItemReducer,
});

const token = localStorage.getItem("TokenTrakt")
  ? JSON.parse(localStorage.getItem("TokenTrakt"))
  : undefined;

let initialState;

if (token)
  initialState = {
    TraktAuth: {
      logged: true,
      token: token,
    },
  };
else {
  initialState = {
    TraktAuth: {
      logged: false,
    },
  };
}

const middleware = [thunk];

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
