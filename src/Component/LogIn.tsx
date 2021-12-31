import { TextField,Typography,Button,Link} from "@material-ui/core";
import { useStyles } from "./CSS/styled";
import { useForm, Controller} from "react-hook-form";
import { useState } from "react";
import * as Yup from "yup";
import axios  from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import {useNavigate} from "react-router-dom"
import FormHelperText from '@mui/material/FormHelperText'

interface ILoginInputs {
  email: string;
  password: string;
}

export default function LogIn() {

  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState('');
  const ApiSignIn = "https://dev.oppi.live/api/admin/v1/auth/signin";
  let navigate = useNavigate();

  const schema = Yup.object().shape({
    email: Yup.string().email("Email is invalid, please try again.").required("Email is required, please fill in."),
    password: Yup.string().required("Password is required.")
  });

  const form = useForm<ILoginInputs>({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
      axios.post(ApiSignIn, data)
          .then((res)=>{
            setErrorMessage("");
            navigate("/polllist");
            localStorage.setItem("AdminAccessToken",res.data.token)
          })
          .catch((e) => {
            console.log("Fail to Sign In");
            if(e.response.data.message=== "Incorrect username or password") {
              setErrorMessage("Email or password is invalid, please try again.")
            }
            else
            setErrorMessage(' ')

        });
  };

  return (
    <div>
      <Typography variant="h3" component="h2">Sign In</Typography>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <div className="emailaddress">
          <label htmlFor="email">EMAIL ADDRESS</label>
          <Controller
            name="email"
            control={form.control}
            render={({ field: { onChange }, fieldState: { error } }) => (
                <TextField
                  onChange={onChange}
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
          <label htmlFor="password">Password</label>
          <Controller
            name="password"
            control={form.control}
            render={({ field: { onChange }, fieldState: { error } }) => (
                <TextField
                  onChange={onChange}
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
          <Button type="submit"  children={"Sign In"} className={classes.button}/>
          <Link href="#" underline="none">{"Forgot Password"}</Link>
          <Link href="#" underline="hover">{"Create new acount"}</Link>

      </form>
    </div>
  );
}

