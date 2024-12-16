import { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import { request } from "../../utils/request";
import styles from "./Main.module.css";

export const Main = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    request(`${API_URL}/test`)
      .then((data) => setMessage(data.message))
      .catch((error) => {
        console.error("Error connecting to the backend:", error);
      });
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Главная страница приложения</h1>
      <div>Message from backend: {message}</div>
    </div>
  );
};
