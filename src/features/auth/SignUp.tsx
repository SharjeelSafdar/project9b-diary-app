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
import { SignUpFormValues } from "./auth.types";
import { signUpFormSchema } from "./validationSchema";
import { RootState } from "../../store/rootReducer";
import { signUp } from "./authSlice";
import { useAppDispatch } from "../../store";

const initialValues: SignUpFormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp: FC = () => {
  const classes = useStyles();
  const navigateTo = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const onSubmit = (signUpData: SignUpFormValues) => {
    dispatch(
      signUp({
        username: signUpData.username,
        email: signUpData.email,
        password: signUpData.password,
      })
    );
    navigateTo("/");
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
        Sign Up
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={signUpFormSchema}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <Grid container justify="center" spacing={1}>
              <Grid item xs={12}>
                <CustomTextField name="username" label="Username" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField name="email" label="Email" fullWidth />
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
                <CustomTextField
                  name="confirmPassword"
                  label="Confirm Password"
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
                  {isSubmitting ? "Signing Up" : "Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <Link
        href="/login"
        onClick={() => navigateTo("/login")}
        className={classes.link}
      >
        Already have an account? Log in here.
      </Link>
    </Container>
  );
};

export default SignUp;
