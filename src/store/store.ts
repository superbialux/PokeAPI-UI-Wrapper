import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { pokeapi } from 'features/pokeapi/pokeapiSlice';

export const store = configureStore({
  reducer: {
    [pokeapi.reducerPath]: pokeapi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokeapi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
