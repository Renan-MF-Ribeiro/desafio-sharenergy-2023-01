import { Container, Box, Button } from "@mui/material";
import TopTitle from "Components/TopTitle";
import { useRecoilValue } from "recoil";
import { ClientsState } from "State/atom";
import {
  DataGrid,
  GridColDef,
  GridColumnVisibilityModel,
  GridEventListener,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { useState } from "react";
import { ParamsRequest } from "types/ParamsRequest";
import GetClients from "State/clientServices/GetClients";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FormClient from "./FormClient/Index";
import { IClient } from "types/Client";
import AddIcon from "@mui/icons-material/Add";
import { CreateNewClient } from "Components/Utils/Functions";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDelete from "./ConfirmDelete";

export default function Client() {
  const clients = useRecoilValue(ClientsState);
  const [rows, setRows] = useState<GridRowsProp<IClient>>(clients.data);
  const [info, setInfo] = useState<ParamsRequest>({
    page: 0,
    results: 10,
    total: clients.total,
  });
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [busca, setBusca] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [client, setClient] = useState<IClient | undefined>();

  const [debounceId, setDebounceId] = useState<NodeJS.Timeout>(
    setTimeout(() => {}, 200)
  );
  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>({
      createdAt: false,
      street: false,
      number: false,
      city: false,
      state: false,
      country: false,
    });

  const cols: GridColDef[] = [
    {
      field: "id",
      headerName: "#",
      renderCell: (index) =>
        index.api.getRowIndex(index.row._id) +
        1 +
        Number(info.results) * info.page!,
      hideable: false,
      maxWidth: 50,
    },
    { field: "cpf", headerName: "CPF", flex: 1, minWidth: 120 },
    { field: "name", headerName: "Nome Completo", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 250 },
    { field: "cell", headerName: "Celular", flex: 1, minWidth: 120 },
    { field: "phone", headerName: "Telefone", flex: 1, minWidth: 120 },
    {
      field: "createdAt",
      headerName: "Data de Criação",
      flex: 1,
      type: "dateTime",
      minWidth: 120,
    },
    { field: "street", headerName: "Rua", flex: 1, minWidth: 120 },
    {
      field: "number",
      headerName: "Número do Endereço",
      flex: 1,
      minWidth: 120,
    },
    { field: "city", headerName: "Cidade", flex: 1, minWidth: 120 },
    { field: "state", headerName: "Estado", flex: 1, minWidth: 120 },
    { field: "country", headerName: "País", flex: 1, minWidth: 120 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      hideable: false,
      renderCell: (params) => {
        const onClick = (e: any) => {
          e.stopPropagation();
          setClient(params.row);
          setConfirmDelete(true);
        };

        return (
          <IconButton
            onClick={onClick}
            aria-label="delete"
            color="warning"
            size="large"
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  const handlerClient = (info: ParamsRequest) => {
    setLoading(true);
    GetClients(info)
      .then((newClients) => {
        setInfo({ ...info, total: newClients.total });
        setRows(newClients.data);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setRows([]);
        setLoading(false);
      });
  };

  const triggerSearch = (term: string) => {
    setBusca(term);
    clearTimeout(debounceId);
    setDebounceId(
      setTimeout(() => {
        handlerClient({ ...info, search: term });
      }, 500)
    );
  };
  const newClient = CreateNewClient();

  const handleEvent: GridEventListener<"rowClick"> = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details // GridCallbackDetails
  ) => {
    setClient(params.row);
    setOpenForm(true);
  };

  const refresAfterClose = (change: boolean) => {
    setOpenForm(false);
    setConfirmDelete(false);
    if (change) {
      handlerClient({ ...info, page: 0 });
    }
  };

  return (
    <>
      <Container
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          "& .MuiDataGrid-row": {
            cursor: "pointer",
          },
        }}
      >
        <TopTitle first="CLIENTES" second="SHARE">
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: " space-between",
            }}
          >
            <FormControl sx={{ width: "35ch" }} variant="outlined">
              <InputLabel htmlFor="input-busca">Buscar</InputLabel>
              <OutlinedInput
                value={busca}
                onChange={(e) => triggerSearch(e.target.value)}
                sx={{ borderRadius: "25px" }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="searchIcon"
                      edge="end"
                      type="submit"
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              onClick={() => {
                setOpenForm(true);
                setClient(newClient);
              }}
              color="primary"
              variant="outlined"
              startIcon={<AddIcon />}
            >
              Novo Cliente
            </Button>
          </Box>
        </TopTitle>
        <DataGrid
          onRowClick={handleEvent}
          columns={cols}
          rows={rows}
          rowsPerPageOptions={[5, 10, 25, 50]}
          rowCount={info.total}
          loading={loading}
          keepNonExistentRowsSelected
          getRowId={(row) => row._id}
          paginationMode="server"
          page={info.page}
          pageSize={Number(info.results)}
          onPageChange={(newPage) => handlerClient({ ...info, page: newPage })}
          onPageSizeChange={(newPageSize) =>
            handlerClient({ ...info, results: newPageSize })
          }
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) =>
            setColumnVisibilityModel(newModel)
          }
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Container>
      <FormClient
        open={openForm}
        close={refresAfterClose}
        client={client}
        setClient={setClient}
      />
      <ConfirmDelete
        open={confirmDelete}
        close={refresAfterClose}
        client={client}
      />
    </>
  );
}
