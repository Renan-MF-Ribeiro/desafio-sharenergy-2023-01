import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { CreateNewAutheticator } from "Components/Utils/Functions";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { AlertMessage, UserState } from "State/atom";
import Auth from "State/userServices/Auth";
import { IAuthentication } from "types/Authentication";

export default function LoginForm() {
  const alert = useSetRecoilState(AlertMessage);
  const userState = useSetRecoilState(UserState);

  const [authenticationStatus, setAuthenticationStatus] =
    useState<IAuthentication>(CreateNewAutheticator());

  const [showPassword, setShowPassword] = useState(false);
  const [handleErrorLogin, setErrorLogin] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const remember = data.get("remember") != null;
    const FormLogin = {
      login: String(data.get("login")),
      password: String(data.get("password")),
    };
    Auth(FormLogin)
      .then((auth) =>
        setAuthenticationStatus({
          ...auth,
          user: { ...auth.user, remember: remember },
        })
      )
      .catch(setErrorLogin);
  };

  useEffect(() => {
    if (authenticationStatus.tokenEncript !== "")
      userState(authenticationStatus);
  }, [authenticationStatus, userState]);

  useEffect(() => {
    if (handleErrorLogin) {
      console.log(handleErrorLogin);
      const msg = {
        type: "error",
        title: "Error ao logar",
        body: handleErrorLogin
      };
      alert(msg);
    }
  }, [handleErrorLogin, alert]);

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="login"
          label="Login"
          name="login"
          autoComplete="login"
          autoFocus
          color="secondary"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? "texte" : "password"}
          id="password"
          autoComplete="current-password"
          color="secondary"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={(e) => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="remember"
              id="remember"
              value="remember"
              color="primary"
            />
          }
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>          
          <Grid item>
            <Link component={RouterLink} to={"/register"} variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
