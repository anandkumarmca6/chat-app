import React, { useState } from 'react';

import {
  List,
  ListItem,
  Divider,
  ListItemText,
  Avatar,
  Stack,
  Button,
  Grid,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { addChats, addChatUsers, updateChatUsers } from '../store/chatSlice';
import { addChat } from '../store/userChatSlice';
import uuid from 'react-uuid';
const Chat = (props) => {
  const dispatch = useDispatch();
  const { userChat: activeChat } = useSelector((state) => state.userChat);
  const { chatUsers, loginuser } = useSelector((state) => state.chat);
  const [newChat, setNewChat] = useState('');

  const onSaveClick = (chat) => {
    const newchatId = uuid();
    const chatObject = {
      id: newchatId,
      to: props.chatid,
      from: loginuser.login_id,
      text: chat,
      type: 'own',
    };
    dispatch(addChat(chatObject));

    dispatch(addChats(chatObject));
    setNewChat('');
    let indexu = -1;
    const isFound = chatUsers.some((element) => {
      indexu += 1;
      if (element.id === props.chatid) {
        return true;
      }

      return false;
    });
    const chatUsersObject = {
      id: props.chatid,
      name: props.chatname,
      text: chat,
    };
    if (!isFound) {
      dispatch(addChatUsers(chatUsersObject));
    } else {
      const chatUsersObjectu = {
        id: props.chatid,
        name: props.chatname,
        text: chat,
        updateid: indexu,
      };
      dispatch(updateChatUsers(chatUsersObjectu));
    }
  };

  return (
    <Grid item xs={7}>
      <Stack>
        <Stack spacing={2} direction='row'>
          <Avatar alt={props.chatname} src='/static/images/avatar/1.jpg' />
          <span> {props.chatname} </span>
        </Stack>
        {activeChat &&
          activeChat.map((chat) => (
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <Divider variant='inset' component='li' />
              {chat.type === 'others' && (
                <Grid
                  xs
                  display='flex'
                  justifyContent='flex-start'
                  alignItems='flex-start'
                >
                  <Box sx={{ border: 1, mb: 2 }}>
                    <ListItem>
                      <ListItemText
                        primary={props.chatname}
                        secondary={<React.Fragment>{chat.text}</React.Fragment>}
                      ></ListItemText>
                    </ListItem>
                  </Box>
                </Grid>
              )}

              {chat.type === 'own' && (
                <Grid
                  xs
                  display='flex'
                  justifyContent='flex-end'
                  alignItems='flex-end'
                >
                  <Box sx={{ border: 1, mb: 2 }}>
                    <ListItem>
                      <ListItemText
                        primary={loginuser.name}
                        secondary={<React.Fragment>{chat.text}</React.Fragment>}
                      ></ListItemText>
                    </ListItem>
                  </Box>
                </Grid>
              )}
            </List>
          ))}
        <Stack direction='row' spacing={4}>
          <TextField
            onChange={(event) => setNewChat(event.target.value)}
            // inputRef={chatInput}
            sx={{
              width: '100%',
            }}
            value={newChat}
            id='outlined-multiline-flexible'
            multiline
          />
          <Button
            onClick={() => onSaveClick(newChat)}
            variant='contained'
            size='small'
            sx={{ p: 2 }}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default Chat;
