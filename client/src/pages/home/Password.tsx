import {
  Button,
  Dialog,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { AlertMessage } from "State/atom";
import { IUser } from "types/User";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ChangePassword from "State/userServices/ChangePassword";

type props = {
  close: (value: boolean) => void;
  open: boolean;
  user: IUser;
};

export default function Password({ open, close, user }: props) {
  const alert = useSetRecoilState(AlertMessage);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleSubmit = () => {
    if (password === passwordConfirm) {
      ChangePassword(user._id!, password)
        .then((resp) => alert({ type: "sucess", body: resp, title: "" }))
        .catch((err) => {
          console.log(err);
          alert({
            type: "error",
            title: "Erro ao atualizar",
            body: err.response.data,
          });
        });
      close(true);
    } else {
      alert({
        type: "error",
        title: "Erro ao atualizar",
        body: "Senhas não coincidem",
      });
    }
  };

  return (
    <Dialog
      onClose={close}
      open={open}
      sx={{
        textAlign: "center",
        "& .MuiPaper-root": {
          padding: "2vh",
          borderRadius: "25px",
          width: "300px",
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item={true} xs={12}>
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            type={showPassword ? "text" : "password"}
            fullWidth
            label="Nova senha"
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
        <Grid item={true} xs={12}>
          <TextField
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            margin="normal"
            required
            type={showPasswordConfirm ? "text" : "password"}
            fullWidth
            label="Confirmar nova senha"
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
                    {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item={true} xs={12}>
          <Button
            color="primary"
            autoFocus
            type="submit"
            onClick={handleSubmit}
          >
            Alterar
          </Button>
          <Button color="warning" autoFocus onClick={(e) => close(false)}>
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
}
