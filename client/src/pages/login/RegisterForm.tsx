import {
  Grid,
  Box,
  Badge,
  IconButton,
  Avatar,
  TextField,
  Button,
  InputAdornment,
  Link,
} from "@mui/material";
import { stringAvatar, CreateNewUser } from "Components/Utils/Functions";
import { useRef, useState } from "react";
import { IUser } from "types/User";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import RegisterUser from "State/userServices/RegisterUser";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { AlertMessage } from "State/atom";

export default function ResgisterForm() {
  const alert = useSetRecoilState(AlertMessage);
  const [createUser, setCreateUser] = useState<IUser>(CreateNewUser());
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const navigate = useNavigate();
  const picture = useRef<HTMLInputElement | null>(null);

  const selectPicture = () => {
    picture.current?.click();
  };

  const handlePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      // FileReader support
      if (FileReader && file) {
        var fr = new FileReader();
        fr.onload = function () {
          setCreateUser((user: any) => ({ ...user, picture: fr.result }));
        };
        fr.readAsDataURL(file);
      }
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === passwordConfirm) {
      const newUser = {
        name: createUser.name,
        networkLogin: createUser.networkLogin,
        email: createUser.email,
        birthDate: createUser.birthDate,
        password: password,
        picture: createUser.picture,
      };
      RegisterUser(newUser)
        .then((resp) => {
          alert({ type: "sucess", body: "Usuário cadastrado com sucesso", title: "" });
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          alert({
            type: "error",
            title: "Erro ao atualizar",
            body: err.error,
          });
        });
    } else {
      alert({
        type: "error",
        title: "Erro ao atualizar",
        body: "Senhas não coincidem",
      });
    }
  };
  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container>
        <Grid item={true} xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "3vh",
            }}
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <IconButton
                  onClick={selectPicture}
                  aria-label="delete"
                  sx={{
                    backgroundColor: "secondary.main",
                    color: "primary.main",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "secondary.main",
                    },
                  }}
                  size="small"
                >
                  <AssignmentIndOutlinedIcon />
                  <input
                    type="file"
                    id="file"
                    ref={picture}
                    style={{ display: "none" }}
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={(e) => handlePicture(e)}
                  />
                </IconButton>
              }
            >
              {createUser?.picture ? (
                <Avatar
                  sx={{ width: 100, height: 100 }}
                  alt={createUser?.name}
                  src={createUser?.picture}
                />
              ) : (
                <Avatar
                  {...stringAvatar(createUser?.name || "S")}
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: "primary.main",
                    fontSize: "2.5rem",
                  }}
                />
              )}
            </Badge>
          </Box>
        </Grid>
        <Grid item={true} xs={12} sx={{ width: "300px" }}>
          <Grid container>
            <Grid item={true} xs={12}>
              <TextField
                value={createUser?.name}
                onChange={(e) =>
                  setCreateUser((user: any) => ({
                    ...user,
                    name: e.target.value,
                  }))
                }
                margin="normal"
                required
                fullWidth
                label="Nome"
                autoComplete="name"
                color="secondary"
              />
            </Grid>
            <Grid item={true} xs={12}>
              <TextField
                value={createUser?.email}
                onChange={(e) =>
                  setCreateUser((user: any) => ({
                    ...user,
                    email: e.target.value,
                  }))
                }
                margin="normal"
                required
                fullWidth
                type="email"
                label="Email"
                autoComplete="email"
                color="secondary"
              />
            </Grid>
            <Grid item={true} xs={12}>
              <TextField
                value={createUser?.networkLogin}
                onChange={(e) =>
                  setCreateUser((user: any) => ({
                    ...user,
                    networkLogin: e.target.value,
                  }))
                }
                margin="normal"
                required
                fullWidth
                label="Login"
                autoComplete="networklogin"
                color="secondary"
              />
            </Grid>
            <Grid item={true} xs={6}>
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                type={showPassword ? "text" : "password"}
                fullWidth
                label="Senha"
                autoComplete="password"
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
            </Grid>
            <Grid item={true} xs={6}>
              <TextField
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                margin="normal"
                required
                type={showPasswordConfirm ? "text" : "password"}
                fullWidth
                label="Confirmar senha"
                autoComplete="password"
                color="secondary"
                error={password !== passwordConfirm}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={(e) =>
                          setShowPasswordConfirm(!showPasswordConfirm)
                        }
                        edge="end"
                      >
                        {showPasswordConfirm ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item={true} xs={12}>
              <TextField
                value={createUser?.birthDate}
                onChange={(e) =>
                  setCreateUser((user: any) => ({
                    ...user,
                    birthDate: e.target.value,
                  }))
                }
                margin="normal"
                required
                type="date"
                fullWidth
                label="Data de Nascimento"
                autoComplete="birthDate"
                color="secondary"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item={true} xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Grid>
            <Link component={RouterLink} to={"/"} variant="body2">
              {"Have an account? Sign In"}
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
