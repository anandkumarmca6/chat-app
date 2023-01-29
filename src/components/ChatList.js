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
  TextField,
  ListItemButton,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid';

import Chat from './Chat';

const ChatList = () => {
  const dispatch = useDispatch();
  // Subscribing to redux store state
  const { contacts, chats, loginuser, chatUsers } = useSelector(
    (state) => state.chat
  );
  // Set state for chat visibilty for particular user
  const [isShown, setIsShown] = useState(false);
  const [activeChatId, setActiveChatId] = useState(null);
  const [activeChatName, setActiveChatName] = useState(null);
  // Set state for contact dialog
  const [open, setOpen] = useState(false);
  // Set state for search
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  // show contact dialog
  const handleClickOpen = () => {
    setOpen(true);
  };
  // Hide contact dialog
  const handleClose = () => {
    setOpen(false);
  };
  // Set data into redux store
  useEffect(() => {
    dispatch(fetchChat());
  }, [dispatch]);

  useEffect(() => {
    searchItems(searchInput);
  }, [searchInput]);
  // Set states for chat visibilty for particular user after click on any user list item
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

  // Search By user name
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    console.log(searchValue);
    if (searchInput !== '') {
      const filteredData = chatUsers.filter((item) => {
        return item.name.toLowerCase() === searchInput.toLowerCase();
      });

      setFilteredResults(filteredData);
    }
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
            {/* Search By name */}
            <Stack>
              <TextField
                label='Search By Name'
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </Stack>
            <Stack direction='row' spacing={34} sx={{ mb: 2 }}>
              {/* Conatct Dialog */}
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
                  <List key={uuid()}>
                    {contacts.map((contact) => (
                      <ListItem
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
              {/* Open contact Dialog */}
              <Typography variant='h6'>CONVERSATIONS</Typography>
              <IconButton aria-label='add' onClick={handleClickOpen}>
                <AddCircleOutlineIcon />
              </IconButton>
            </Stack>
            {/* If search is performed by name  */}
            {searchInput.length > 1 &&
              filteredResults &&
              filteredResults.map((contact) => (
                <List
                  key={uuid()}
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
                      <ListItemAvatar>
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
            {/* Default list when no search is performed */}
            {searchInput.length < 1 &&
              chatUsers &&
              chatUsers.map((contact) => (
                <List
                  key={uuid()}
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
                      <ListItemAvatar>
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
        {/* Show chat of user after click on any user item list */}
        <Grid item xs={7}>
          {isShown && <Chat chatid={activeChatId} chatname={activeChatName} />}
        </Grid>
      </Stack>
    </Grid>
  );
};

export default ChatList;
