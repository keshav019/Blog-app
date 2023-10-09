import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import Auth from "./Pages/auth";
import Footer from "./components/footer";
import Home from "./Pages/home";
import ForgotPassword from "./components/forgotPassword";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter style={{minHeight:'100vh'}}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
