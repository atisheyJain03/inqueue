import React from 'react';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import NotificationsActiveTwoToneIcon from '@material-ui/icons/NotificationsActiveTwoTone';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    background : '#333'
  },
}))(Badge);

export default function BellIcon() {
  return (
    // <IconButton aria-label="bell">
      <StyledBadge badgeContent={6} color="secondary">
        <NotificationsActiveTwoToneIcon />
       
      </StyledBadge>
    // </IconButton>
  );
}
