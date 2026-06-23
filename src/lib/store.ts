// lib/store.ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import productReducer from "./features/product/productSlice";
import { productApi } from "./service/productApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      products: productReducer,
      [productApi.reducerPath]: productApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer RootState
export type RootState = ReturnType<AppStore["getState"]>;

// Infer AppDispatch
export type AppDispatch = AppStore["dispatch"];
