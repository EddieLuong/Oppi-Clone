import { Link } from "@material-ui/core";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormHelperText from "@mui/material/FormHelperText";
import {
  Wrapper,
  Card,
  MuiTextfield,
  MuiButton,
} from "../../components/styles/styled";
import { useAppDispatch, useAppSelector } from "../../redux/consumeHook.ts";
import { sendSignInRequest, setErrorMessage } from "./reducer";
import { useNavigate } from "react-router-dom";
import clientPath from "../../constants/clientPath";

function LogIn() {
  const dispatch = useAppDispatch();
  const { errorMessage } = useAppSelector((state) => state.login);
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Email is invalid, please try again.")
      .required("Email is required, please fill in."),
    password: Yup.string().required("Password is required."),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    //sendSignInRequest is a "asyncThunk"
    dispatch(sendSignInRequest(data))
      .unwrap() //must add unwrap(). If you not add, function in .then still call when request failed.
      .then(() => {
        navigate(clientPath.POLLLIST);
      });
  };
  return (
    <Wrapper>
      <Card>
        <p className="title">Sign In</p>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <div className="emailaddress">
            <label htmlFor="email">EMAIL ADDRESS</label>
            <Controller
              name="email"
              control={form.control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <MuiTextfield
                  onChange={(value) => {
                    onChange(value);
                    dispatch(setErrorMessage(""));
                  }}
                  className="input_login"
                  name="email"
                  placeholder="Email Address"
                  variant="outlined"
                  type="email"
                  error={Boolean(error)}
                  helperText={error?.message}
                />
              )}
            />
          </div>
          <div className="password">
            <label htmlFor="password">PASSWORD</label>
            <Controller
              name="password"
              control={form.control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <MuiTextfield
                  onChange={(value) => {
                    onChange(value);
                    dispatch(setErrorMessage(""));
                  }}
                  className="input_login"
                  name="password"
                  placeholder="Password"
                  variant="outlined"
                  type="password"
                  error={Boolean(error)}
                  helperText={error?.message}
                />
              )}
            />
          </div>
          <FormHelperText error>{errorMessage}</FormHelperText>
          <MuiButton type="submit">Sign In</MuiButton>
        </form>
        <div className="footerSignIn">
          <Link href="#" underline="none">
            {"Forgot Password"}
          </Link>
          <Link
            style={{ color: "rgb(33, 172, 250)" }}
            href="#"
            underline="hover"
          >
            {"Create new acount"}
          </Link>
        </div>
      </Card>
    </Wrapper>
  );
}
export default React.memo(LogIn);
