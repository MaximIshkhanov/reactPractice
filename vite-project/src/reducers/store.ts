
import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './rootReducer';


const store = configureStore({
  reducer: {
    news: newsReducer,

  },middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(),
  devTools: import.meta.env.NODE_ENV !== "production",
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
