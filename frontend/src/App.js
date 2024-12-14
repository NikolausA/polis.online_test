import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:/api/test")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => {
        console.error("Error connecting to the backend:", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>React frontend</h1>
      <div>Message from backend: {message}</div>
    </div>
  );
}

export default App;
