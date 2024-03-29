import React, { useContext, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import queueIcon from "../../icons/queue2.svg";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import Notification from "../notification/Notification";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import Axios from "axios";
import axios from "../../axios";
import { UserContext } from "../../UserContext";
import UserAvatar from "../Avatar/UserAvatar";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    cursor: "pointer",
    fontSize: "2.3rem",
    minWidth: "200px",
    fontStyle: "normal",
    fontWeight: "600",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  iconLogo: {
    height: "1.6rem",
    marginRight: "-10px",
    marginLeft: "10px",
    cursor: "pointer",
    [theme.breakpoints.up("sm")]: {
      height: "2.0rem",
    },
  },
  btnPartner: {},
}));

export default function HeaderCustom({ setSnackbar, searchBar }) {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  // console.log("header");
  const [user, setUser] = useContext(UserContext);
  // console.log(user);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    handleMobileMenuClose();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    ></Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {user ? (
        <div>
          <MenuItem onClick={handleProfileMenuOpen}>
            <Notification textAfterNotificationIcon="Notifications" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMobileMenuClose();
              history.push("/userInfo");
            }}
          >
            <IconButton>
              <UserAvatar size="small" src={user.photo} />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
        </div>
      ) : (
        <MenuItem
          onClick={() => {
            // console.log("login");
            history.push("/login");
            handleMobileMenuClose();
          }}
        >
          <p>Login</p>
        </MenuItem>
      )}
      <MenuItem
        onClick={() => {
          handleMobileMenuClose();
          history.push("/shops");
        }}
      >
        <p>Shops and services</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <img
            src={queueIcon}
            className={classes.iconLogo}
            onClick={() => history.push("/")}
          />
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            onClick={() => history.push("/")}
          >
            <div>
              <span>inQueue</span>
            </div>
          </Typography>
          {searchBar ? (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          ) : null}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button onClick={() => history.push("/shops")}>
              Shops and services
            </Button>
            {user ? (
              <>
                <Notification />
                <IconButton
                  onClick={() => {
                    history.push("/userInfo");
                  }}
                >
                  <UserAvatar size="small" src={user.photo} />
                </IconButton>
              </>
            ) : (
              <>
                <Button onClick={() => history.push("/login")}>Login</Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push("/shopAccount/loginShop")}
                >
                  Become A Partner
                </Button>
              </>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
