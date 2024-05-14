import { configureStore } from '@reduxjs/toolkit';
import toggleReducer from '../reducers/toggleReducer';
import postsReducer from '../reducers/postsReducer';
import communityesReducer from '../reducers/communityesReducer';
import timeReducer from '../reducers/timeReducer';

const store = configureStore({
    reducer: {
        toggleBools: toggleReducer,
        posts: postsReducer,
        communityes: communityesReducer ,
        time: timeReducer
    },
  })
  
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;