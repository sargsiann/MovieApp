import { BrowserRouter, Routes, Route } from "react-router-dom";
import paths from "./paths";
import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register"

function Paths() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.login} element={<LoginPage />} />
        <Route path={paths.register} element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Paths;