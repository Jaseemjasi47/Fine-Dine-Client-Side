import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import  storage  from "redux-persist/lib/storage";
import userSlice from "./userSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedUser = persistReducer(persistConfig, userSlice);

const store = configureStore({
  reducer: persistedUser,
});

export const persistor = persistStore(store);

export default store;