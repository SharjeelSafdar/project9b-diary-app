import * as Yup from "yup";

export const logInFormSchema = Yup.object().shape({
  username: Yup.string()
    .required("What? No username?")
    .max(16, "Username cannot be longer than 16 characters"),
  password: Yup.string().required('Without a password, "None shall pass!"'),
});

export const signUpFormSchema = Yup.object().shape({
  username: Yup.string()
    .required("What? No username?")
    .max(16, "Username cannot be longer than 16 characters"),
  email: Yup.string().email("Please provide a valid email address (abc@xy.z)"),
  password: Yup.string().required('Without a password, "None shall pass!"'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password must be the same.")
    .required("Required"),
});
