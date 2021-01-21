import React, { FC, useState } from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { BiLogIn, BiLogOut } from "react-icons/bi";

import { RootState } from "../../store/rootReducer";
import { useAppDispatch } from "../../store";
import { logOut } from "../auth/authSlice";
import { DrawerMenu } from "./DrawerMenu";
import { useStyles } from "./NavBar.styles";

export const NavBar: FC = () => {
  const classes = useStyles();
  const navigateTo = useNavigate();
  const dispatch = useAppDispatch();
  const [showDrawerMenu, setShowDrawerMenu] = useState(false);
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const logOutFunc = () => {
    dispatch(logOut());
    navigateTo("/");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => setShowDrawerMenu(true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            title="Menu"
          >
            <MdMenu />
          </IconButton>
          <Typography
            variant="h5"
            component="h1"
            onClick={() => navigateTo("/")}
            title="Home"
            className={classes.title}
          >
            Diary App
          </Typography>
          <IconButton
            onClick={() => (isLoggedIn ? logOutFunc() : navigateTo("/login"))}
            className={classes.logInBtn}
            edge="start"
            color="inherit"
            aria-label={isLoggedIn ? "logout" : "login"}
            title={isLoggedIn ? "Log Out" : "Log In"}
          >
            {isLoggedIn ? <BiLogOut /> : <BiLogIn />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <DrawerMenu
        open={showDrawerMenu}
        onClose={() => setShowDrawerMenu(false)}
      />
    </>
  );
};
