import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./Pages/home";
import ForgotPassword from "./components/forgotPassword";
import Login from "./components/login";
import Register from "./components/register";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter style={{minHeight:'100vh'}}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
