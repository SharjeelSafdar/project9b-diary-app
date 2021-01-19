import React, { FC } from "react";
import {
  Grid,
  Typography,
  Button,
  Container,
  CircularProgress,
  Link,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { CustomTextField } from "../../components";
import { useStyles } from "./auth.styles";
import { LogInFormValues } from "./auth.types";
import { logInFormSchema } from "./validationSchema";
import { User } from "../../interfaces/user.interface";
import http from "../../services/api";
import { RootState } from "../../store/rootReducer";
import { saveToken, setAuthState } from "./authSlice";
import { setUser } from "./userSlice";
import { AuthResponse } from "../../services/mirage/routes/user";
import { useAppDispatch } from "../../store";

const initialValues: LogInFormValues = {
  username: "",
  password: "",
};

const LogIn: FC = () => {
  const classes = useStyles();
  const navigateTo = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const onSubmit = (data: LogInFormValues) => {
    http
      .post<User, AuthResponse>("/auth/login", data)
      .then((res) => {
        if (res) {
          const { user, token } = res;
          dispatch(saveToken(token));
          dispatch(setUser(user));
          dispatch(setAuthState(true));
          navigateTo("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isLoggedIn) {
    return <Typography variant="h5">You are already logged in.</Typography>;
  }

  return (
    <Container className={classes.container}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        className={classes.heading}
      >
        Log In
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={logInFormSchema}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <Grid container justify="center" spacing={1}>
              <Grid item xs={12}>
                <CustomTextField name="username" label="Username" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  name="password"
                  label="Password"
                  fullWidth
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  startIcon={
                    isSubmitting ? (
                      <CircularProgress
                        size="1rem"
                        className={classes.circular}
                      />
                    ) : null
                  }
                  disabled={!isValid}
                >
                  {isSubmitting ? "Loging In" : "Log In"}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <Link
        href="/signup"
        onClick={() => navigateTo("/signup")}
        className={classes.link}
      >
        Don't have an account? Sign up here.
      </Link>
    </Container>
  );
};

export default LogIn;
