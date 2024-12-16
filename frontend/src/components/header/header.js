import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../UseContext";
import { request } from "../../utils/request";
import { API_URL } from "../../constants";
import { Logo } from "../logo/logo";
import styles from "./Header.module.css";

export const Header = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    request(`${API_URL}/logout`, "POST").then((response) => {
      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT" });
      navigate("/");
    });
  };

  return (
    <div className={styles.header}>
      <Logo />
      {state.isAuthenticated ? (
        <div className={styles.userInfo}>
          <div>{state.name}</div>
          <div className={styles.menuItem} onClick={handleLogout}>
            Выйти
          </div>
        </div>
      ) : (
        <NavLink className={styles.menuItem} to="/login">
          Войти
        </NavLink>
      )}
    </div>
  );
};
