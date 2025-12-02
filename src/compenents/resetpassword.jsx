// src/pages/ResetPassword.jsx
import { useState } from "react";
import api from "../api";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const reset = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("resetEmail");
    const code = localStorage.getItem("resetCode");

    try {
      const res = await api.post("/reset-password", {
        email,
        code,
        newPassword: password,
      });
      setMsg("Mot de passe modifié !");
    } catch (err) {
      setMsg("Erreur : " + err.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>Réinitialiser mot de passe</h2>

      <form onSubmit={reset}>
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Changer</button>
      </form>

      <p>{msg}</p>
    </div>
  );
}
