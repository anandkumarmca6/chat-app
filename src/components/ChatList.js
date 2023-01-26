import React, { useState, useEffect } from 'react';
import { setUserChat } from '../store/userChatSlice';
import { fetchChat } from '../store/chatSlice';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  List,
  ListItem,
  Divider,
  Dialog,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Stack,
  Grid,
  ListItemButton,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';

import Chat from './Chat';
import Search from './Search';

const ChatList = () => {
  const dispatch = useDispatch();
  const { contacts, chats, loginuser, chatUsers } = useSelector(
    (state) => state.chat
  );
  const [isShown, setIsShown] = useState(false);
  const [activeChatId, setActiveChatId] = useState(null);
  const [activeChatName, setActiveChatName] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchChat());
  }, [dispatch]);
  const handleClick = (id, name) => {
    setOpen(false);
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
            <Stack direction='row' spacing={34} sx={{ mb: 2 }}>
              {open && (
                <Dialog
                  onClose={handleClose}
                  open={open}
                  aria-labelledby='dialog-title'
                  aria-describedby='dialog-description'
                  sx={{
                    width: '100%',
                    maxWidth: 600,
                    ml: 22,
                    mb: 5,
                  }}
                >
                  <DialogTitle id='dialog-title'>Contacts</DialogTitle>
                  <List>
                    {contacts.map((contact) => (
                      <ListItem
                        key={contact.id}
                        onClick={() => handleClick(contact.id, contact.name)}
                      >
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar
                              sx={{
                                bgcolor: 'secondary.main',
                                color: 'secondary.contrastText',
                              }}
                              alt={contact.name}
                              src='/static/images/avatar/1.jpg'
                            ></Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={contact.name} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Dialog>
              )}
              <Typography variant='h6'>CONVERSATIONS</Typography>
              <IconButton aria-label='add'>
                <AddCircleOutlineIcon onClick={handleClickOpen} />
              </IconButton>
            </Stack>
            {chatUsers &&
              chatUsers.map((contact) => (
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 600,
                    bgcolor: 'background.paper',
                  }}
                >
                  <ListItem
                    onClick={() => handleClick(contact.id, contact.name)}
                  >
                    <ListItemButton>
                      <ListItemAvatar alignItems='flex-start' key={contact.id}>
                        <Avatar
                          sx={{
                            bgcolor: 'secondary.main',
                            color: 'secondary.contrastText',
                          }}
                          alt={contact.name}
                          src='/static/images/avatar/1.jpg'
                        />
                      </ListItemAvatar>

                      <ListItemText
                        alignItems='flex-start'
                        key={contact.id}
                        primary={contact.name}
                        secondary={
                          <React.Fragment>{contact.text}</React.Fragment>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider variant='inset' component='li' />
                </List>
              ))}
          </Stack>
        </Grid>
        <Grid item xs={7}>
          {isShown && <Chat chatid={activeChatId} chatname={activeChatName} />}
        </Grid>
      </Stack>
    </Grid>
  );
};

export default ChatList;
