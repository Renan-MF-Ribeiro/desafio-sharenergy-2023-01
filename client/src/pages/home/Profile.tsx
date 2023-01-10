import {
  Avatar,
  Badge,
  Box,
  Grid,
  Dialog,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useRef, useState } from "react";
import { stringAvatar } from "../../Components/Utils/Functions";

import { IUser } from "types/User";
import UpdateUser from "State/userServices/UpdateUser";
import { useSetRecoilState } from "recoil";
import { AlertMessage } from "State/atom";

type props = {
  close: (value: boolean) => void;
  open: boolean;
  user: IUser;
};
export default function Profile({ open, close, user }: props) {
  const alert = useSetRecoilState(AlertMessage);
  const [userEdit, setUserEdit] = useState(user);

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
          setUserEdit((user: any) => ({ ...user, picture: fr.result }));
        };
        fr.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = () => {
    const userUpdate = {...userEdit,remember:null}
    UpdateUser(userEdit._id!, userUpdate)
      .then((resp) =>
        alert({ type: "sucess", body: "Usuário atualizado.", title: "" })
      )
      .catch((err) => {
        console.log(err);
        alert({
          type: "error",
          title: "Erro ao atualizar",
          body: err.response.data,
        });
      });
    close(true);
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
          maxWidth: "900px",
          width: "750px",
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item={true} xs={4}>
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
                    backgroundColor: "primary.main",
                    color: "secondary.main",
                    "&:hover": {
                      backgroundColor: "secondary.main",
                      color: "primary.main",
                    },
                  }}
                  size="large"
                >
                  <EditIcon />
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
              {userEdit?.picture ? (
                <Avatar
                  alt={userEdit?.name}
                  src={userEdit?.picture}
                  sx={{ width: 250, height: 250 }}
                />
              ) : (
                <Avatar
                  {...stringAvatar(userEdit?.name || "S")}
                  sx={{
                    width: 250,
                    height: 250,
                    bgcolor: "primary.main",
                    fontSize: "5rem",
                  }}
                />
              )}
            </Badge>
          </Box>
        </Grid>
        <Grid item={true} xs={8} sx={{ width: "300px" }}>
          <Grid container spacing={2}>
            <Grid item={true} xs={12}>
              <TextField
                value={userEdit?.name}
                onChange={(e) =>
                  setUserEdit((user: any) => ({
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
            <Grid item={true} xs={6}>
              <TextField
                value={userEdit?.networkLogin}
                onChange={(e) =>
                  setUserEdit((user: any) => ({
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
                value={userEdit?.birthDate}
                onChange={(e) =>
                  setUserEdit((user: any) => ({
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
              />
            </Grid>
            <Grid item={true} xs={12}>
              <TextField
                value={userEdit?.email}
                onChange={(e) =>
                  setUserEdit((user: any) => ({
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
              <Button
                color="primary"
                autoFocus
                type="submit"
                onClick={handleSubmit}
              >
                Salvar
              </Button>
              <Button color="warning" autoFocus onClick={(e) => close(false)}>
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}
