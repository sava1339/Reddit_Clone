import { configureStore } from '@reduxjs/toolkit';
import { toggleReducer } from '../reducers/toggleReducer';

const store = configureStore({
    reducer: {
        toggleBools: toggleReducer.reducer
    },
  })
  
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;