import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import userChatReducer from './userChatSlice';
const store = configureStore({
  reducer: {
    chat: chatReducer,
    userChat: userChatReducer,
  },
});

export default store;
