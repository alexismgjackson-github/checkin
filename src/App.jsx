import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "../components/Layout/Layout.jsx";
import Login from "../pages/Login.jsx";
import CreateAccount from "../pages/CreateAccount.jsx";
import Home from "../pages/Home.jsx";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Login />} />
            <Route path="/account" element={<CreateAccount />} />
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
