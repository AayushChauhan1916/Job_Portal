import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./authSlice"
import jobReducer from "./jobSlice"
import companyReducer from "./companySlice";
import adminJobReducer from "./AdminJobSlice";
import applicationReducer from "./ApplicationSlice"
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  auth: userReducer,
  job:jobReducer,
  company:companyReducer,
  adminjob:adminJobReducer,
  application:applicationReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});




