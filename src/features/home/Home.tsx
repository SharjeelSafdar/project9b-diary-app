import React, { FC } from "react";
import { CardMedia, Typography, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../../store/rootReducer";
import { useStyles } from "./Home.styles";
import bgImage from "../../images/home-bg.jpg";

const Home: FC = () => {
  const classes = useStyles();
  const navigateTo = useNavigate();
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userName =
    useSelector((state: RootState) => state.user?.username) ?? null;

  return (
    <CardMedia image={bgImage} className={classes.bg}>
      <Typography variant="h1" component="h3">
        {`Welcome${isLoggedIn ? "," : " to"}`}
      </Typography>
      <Typography variant="h1" component="h3">
        {isLoggedIn && userName ? userName : "Diary App"}
      </Typography>
      {isLoggedIn ? (
        <Button
          onClick={() => navigateTo("/diaries")}
          variant="contained"
          color="primary"
        >
          See My Diaries
        </Button>
      ) : (
        <div className={classes.loggedOutBtns}>
          <Button
            onClick={() => navigateTo("/signup")}
            variant="outlined"
            color="primary"
          >
            Register
          </Button>
          <Button
            onClick={() => navigateTo("/login")}
            variant="contained"
            color="primary"
          >
            Log In
          </Button>
        </div>
      )}
    </CardMedia>
  );
};

export default Home;
