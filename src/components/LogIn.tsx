import {Link} from "@material-ui/core";
import { useForm, Controller} from "react-hook-form";
import { useState } from "react";
import * as Yup from "yup";
import axios  from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import {useNavigate} from "react-router-dom"
import FormHelperText from '@mui/material/FormHelperText'
import {ApiSignIn} from "./Utils"
import {Wrapper,Card,MuiTextfield,MuiButton} from "./styles/styled"

interface ILoginInputs {
  email: string;
  password: string;
}

export default function LogIn() {
  const [errorMessage, setErrorMessage] = useState('');

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
            if(res.status === 200){
              setErrorMessage("");
              //Use Async function because sometime polllist page call API too fast and internet slow, token haven't set yet and have error when call API without Token. So, to sure Token have already when call API, I use Async Function
              async function setToken(){
                sessionStorage.setItem("AdminAccessToken",res.data.token);
              }
              setToken().then(()=>{
                navigate("/polllist")
              })
            }
          })
          .catch((e) => {
            console.log("Fail to Sign In");
            if(e.response.data.message=== "Incorrect username or password") {
              setErrorMessage("Email or password is invalid, please try again.")
            }
            else{
              setErrorMessage(' ')
            }
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
                  onChange={onChange}
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
                  onChange={onChange}
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
          <MuiButton type="submit" >
          Sign In
          </MuiButton>
      </form>
      <div className="footerSignIn">
        <Link href="#" underline="none">{"Forgot Password"}</Link>
        <Link style={{color:"rgb(33, 172, 250)"}} href="#" underline="hover">{"Create new acount"}</Link>
      </div>
      </Card>
    </Wrapper>
  );
}

