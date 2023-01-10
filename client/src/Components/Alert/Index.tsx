import { Box, Button, Dialog, Typography } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { AlertMessage, AlertState } from "State/atom";
import { IAlert } from "types/Alert";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import BlockIcon from "@mui/icons-material/Block";
import { useEffect, useState, useMemo } from "react";

interface Icon extends IAlert {
  color:
    | "primary"
    | "secondary"
    | "warning"
    | "inherit"
    | "success"
    | "error"
    | "info"
    | undefined;
  icon: JSX.Element;
}

export default function AlertComponent() {
  const icons = useMemo<Icon[]>(
    () => [
      {
        type: "sucess",
        icon: (
          <TaskAltIcon sx={{ width: "100%", height: "100%" }} color="primary" />
        ),
        color: "primary",
      },
      {
        type: "alert",
        icon: (
          <ReportProblemIcon
            sx={{ width: "100%", height: "100%" }}
            color="secondary"
          />
        ),
        color: "secondary",
      },
      {
        type: "error",
        icon: (
          <BlockIcon sx={{ width: "100%", height: "100%" }} color="warning" />
        ),
        color: "warning",
      },
    ],
    []
  );
  const [open, close] = useRecoilState(AlertState);
  const message: IAlert = useRecoilValue(AlertMessage);
  const [icon, setIcon] = useState<Icon | undefined>(icons[2]);

  useEffect(() => {
    setIcon(icons.find((icon) => message.type === icon.type));
  }, [message, setIcon, icons]);
  return (
    <Dialog
      onClose={() => close(false)}
      open={open}
      sx={{
        textAlign: "center",
        "& .MuiPaper-root": {
          padding: "2vh",
          borderRadius: "25px",
        },
      }}
    >
      <Box>{icon?.icon}</Box>
      <Typography variant="h4" component="span" color={icon?.color}>
        {message.title}
      </Typography>
      <Typography variant="h6" component="span" color={icon?.color}>
        {message.body}
      </Typography>
      <Button
        onClick={() => close(false)}
        sx={{
          backgroundColor: `${icon?.color}.main`,
          color: "#fff",
          borderRadius: "25px",
          magin: "2vh",
          "&:hover": { color: `${icon?.color}.main` },
        }}
      >
        Okay
      </Button>
    </Dialog>
  );
}
