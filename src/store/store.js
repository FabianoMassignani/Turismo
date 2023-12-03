import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { userReducer } from "./reducers/user";
import { uiReducer } from "./reducers/ui";
import { passeioReducer } from "./reducers/passeio";
import { avaliacaoReducer } from "./reducers/avaliacao";
import { pacoteReducer } from "./reducers/pacote";
import { pagamentoReducer } from "./reducers/pagamento";
import { reservaReducer } from "./reducers/reserva";


const persistConfig = {
  key: 'root',
  storage,
};

export const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  passeio: passeioReducer,
  avaliacao: avaliacaoReducer,
  pacote: pacoteReducer,
  pagamento: pagamentoReducer,
  reserva: reservaReducer,
  pacote: pacoteReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

let initialState;

const middleware = [thunk];

export const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);