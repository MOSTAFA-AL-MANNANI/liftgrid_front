// src/pages/ForgotPassword.jsx
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const sendCode = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/send-reset-code", { email });
      localStorage.setItem("resetEmail", email);
      setMsg("Code envoyé !");
      navigate("/driver/verify-reset");
    } catch (err) {
      setMsg("Erreur : " + err.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>Mot de passe oublié</h2>
      <form onSubmit={sendCode}>
        <input
          type="email"
          placeholder="Votre email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <button>Envoyer le code</button>
      </form>
      <p>{msg}</p>
      <a href="/driver/verify-reset">➡ Aller à vérifier le code</a>
    </div>
  );
}
