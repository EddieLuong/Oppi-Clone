import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer,PERSIST } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from "./reducer";

//pollDetail use state pollId of polllist, so when reload PollDetail, pollId back to initial value,
//So i use redux-persist to solve this problem
const persistConfig = {
  key: 'root',
  storage,
  blacklist:["login","polldetail","polllist"]
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer:persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [PERSIST]
    },
  }),
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;



export const persistor  = persistStore(store);
export default store;