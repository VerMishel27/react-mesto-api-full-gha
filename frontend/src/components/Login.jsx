import Form from "./Form";
import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  function handleSubmit(e) {
    e.preventDefault();

    onLogin({ email, password }, resetForm);
  }

  return (
    <Form onSubmit={handleSubmit} title="Вход" buttonSubmitTitle="Войти">
      <label className="form__label">
        <input
          className="form__input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="form__label">
        <input
          className="form__input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="2"
          maxLength="40"
        />
      </label>
    </Form>
  );
}
