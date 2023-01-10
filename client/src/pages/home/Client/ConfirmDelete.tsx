import { Box, Button, Dialog, Typography } from "@mui/material";
import { IClient } from "types/Client";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import DeleteClient from "State/clientServices/DeleteClient";

type props = {
  close: (value: boolean) => void;
  open: boolean;
  client?: IClient;
};
export default function ConfirmDelete({ client, open, close }: props) {
  const handleDelete = (target: boolean) => {
    if (target) {
      DeleteClient(client?._id!).then((response) => close(true));
    }
    close(false);
  };

  return (
    <Dialog
      onClose={(e) => handleDelete(false)}
      open={open}
      sx={{
        textAlign: "center",
        "& .MuiPaper-root": {
          padding: "2vh",
          borderRadius: "25px",
          maxWidth: "500px",
        },
      }}
    >
      <Box sx={{ padding: "0 100px" }}>
        <ReportProblemIcon
          sx={{ width: "100%", height: "100%" }}
          color="warning"
        />
      </Box>
      <Box sx={{ justifyContent: "center" }}>
        <Typography variant="h6" component="span" color="warning">
          {`Tem certeza que deseja remover ${client?.name}?`} <br />
          Está ação não poderá ser revertida.
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Button
          onClick={() => handleDelete(true)}
          sx={{
            backgroundColor: "warning.main",
            color: "#FFF",
            borderRadius: "25px",
            margin: "2vh",
            width: "100%",
            "&:hover": {
              backgroundColor: "#e0dcdc",
              color: "warning.main",
            },
          }}
        >
          Confirmar
        </Button>
        <Button
          onClick={() => handleDelete(false)}
          sx={{
            background: "#FFF",
            borderRadius: "25px",
            margin: "2vh",
            color: "warning.main",
            width: "100%",
            border: "0.5px solid #e0dcdc",
            "&:hover": {
              backgroundColor: "#ff6464",
              color: "#FFF",
            },
          }}
        >
          Cancelar
        </Button>
      </Box>
    </Dialog>
  );
}
