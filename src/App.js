import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Contact from "./pages/Contact";
import Todo from "./pages/Todo";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatBox from "./pages/ChatBox";
import Register from "./pages/Register";
import VerifyRegister from "./pages/VerifyRegister";
import { SocketProvider } from "./context/SocketContext";

function App() {
  return (
    <>
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<ChatBox />} />
              <Route path="contact" element={<Contact />} />
              <Route path="todo" element={<Todo />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="register/confirm" element={<VerifyRegister />} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
