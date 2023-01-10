import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import Copyright from "Components/Copyryght";
import {
  CreateNewAutheticator,
  stringAvatar,
} from "Components/Utils/Functions";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { UserState } from "State/atom";
import { cleanCookie } from "Components/Utils/cookieStorage";
import { cleanSession } from "Components/Utils/sessionStorage";
import Profile from "./Profile";
import Password from "./Password";

const pages = [
  { label: "Home", to: "" },
  { label: "Cat?", to: "cats" },
  { label: "Dog?", to: "dogs" },
  { label: "Clientes", to: "clients" },
];
const settings = ["Profile", "Alterar Senha", "Logout"];

export default function Home() {
  const user = useRecoilValue(UserState);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const [passwordOpen, setPasswordOpen] = useState<boolean>(false);
  const setUser = useSetRecoilState(UserState);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (settings: string) => {
    setAnchorElUser(null);
    if (settings === "Logout") {
      cleanSession();
      cleanCookie();
      setUser(CreateNewAutheticator());
    }
    if (settings === "Profile") {
      setProfileOpen(true);
    }
    if (settings === "Alterar Senha") {
      setPasswordOpen(true);
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar
        position="static"
        style={{ backgroundColor: "#FFF", width: "100%" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              maxWidth="300px"
              sx={{ flexGrow: 2, display: { xs: "none", md: "flex" } }}
            >
              <img
                src="/assets/logo.png"
                alt="SHARENERGY"
                style={{ width: "100%" }}
              />
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="primary"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    component={RouterLink}
                    to={page.to}
                    key={page.to}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography
                      textAlign="center"
                      sx={{
                        textDecoration: "none",
                        color: "black",
                        fontWeight: 900,
                      }}
                    >
                      {page.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "none",
                  md: "flex",
                  justifyContent: "flex-end ",
                },
              }}
            >
              {pages.map((page) => (
                <Button
                  component={RouterLink}
                  to={page.to}
                  key={page.to}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    display: "block",
                  }}
                >
                  <Typography
                    textAlign="center"
                    sx={{
                      textDecoration: "none",
                      color: "black",
                      fontWeight: 900,
                    }}
                  >
                    {page.label}
                  </Typography>
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <img
                src="/assets/logo.png"
                alt="SHARENERGY"
                style={{ width: "50%" }}
              />
            </Box>

            <Box
              sx={{
                flexGrow: 0.1,
                display: { xs: "flex", md: "flex", justifyContent: "center" },
              }}
            >
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {user.user?.picture ? (
                    <Avatar alt={user?.user.name} src={user?.user.picture} />
                  ) : (
                    <Avatar
                      {...stringAvatar(user?.user.name || "S")}
                      sx={{
                        bgcolor: "primary.main",
                      }}
                    />
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="xl" sx={{ width: "100%", flex: "1 0 auto" }}>
        <Outlet />
      </Container>
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: "primary.main",
          display: "flex",
          justifyContent: "center",
          bottom: 0,
          width: "100%",
          alignItems: "center",
          height: "50px",
          flexShrink: 0,
        }}
      >
        <Copyright color="#FFF" />
      </Container>
      <Profile
        open={profileOpen}
        close={(e) => setProfileOpen(false)}
        user={user.user}
      />
      <Password
        open={passwordOpen}
        close={(e) => setPasswordOpen(false)}
        user={user.user}
      />
    </Box>
  );
}
