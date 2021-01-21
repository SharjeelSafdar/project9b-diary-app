import { User } from "../../interfaces/user.interface";

export type LogInFormValues = Pick<User, "username" | "password">;

export type SignUpFormValues = Pick<User, "username" | "password" | "email"> & {
  confirmPassword?: string;
};
