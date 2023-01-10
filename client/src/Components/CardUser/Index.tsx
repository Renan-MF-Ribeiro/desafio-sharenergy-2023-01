import {
  Card,
  Box,
  CardContent,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { IUser } from "types/User";
import CakeIcon from "@mui/icons-material/Cake";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PersonIcon from "@mui/icons-material/Person";
import styles from "./CardUser.module.scss";

export default function CardUser(user: IUser) {
  const BirthDateAge = (dateString: string) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return `${birthDate.toLocaleDateString()} - ${age} anos`;
  };

  return (
    <Card
      sx={{ textAlign: "Center", borderRadius: "25px", height: "100%",boxShadow: "0px 0px 10px 0px rgb(0 0 0 / 75%)" }}
      className={styles.cardUser}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          background: `linear-gradient(to bottom, #00a2a2 70%, white 50%)`,
          padding: "2vh",
        }}
      >
        <Avatar
          sx={{ width: "20vh", height: "20vh" }}
          alt="Remy Sharp"
          src={user?.photo!}
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user?.name}
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem sx={{ color: "primary.main" }}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "secondary.main" }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Usuário:" secondary={user?.networkLogin} />
          </ListItem>
          <ListItem sx={{ color: "primary.main" }}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "secondary.main" }}>
                <ContactMailIcon />
              </Avatar>
            </ListItemAvatar>
            <Typography component={"span"} variant={"body2"}>
              <ListItemText primary="Email:" secondary={user?.email} />
            </Typography>
          </ListItem>
          <ListItem sx={{ color: "primary.main" }}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "secondary.main" }}>
                <CakeIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Nascimento - Idade:"
              secondary={BirthDateAge(user?.birthDate)}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
