import { Link } from "react-router-dom";
import styles from "./Logo.module.css";
import logo from "../../assets/images/logo-polis.svg";

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <Link className={styles.logoLink} to="/">
        <img src={logo} alt="polis-logo" />
      </Link>
    </div>
  );
};
