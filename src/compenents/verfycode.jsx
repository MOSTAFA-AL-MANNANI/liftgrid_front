// src/pages/VerifyCode.jsx
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function VerifyCode() {
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const verify = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("resetEmail");

    try {
      const res = await api.post("/verify-reset-code", { email, code });
      localStorage.setItem("resetCode", code);
      setMsg("Code validé !");
        navigate("/driver/reset-password");
    } catch (err) {
      setMsg("Erreur : " + err.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>Vérification du code</h2>
      <form onSubmit={verify}>
        <input
          type="text"
          placeholder="Code reçu"
          onChange={(e) => setCode(e.target.value)}
        />
        <button>Vérifier</button>
      </form>
      <p>{msg}</p>
      <a href="/driver/reset-password">➡ Réinitialiser le mot de passe</a>
    </div>
  );
}
