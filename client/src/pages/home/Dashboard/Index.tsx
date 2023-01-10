import {
  Box,
  Container,
  TablePagination,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CardUser from "Components/CardUser/Index";
import { useEffect, useState } from "react";
import { handleChangePage } from "State/userServices/HandlerList";
import { useRecoilValue } from "recoil";
import { UsersListState } from "State/atom";
import { IUserList } from "types/UserList";
import TopTitle from "Components/TopTitle";

export default function Dashboard() {
  const AllUsers = useRecoilValue<IUserList>(UsersListState);
  
  useEffect(() => {
    setUsersList(AllUsers);
  }, [AllUsers]);

  const [users, setUsersList] = useState<IUserList>(AllUsers);

  const ChangePage = (event: unknown, newPage: number) => {
    const newInfo = JSON.parse(JSON.stringify(users.info));
    newInfo.page = newPage + 1;
    setUsersList(handleChangePage({ ...users, info: newInfo }, busca));
  };

  const ChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInfo = JSON.parse(JSON.stringify(users.info));
    newInfo.results = Number(event.target.value);
    setUsersList(handleChangePage({ ...users, info: newInfo }, busca));
  };

  const [busca, setBusca] = useState<string>();

  const setSearchTerm = (term: string) => {
    setBusca(term);
    setUsersList(handleChangePage(users, term));
  };

  return (
    <Container maxWidth="xl">
      <TopTitle first="RAMDOM" second="USERS">
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Buscar</InputLabel>
          <OutlinedInput
            value={busca}
            onChange={(evento) => setSearchTerm(evento.target.value)}
            sx={{ borderRadius: "25px" }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  type="submit"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </TopTitle>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <br />
        {users?.data.map((user) => (
          <Box
            sx={{
              width: { lg: "18.5%", md: "30%", sm: "100%" },
              padding: { lg: "0.5vw", md: "0.5vw", sm: "1vh" },
            }}
            key={user.id}
          >
            <CardUser {...user} />
          </Box>
        ))}
      </Container>
      <TablePagination
        sx={{
          ".MuiTablePagination-toolbar": {
            flexWrap: "wrap",
            justifyContent: "center",
          },
        }}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        labelRowsPerPage="Usuários por pág."
        component="div"
        count={users.info.total}
        rowsPerPage={users.info.results!}
        page={users.info.page! - 1}
        onPageChange={ChangePage}
        onRowsPerPageChange={ChangeRowsPerPage}
      />
    </Container>
  );
}
