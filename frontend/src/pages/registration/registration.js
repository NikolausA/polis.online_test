import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import UserContext from "../../UseContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { request } from "../../utils/request";
import { registrationFormSchema } from "../../form-schemas";
import { API_URL } from "../../constants";
import styles from "./Registration.module.css";

export const Registration = () => {
  const [serverErrorMessage, setServerErrorMessage] = useState(null);
  const { dispatch } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { touchedFields, isValid, errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmation: "",
    },
    resolver: yupResolver(registrationFormSchema),
    mode: "onTouched",
  });

  const navigate = useNavigate();

  const onSubmit = ({ name, email, password }) => {
    request(`${API_URL}/register`, "POST", { name, email, password })
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
        <h1 className={styles.title}>Регистрация пользователя</h1>
        <input
          className={styles.input}
          type="text"
          placeholder="Ваше имя"
          {...register("name")}
          required
        />
        <p className={styles.errorMessage}>{errors.name?.message}</p>
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
          {...register("password", {
            onChange: () =>
              touchedFields.confirmation && trigger("confirmation"),
          })}
          required
        />
        <p className={styles.errorMessage}>{errors.password?.message}</p>
        <input
          className={styles.input}
          type="password"
          placeholder="Подтверждение пароля"
          {...register("confirmation")}
          required
        />
        <p className={styles.errorMessage}>{errors.confirmation?.message}</p>
        {serverErrorMessage && (
          <p className={styles.errorMessage}>{serverErrorMessage}</p>
        )}
        <button className={styles.button} type="submit" disabled={!isValid}>
          Отправить
        </button>
      </form>
    </div>
  );
};
