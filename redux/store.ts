import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "redux-persist/lib/storage";
import authentication from "./features/authentication-slice";
import table from "./features/table-slice";
import filter from "./features/filter-slice";
import setting from "./features/setting-slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authentication", "setting"],
};

const rootReducer = combineReducers({
  authentication: authentication,
  table: table,
  filter: filter,
  setting: setting,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // Use persistedReducer, not persistReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
