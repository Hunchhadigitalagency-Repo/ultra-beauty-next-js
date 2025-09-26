import cart from './features/cart-slice';
import table from "./features/table-slice";
import filter from "./features/filter-slice";
import setting from "./features/setting-slice";
import storage from "redux-persist/lib/storage";
import category from './features/category-slice';
import navbar from "./features/wishList-slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import authentication from "./features/authentication-slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/product-count"
import checkoutReducer from './features/checkout-slice';
import dropdown from "./features/dropdown-slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authentication", "setting", "cart", "navbar", "dropdown"],

};

const rootReducer = combineReducers({
  authentication: authentication,
  table: table,
  filter: filter,
  setting: setting,
  category: category,
  cart: cart,
  navbar: navbar,
  dropdown: dropdown,
  products: productReducer,
  checkouts: checkoutReducer,
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
