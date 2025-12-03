// src/compenents/forgetPassword.jsx
import { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordCompany() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const sendCode = async (e) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const text = "Veuillez entrer une adresse e-mail valide.";
      if (typeof window !== "undefined" && window.Swal) {
        window.Swal.fire({ icon: "warning", title: "Email invalide", text });
      } else {
        setMsg(text);
      }
      return;
    }

    try {
      await api.post("/send-reset-code/company", { email });
      localStorage.setItem("resetEmail", email);
      if (typeof window !== "undefined" && window.Swal) {
        window.Swal.fire({
          icon: "success",
          title: "Code envoyé",
          text: "Vérifiez votre boîte mail.",
          timer: 1600,
          showConfirmButton: false,
        });
      } else {
        setMsg("Code envoyé ! Vérifiez votre boîte mail.");
      }
      navigate("/company/verify-reset");
    } catch (err) {
      const errorMsg = err?.response?.data?.message || err.message || "Erreur inconnue";
      if (typeof window !== "undefined" && window.Swal) {
        window.Swal.fire({ icon: "error", title: "Erreur", text: errorMsg });
      } else {
        setMsg("Erreur : " + errorMsg);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-orange-600 mb-4">Mot de passe oublié</h2>

        <form onSubmit={sendCode} className="space-y-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-orange-500">
              <i className="fa-solid fa-envelope" />
            </span>
            <input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-400 text-white py-3 rounded-lg font-semibold hover:bg-orange-500 transform hover:-translate-y-0.5 transition shadow hover:shadow-lg"
          >
            <span className="flex items-center justify-center gap-2">
              <i className="fa-solid fa-paper-plane" /> Envoyer le code
            </span>
          </button>
        </form>

        <p className="mt-4 text-sm text-red-500 min-h-[1.2rem]">{msg}</p>

        <div className="mt-4 text-sm">
          <a href="/company/verify-reset" className="text-orange-600 hover:underline">
            ➡ Aller vérifier le code
          </a>
        </div>
      </div>
    </div>
  );
}
