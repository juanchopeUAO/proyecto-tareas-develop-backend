import { Loading, ProtectedRouter } from "./components";
import { Login, Home, ResetPassword, Register } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const { isLoading } = useSelector((state) => state.loading);

  return (
    <BrowserRouter>
      {isLoading && <Loading />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<ProtectedRouter />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
