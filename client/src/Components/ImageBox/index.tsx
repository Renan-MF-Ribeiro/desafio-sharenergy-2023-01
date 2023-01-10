import { Box,Tooltip } from "@mui/material";

type props = {
  alt: string;
  src: string;
};

export default function ImageBox({ alt, src }: props) {
  return (
    <Tooltip title={alt} arrow>
      <Box sx={{ textAlign: "center", width: "100%", margin: "2vh" }}>
        <img src={src} alt={alt} width="100%" />
      </Box>
    </Tooltip>
  );
}
