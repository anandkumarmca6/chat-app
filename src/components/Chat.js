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
import Box from '@mui/material/Box';
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
    <Stack>
      <Stack spacing={2} direction='row' sx={{ mb: 3 }}>
        <Avatar
          sx={{
            bgcolor: 'secondary.main',
            color: 'secondary.contrastText',
          }}
          alt={props.chatname}
          src='/static/images/avatar/1.jpg'
        />
        <span> {props.chatname} </span>
      </Stack>
      {activeChat &&
        activeChat.map((chat) => (
          <List sx={{ width: '100%' }}>
            <Divider variant='inset' component='li' />
            {chat.type === 'others' && (
              <Grid
                xs
                display='flex'
                justifyContent='flex-start'
                alignItems='flex-start'
              >
                <Stack spacing={2}>
                  <Avatar
                    sx={{
                      bgcolor: 'secondary.main',
                      color: 'secondary.contrastText',
                    }}
                    alt={props.chatname}
                    src='/static/images/avatar/1.jpg'
                  />

                  <Box
                    sx={{
                      border: 1,
                      mb: 2,
                    }}
                  >
                    <ListItem color='primary'>
                      <ListItemText primary={chat.text}></ListItemText>
                    </ListItem>
                  </Box>
                </Stack>
              </Grid>
            )}

            {chat.type === 'own' && (
              <Grid
                xs
                display='flex'
                justifyContent='flex-end'
                alignItems='flex-end'
              >
                <Stack spacing={2}>
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                    }}
                    alt={loginuser.name}
                    src='/static/images/avatar/1.jpg'
                  />

                  <Box
                    sx={{
                      border: 1,
                      mb: 2,
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                    }}
                  >
                    <ListItem>
                      <ListItemText primary={chat.text}></ListItemText>
                    </ListItem>
                  </Box>
                </Stack>
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
  );
};

export default Chat;
