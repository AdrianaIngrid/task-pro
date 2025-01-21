import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./AuthRedux/slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
const persistConfig = {
  key: "auth", 
  storage,     
  whitelist: ["user", "token", "isLoggedIn"], 
};
const persistedReducer = persistReducer(persistConfig, authReducer);

 const store = configureStore({
  reducer: {
    auth: persistedReducer,
   
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});
const persistor = persistStore(store);

export { store, persistor };