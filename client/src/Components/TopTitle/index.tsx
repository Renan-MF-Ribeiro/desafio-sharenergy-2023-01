import { Box, Typography } from "@mui/material";

type props = {
  first: string;
  second: string;
  children?: React.PropsWithChildren<JSX.Element>;
};

export default function TopTitle({ first, second, children }: props) {
  return (
    <Box sx={{ textAlign: "center", width: "100%", margin: "2vh" }}>
      <Typography variant="h3" component="span" color="secondary.main">
        {first}{" "}
      </Typography>
      <Typography variant="h3" component="span" color="primary.main">
        {second}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
