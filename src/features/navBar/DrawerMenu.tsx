import React, { FC } from "react";
import {
  Drawer,
  DrawerProps,
  Avatar,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "../../store/rootReducer";
import { useAppDispatch } from "../../store";
import { saveToken, setAuthState } from "../auth/authSlice";
import { setUser } from "../auth/userSlice";
import { useStyles } from "./DrawerMenu.styles";

interface DrawerMenuProps extends Pick<DrawerProps, "open" | "onClose"> {}

export const DrawerMenu: FC<DrawerMenuProps> = ({ open, onClose }) => {
  const classes = useStyles();
  const navigateTo = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.user);

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div className={classes.container}>
        {!(isLoggedIn && user) ? (
          <>
            <Typography variant="body1">You are not signed in.</Typography>
            <Divider variant="middle" className={classes.divider} />
          </>
        ) : (
          <>
            <Avatar className={classes.avatar} />
            <Typography variant="body1" align="center">
              {user?.username}
            </Typography>
            <Typography variant="body1" align="center">
              {user?.email}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.topBtn}
              fullWidth
              onClick={() => {
                navigateTo("/diaries");
              }}
            >
              My Diaries
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                dispatch(saveToken("null"));
                dispatch(setUser(null));
                dispatch(setAuthState(false));
                navigateTo("/");
              }}
            >
              Log Out
            </Button>
            <Divider variant="middle" className={classes.divider} />
          </>
        )}
      </div>
    </Drawer>
  );
};
