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
import { addChats } from '../store/chatSlice';
import { addChat } from '../store/userChatSlice';
const Chat = (props) => {
  const dispatch = useDispatch();
  const { userChat: activeChat } = useSelector((state) => state.userChat);
  const [newChat, setNewChat] = useState('');
  const { loginuser } = useSelector((state) => state.chat);

  const onSaveClick = (chat) => {
    const chatObject = {
      id: 3,
      to: props.chatid,
      from: 1,
      text: chat,
      type: 'own',
    };
    dispatch(addChat(chatObject));

    dispatch(addChats(chatObject));
    setNewChat('');
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
