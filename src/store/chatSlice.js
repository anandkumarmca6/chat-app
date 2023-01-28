const { createSlice } = require('@reduxjs/toolkit');

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    contacts: [],
    chatUsers: [],
    chats: [],
    loginuser: {},
  },
  reducers: {
    // set all chats
    setChat(state, action) {
      state.chats = action.payload;
    },
    // set contact list
    setContacts(state, action) {
      state.contacts = action.payload;
    },
    // add new chat to chats list
    addChats(state, action) {
      state.chats.push(action.payload);
    },
    // set login user
    setLoginUser(state, action) {
      state.loginuser = action.payload;
    },
    // set conversation users list
    setChatUsers(state, action) {
      state.chatUsers = action.payload;
    },
    // Add user to conversation users list
    addChatUsers(state, action) {
      state.chatUsers.push(action.payload);
    },
    // Update last message into existing user's conversation  list
    updateChatUsers(state, action) {
      return {
        ...state,
        chatUsers: [
          ...state.chatUsers.slice(0, action.payload.updateid),
          {
            id: action.payload.id,
            name: action.payload.name,
            text: action.payload.text,
          },
          ...state.chatUsers.slice(action.payload.updateid + 1),
        ],
      };
    },
  },
});

export const {
  setChat,
  setContacts,
  addChats,
  setLoginUser,
  setChatUsers,
  addChatUsers,
  updateChatUsers,
} = chatSlice.actions;
export default chatSlice.reducer;

export function fetchChat() {
  return async function fetchChatThunk(dispatch, getState) {
    try {
      // get data from json url
      const res = await fetch('https://api.npoint.io/259665caee1dd0281830');
      const data = await res.json();
      dispatch(setChat(data.chats));
      dispatch(setContacts(data.users));
      dispatch(setChatUsers(data.chatUsers));
      dispatch(setLoginUser(data.loginUser));
    } catch (err) {
      console.log(err);
    }
  };
}
