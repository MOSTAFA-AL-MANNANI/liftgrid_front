import { useState } from "react";
import api from "../api";

export default function LoginDriver() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // إرسال البيانات
      const res = await api.post("/login-driver", { email, password });

      // حفظ التوكن والمعلومات في localStorage
      localStorage.setItem("driverToken", res.data.token);
      localStorage.setItem("driver", JSON.stringify(res.data.driver));
      setMsg("Connexion réussie !");
    } catch (err) {
      // تصحيح الوصول لرسالة الخطأ
      const errorMsg =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message;
      setMsg("Erreur : " + errorMsg);
    }
  };

  return (
    <div className="container">
      <h2>Connexion Chauffeur</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mot de passe..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Se connecter</button>
      </form>

      <p>{msg}</p>

      <a href="/driver/forgot-password">Mot de passe oublié ?</a>
      <br />
      <a href="/driver/register">Créer un compte</a>
    </div>
  );
}
