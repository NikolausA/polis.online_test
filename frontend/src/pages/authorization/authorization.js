import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import UserContext from "../../UseContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { request } from "../../utils/request";
import { authFormSchema } from "../../form-schemas";
import { API_URL } from "../../constants";
import styles from "./Athorization.module.css";

export const Authorization = () => {
  const [serverErrorMessage, setServerErrorMessage] = useState(null);
  const { dispatch } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmation: "",
    },
    resolver: yupResolver(authFormSchema),
    mode: "onTouched",
  });

  const navigate = useNavigate();

  const onSubmit = ({ name, email, password }) => {
    request(`${API_URL}/login`, "POST", { email, password })
      .then((response) => {
        const { name, token, redirect, url } = response;
        if (token) {
          localStorage.setItem("token", token);
        }
        if (name) {
          dispatch({
            type: "LOGIN",
            payload: { name },
          });
        }

        if (redirect) {
          navigate(url);
        }
        if (response.errors) {
          response.errors.email[0] = "The email has already been taken."
            ? setServerErrorMessage(
                "Пользователь с указанной эл.почтой уже зарегистрировался нас сайте"
              )
            : setServerErrorMessage(response.errors.email[0]);
        }

        if (response.redirect) {
          navigate(response.url);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          console.error("Validation errors:", error.response.data.errors);
        } else {
          console.error("Unexpected error:", error);
        }
      });
    reset();
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Авторизация пользователя</h1>

        <input
          className={styles.input}
          type="email"
          placeholder="Ваша эл.почта"
          {...register("email")}
          required
        />
        <p className={styles.errorMessage}>{errors.email?.message}</p>
        <input
          className={styles.input}
          type="password"
          placeholder="Пароль"
          {...register("password")}
          required
        />
        <p className={styles.errorMessage}>{errors.password?.message}</p>
        {serverErrorMessage && (
          <p className={styles.errorMessage}>{serverErrorMessage}</p>
        )}
        <Link className={styles.link} to="/register">
          Зарегистрироваться
        </Link>
        <button className={styles.button} type="submit" disabled={!isValid}>
          Отправить
        </button>
      </form>
    </div>
  );
};
