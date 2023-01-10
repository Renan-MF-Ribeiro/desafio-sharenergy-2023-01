import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function Copyright(props: any) {
     return (
      <Typography
        variant="body2"
        color={props.color}
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://renan-ribeiro.web.app/" target="_blank">
          Renan Ribeiro
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }