import {
  Container,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import ImageBox from "Components/ImageBox";
import TopTitle from "Components/TopTitle";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { CatsStatus } from "State/atom";
import { ICats } from "types/Cats";

export default function Cat() {
  const catsStatus = useRecoilValue(CatsStatus);

  const [cat, setCat] = useState<string>("");
  const [catImg, setCatImg] = useState<string>("https://http.cat/100");

  const handleChange = (event: SelectChangeEvent) => {
    setCatImg(`https://http.cat/${event.target.value}`);
    setCat(event.target.value);
  };

  const groups = (array: Array<any>, Cats: ICats) => {
    const status = Cats.status.map((cat) => (
      <MenuItem value={cat.status}>{`${cat.name} (${cat.status})`}</MenuItem>
    ));
    const element = [<ListSubheader>{Cats.label}</ListSubheader>, ...status];
    return [...array, element];
  };

  return (
    <Container>
      <TopTitle first="CAT" second="STATUS">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel htmlFor="grouped-select">Cat Status</InputLabel>

          <Select
            defaultValue=""
            id="grouped-select"
            label="Grouping"
            value={cat}
            onChange={handleChange}
            sx={{ borderRadius: "25px", width: "20vw", minWidth: "200px" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {catsStatus.reduce(groups, new Array<any>())}
          </Select>
        </FormControl>
      </TopTitle>
      <ImageBox src={catImg} alt={cat} />
    </Container>
  );
}
