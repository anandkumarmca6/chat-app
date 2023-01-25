const { createSlice } = require('@reduxjs/toolkit');

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    contacts: [],
    chats: [],
    loginuser: {},
  },
  reducers: {
    setChat(state, action) {
      state.chats = action.payload;
    },
    setContacts(state, action) {
      state.contacts = action.payload;
    },
    addChats(state, action) {
      state.chats.push(action.payload);
    },
    setLoginUser(state, action) {
      state.loginuser = action.payload;
    },
  },
});

export const { setChat, setContacts, addChats, setLoginUser } =
  chatSlice.actions;
export default chatSlice.reducer;

export function fetchChat() {
  return async function fetchChatThunk(dispatch, getState) {
    try {
      const res = await fetch('https://api.npoint.io/259665caee1dd0281830');
      const data = await res.json();
      dispatch(setChat(data.chats));
      dispatch(setContacts(data.users));
      dispatch(setLoginUser(data.loginUser));
    } catch (err) {
      console.log(err);
    }
  };
}
