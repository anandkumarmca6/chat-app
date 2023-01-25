import React, { useState, useEffect } from 'react';
import { setUserChat } from '../store/userChatSlice';
import { fetchChat } from '../store/chatSlice';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Stack,
  Grid,
  IconButton,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Chat from './Chat';
import Search from './Search';

const ChatList = () => {
  const dispatch = useDispatch();
  const { contacts, chats, loginuser } = useSelector((state) => state.chat);
  const [isShown, setIsShown] = useState(false);
  const [activeChatId, setActiveChatId] = useState(null);
  const [activeChatName, setActiveChatName] = useState(null);

  useEffect(() => {
    dispatch(fetchChat());
  }, [dispatch]);
  const handleClick = (id, name) => {
    setIsShown(true);
    setActiveChatId(id);
    setActiveChatName(name);
    let output = [];
    for (let chat of chats) {
      if (
        (chat.to === id && chat.from === loginuser.login_id) ||
        (chat.to === loginuser.login_id && chat.from === id)
      ) {
        output.push(chat);
      }
    }
    dispatch(setUserChat(output));
  };

  return (
    <Grid container spacing={2} direction='column'>
      <Stack
        direction='row'
        spacing={2}
        divider={<Divider orientation='vertical' flexItem />}
      >
        <Grid item xs={5}>
          <Stack>
            <Search />
            <Stack direction='row' spacing={9}>
              <Typography variant='h6' spacing={2}>
                CONVERSATIONS
              </Typography>
              <IconButton aria-label='add'>
                <AddCircleOutlineIcon />
              </IconButton>
            </Stack>
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            >
              {contacts &&
                contacts.map((contact) => (
                  <ListItem
                    alignItems='flex-start'
                    key={contact.id}
                    onClick={() => handleClick(contact.id, contact.name)}
                  >
                    <ListItemAvatar>
                      <Avatar src='/static/images/avatar/1.jpg' />
                    </ListItemAvatar>

                    <ListItemText
                      primary={contact.name}
                      secondary={<React.Fragment>{}</React.Fragment>}
                    />
                    <Divider variant='inset' component='li' />
                  </ListItem>
                ))}
            </List>
          </Stack>
        </Grid>
        {isShown && <Chat chatid={activeChatId} chatname={activeChatName} />}
      </Stack>
    </Grid>
  );
};

export default ChatList;
