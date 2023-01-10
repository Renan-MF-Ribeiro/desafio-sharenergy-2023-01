import {
  CssBaseline,
  Paper,
  Box,
  Grid,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { useState, useLayoutEffect } from "react";
import Copyright from "../../Components/Copyryght";
import useAuthenticator from "State/hooks/Autheticator";

export default function Login() {
  useAuthenticator();


  const [backgroundImageDog, setBackgroundImageDog] = useState("");

  useLayoutEffect(() => {
    fetch("https://random.dog/woof.json?include=jpg,png")
      .then((resp) => resp.json())
      .then((response) => setBackgroundImageDog(`url(${response.url})`));
  }, []);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: backgroundImageDog,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="/assets/logo.png"
            alt="SHARENERGY"
            style={{ width: "50%", margin: " 5vh 0" }}
          />
         <Outlet/>
        <Copyright sx={{ mt: 5 }} color="text.secondary" />
        </Box>
      </Grid>
    </Grid>
  );
}
