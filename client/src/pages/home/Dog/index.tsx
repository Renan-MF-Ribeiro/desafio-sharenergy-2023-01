import { Box, Button } from "@mui/material";
import { Container } from "@mui/system";
import ImageBox from "Components/ImageBox";
import TopTitle from "Components/TopTitle";
import { useLayoutEffect, useState } from "react";
import LoopIcon from '@mui/icons-material/Loop';

export default function Dog() {
  const [dog, setDog] = useState("");

  useLayoutEffect(() => {
    newDog();
  }, []);

  const newDog = () => {
    fetch("https://random.dog/woof.json?include=jpg,png")
      .then((resp) => resp.json())
      .then((response) => setDog(response.url));
  };

  return (
    <Container>
      <TopTitle first="RANDOM" second="DOG">
        <Button
        onClick={newDog}
          color="primary"
          sx={{ width: "20vw", fontSize: "1rem" }}
          variant="outlined"
          startIcon={<LoopIcon />}
        >
          Outro dog ?
        </Button>
      </TopTitle>
      <Box>
      </Box>
      <ImageBox src={dog} alt="Dog randomico" />
    </Container>
  );
}
