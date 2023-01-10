import { ThemeProvider } from "@mui/material";
import Home from "pages/home";
import Cat from "pages/home/Cat";
import Dog from "pages/home/Dog";
import Client from "pages/home/Client";
import Dashboard from "pages/home/Dashboard/Index";
import Login from "pages/login";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Theme } from "types/Theme";
import AlertComponent from "Components/Alert/Index";
import Alert from "State/hooks/Alert";
import { ProtectedRoute } from "Components/ProtectedRouter/ProtectedRouter";
import LoginForm from "pages/login/LoginForm";
import ResgisterForm from "pages/login/RegisterForm";

export default function AppRouter() {
  Alert();
  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}>
            <Route index element={<LoginForm />} />
            <Route path="/register" element={<ResgisterForm />} />
          </Route>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="cats" element={<Cat />} />
            <Route path="dogs" element={<Dog />} />
            <Route path="clients" element={<Client />} />
          </Route>
        </Routes>
      </Router>
      <AlertComponent />
    </ThemeProvider>
  );
}
