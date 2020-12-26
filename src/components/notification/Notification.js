import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import BellIcon from './BellIcon';
import { ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core';

const options = [
  'None',
  'Your Number 56 is About to come at Karnal shop',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  listItem: {
    cursor: 'pointer',
  }
}));

export default function LongMenu({textAfterNotificationIcon}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div onClick={handleClick}>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
      >
        <BellIcon />
      </IconButton>
      <p style={{display: 'inline-block'}}>{textAfterNotificationIcon}</p>
      </div>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '50ch',
          },
        }}
      >
        {options.map((option) => (
          <ListItem key={option} className={classes.listItem} onClick={ handleClose }>
            <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
          
        ))}
      </Menu>
    </div>
  );
}