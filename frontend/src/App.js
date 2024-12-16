import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./UseContext";
import { Header } from "./components/header/header";
import { Authorization, Registration, Main } from "./pages";
import "./App.css";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Authorization />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
