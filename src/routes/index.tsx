import { BrowserRouter, Routes, Route } from "react-router-dom";
import paths from "./paths";
import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register"
import Layout from "../components/Layout/Layout";

function Paths() {
  return (
    <BrowserRouter>
      <Routes>
	  	<Route path="/" element={<Layout />}>
        	<Route path={paths.login} element={<LoginPage />} />
        	<Route path={paths.register} element={<RegisterPage />} />
    	</Route>
	  </Routes>
    </BrowserRouter>
  );
}

export default Paths;