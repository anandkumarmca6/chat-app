const { createSlice } = require('@reduxjs/toolkit');
const userChatSlice = createSlice({
  name: 'userChat',
  initialState: {
    userChat: [],
  },

  reducers: {
    // set chat of particular user
    setUserChat(state, action) {
      state.userChat = action.payload;
    },
    // add new chat for  particular user
    addChat(state, action) {
      state.userChat.push(action.payload);
    },
  },
});

export const { setUserChat, addChat } = userChatSlice.actions;
export default userChatSlice.reducer;
