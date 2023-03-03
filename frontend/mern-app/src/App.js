import "./App.css";
import CreateContact from "./components/CreateContact";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Contacts from "./components/Contacts";
import { useEffect, useState } from "react";
import Error404 from "./components/404";
import axios from "axios";

function App() {
  const [todos, setTodo] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8080/contacts").then((res) => {
      setTodo((state) => {
        return res.data;
      });
    });
  }, []);

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route
          index
          path="/"
          element={<Contacts todos={todos} setTodo={setTodo} />}
        />
        <Route
          path="/create-contact"
          element={<CreateContact setTodo={setTodo} todos={todos} />}
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
