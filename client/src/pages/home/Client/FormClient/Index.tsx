import {
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { IClient } from "types/Client";
import style from "./FormClient.module.scss";
import classNames from "classnames";
import { States, Citys } from "./StateCity";
import { useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import UpdateClient from "State/clientServices/UpdateClient";
import { useSetRecoilState } from "recoil";
import { AlertMessage } from "State/atom";
import CreateClient from "State/clientServices/CreateClient";
import { ValidateFormClient,stringAvatar } from "Components/Utils/Functions";

type propsForm = {
  close: (refresh: boolean) => void;
  open: boolean;
  client?: IClient;
  setClient: React.Dispatch<React.SetStateAction<IClient | undefined>>;
};
export default function FormClient({
  close,
  open,
  client = undefined,
  setClient,
}: propsForm) {
 

  const alert = useSetRecoilState(AlertMessage);

  const [tryForm, setTryForm] = useState(false);

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
          setClient((client: any) => ({ ...client, picture: fr.result }));
        };
        fr.readAsDataURL(file);
      }
    }
  };

  const update = () => {
    UpdateClient(client!._id!, client!)
      .then((resp) => {
        alert({
          type: "sucess",
          title: "Atualizado",
          body: "Cliente atualizado com sucesso",
        });
        closeForm(true);
      })
      .catch((err) =>
        alert({ type: "error", title: "Erro ao Atualizar", body: err })
      );
  };

  const create = () => {
    CreateClient(client!)
      .then((resp) => {
        alert({
          type: "sucess",
          title: "Cadastro",
          body: "Cliente cadastrado com sucesso",
        });
        closeForm(true);
      })
      .catch((err) =>
        alert({ type: "error", title: "Erro ao Atualizar", body: err })
      );
  };

  const closeForm = (refresh: boolean) => {
    close(refresh);
    setTryForm(false);
  };

  const handleSubmit = () => {
    setTryForm(true);
    if (client) {
      if (ValidateFormClient(client)) {
        if (client._id) {
          update();
        } else {
          create();
        }
      } else {
        alert({
          type: "error",
          title: "Erro",
          body: "Cadastro não preenchido corretamente",
        });
      }
    }
  };

  return (
    <Dialog
      onClose={(e) => closeForm(false)}
      open={open}
      sx={{
        "& .MuiPaper-root": {
          maxWidth: "900px",
          maxHeight: "calc(100% - 30px)",
        },
      }}
    >
      <DialogTitle id="responsive-dialog-title">
        <Typography variant="h6" component="span" color="primary.main">
          {`${client?._id ? "Editar" : "Novo"} Cliente`}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ padding: "0 50px", overflowY: "visible" }}>
        <Grid container spacing={2} className={style.boxContainer}>
          <Grid
            item={true}
            xs={6}
            className={classNames([style.box, style.box_Avatar])}
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
              {client?.picture ? (
                <Avatar
                  alt={client?.name}
                  src={client?.picture}
                  sx={{ width: 250, height: 250 }}
                />
              ) : (
                <Avatar
                  {...stringAvatar(client?.name || "S")}
                  sx={{
                    width: 250,
                    height: 250,
                    bgcolor: "primary.main",
                    fontSize: "5rem",
                  }}
                />
              )}
            </Badge>
          </Grid>
          <Grid
            item={true}
            xs={6}
            className={classNames([style.box, style.box_Info])}
          >
            <Box sx={{ mt: 1 }}>
              <Typography variant="h6" component="span" color="primary.main">
                Informações Pessoais
              </Typography>
              <TextField
                value={client?.name ?? ""}
                onChange={(e) =>
                  setClient((client: any) => ({
                    ...client,
                    name: e.target.value,
                  }))
                }
                margin="normal"
                required
                fullWidth
                id="fullname"
                label="Nome Completo"
                name="name"
                autoComplete="name"
                autoFocus
                color="secondary"
                error={
                  tryForm && (client?.name === "" || client?.name === undefined)
                }
                helperText={
                  tryForm && (client?.name === "" || client?.name === undefined)
                    ? "Campo inválido!"
                    : " "
                }
              />
              <TextField
                value={client?.cpf ?? ""}
                onChange={(e) =>
                  setClient((client: any) => ({
                    ...client,
                    cpf: e.target.value,
                  }))
                }
                error={
                  tryForm && (client?.cpf === "" || client?.cpf === undefined)
                }
                helperText={
                  tryForm && (client?.cpf === "" || client?.cpf === undefined)
                    ? "Campo inválido!"
                    : " "
                }
                margin="normal"
                required
                fullWidth
                name="cpf"
                label="CPF"
                type="number"
                id="cpf"
                autoComplete="cpf"
                color="secondary"
                inputProps={{ minLength: 11, maxLength: 11 }}
              />
            </Box>
          </Grid>
          <Grid
            item={true}
            xs={4}
            className={classNames([style.box, style.box_Form])}
          >
            <Box sx={{ mt: 1 }}>
              <Typography variant="h6" component="span" color="primary.main">
                Contato
              </Typography>
              <TextField
                value={client?.cell ?? ""}
                onChange={(e) =>
                  setClient((client: any) => ({
                    ...client,
                    cell: e.target.value,
                  }))
                }
                error={
                  tryForm && (client?.cell === "" || client?.cell === undefined)
                }
                helperText={
                  tryForm && (client?.cell === "" || client?.cell === undefined)
                    ? "Campo inválido!"
                    : " "
                }
                margin="normal"
                required
                fullWidth
                id="cell"
                label="Celular"
                type="text"
                name="cell"
                autoComplete="cell"
                autoFocus
                color="secondary"
              />
              <TextField
                value={client?.phone ?? ""}
                onChange={(e) =>
                  setClient((client: any) => ({
                    ...client,
                    phone: e.target.value,
                  }))
                }
                margin="normal"
                fullWidth
                id="phone"
                label="Telefone"
                name="phone"
                type="text"
                autoComplete="phone"
                autoFocus
                color="secondary"
                helperText=" "
                error={false}
              />
              <TextField
                value={client?.email ?? ""}
                onChange={(e) =>
                  setClient((client: any) => ({
                    ...client,
                    email: e.target.value,
                  }))
                }
                error={
                  tryForm &&
                  (client?.email === "" || client?.email === undefined)
                }
                helperText={
                  tryForm &&
                  (client?.email === "" || client?.email === undefined)
                    ? "Campo inválido!"
                    : " "
                }
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                id="email"
                autoComplete="email"
                color="secondary"
              />
            </Box>
          </Grid>
          <Grid
            item={true}
            xs={8}
            className={classNames([style.box, style.box_Form])}
          >
            <Box sx={{ mt: 1 }}>
              <Typography variant="h6" component="span" color="primary.main">
                Endereço
              </Typography>
              <Grid container>
                <Grid item={true} xs={9}>
                  <TextField
                    value={client?.street ?? ""}
                    onChange={(e) =>
                      setClient((client: any) => ({
                        ...client,
                        street: e.target.value,
                      }))
                    }
                    error={
                      tryForm &&
                      (client?.street === "" || client?.street === undefined)
                    }
                    helperText={
                      tryForm &&
                      (client?.street === "" || client?.street === undefined)
                        ? "Campo inválido!"
                        : " "
                    }
                    margin="normal"
                    required
                    fullWidth
                    id="street"
                    label="Rua/Avenida"
                    name="street"
                    autoComplete="street"
                    autoFocus
                    color="secondary"
                  />
                </Grid>
                <Grid item={true} xs={3}>
                  <TextField
                    value={client?.number ?? ""}
                    onChange={(e) =>
                      setClient((client: any) => ({
                        ...client,
                        number: e.target.value,
                      }))
                    }
                    error={
                      tryForm &&
                      (client?.number === "" || client?.number === undefined)
                    }
                    helperText={
                      tryForm &&
                      (client?.number === "" || client?.number === undefined)
                        ? "Campo inválido!"
                        : " "
                    }
                    margin="normal"
                    required
                    fullWidth
                    name="number"
                    label="Número"
                    type="number"
                    id="number"
                    autoComplete="number"
                    color="secondary"
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <TextField
                    value={client?.district ?? ""}
                    onChange={(e) =>
                      setClient((client: any) => ({
                        ...client,
                        district: e.target.value,
                      }))
                    }
                    error={
                      tryForm &&
                      (client?.district === "" ||
                        client?.district === undefined)
                    }
                    helperText={
                      tryForm &&
                      (client?.district === "" ||
                        client?.district === undefined)
                        ? "Campo inválido!"
                        : " "
                    }
                    margin="normal"
                    required
                    fullWidth
                    id="district"
                    label="Bairro"
                    name="district"
                    autoComplete="district"
                    autoFocus
                    color="secondary"
                  />
                </Grid>
                <Grid item={true} xs={4}>
                  <FormControl
                    fullWidth
                    sx={{ marginTop: "16px", marginBottom: "8px" }}
                  >
                    <InputLabel id="state">Estado</InputLabel>
                    <Select
                      labelId="state"
                      id="state"
                      label="Estado"
                      variant="outlined"
                      error={
                        tryForm &&
                        (client?.state === "" || client?.state === undefined)
                      }
                      value={client?.state ?? ""}
                      onChange={(e) =>
                        setClient((client: any) => ({
                          ...client,
                          state: e.target.value,
                          city: "",
                        }))
                      }
                    >
                      <MenuItem value=""></MenuItem>
                      {States().map((state: string, i: number) => (
                        <MenuItem key={i} value={state}>
                          {state}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item={true} xs={8}>
                  <FormControl
                    fullWidth
                    sx={{ marginTop: "16px", marginBottom: "8px" }}
                  >
                    <InputLabel id="state">Estado</InputLabel>
                    <Select
                      labelId="city"
                      id="city"
                      label="Cidade"
                      variant="outlined"
                      value={client?.city ?? ""}
                      error={
                        tryForm &&
                        (client?.city === "" || client?.city === undefined)
                      }
                      onChange={(e) =>
                        setClient((client: any) => ({
                          ...client,
                          city: e.target.value,
                        }))
                      }
                    >
                      <MenuItem value=""></MenuItem>
                      {Citys(client?.state)?.map((city: string, i: number) => (
                        <MenuItem key={i} value={city}>
                          {city}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="warning" autoFocus onClick={(e) => closeForm(false)}>
          Cancelar
        </Button>
        <Button color="primary" autoFocus type="submit" onClick={handleSubmit}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
