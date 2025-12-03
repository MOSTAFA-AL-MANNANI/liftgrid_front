// src/compenents/verfycode.jsx
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function VerifyCode() {
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const verify = async (e) => {
    e.preventDefault();

    if (!code || code.trim().length < 3) {
      const text = "Veuillez entrer le code reçu (au moins 3 caractères).";
      if (typeof window !== "undefined" && window.Swal) {
        window.Swal.fire({ icon: "warning", title: "Code invalide", text });
      } else {
        setMsg(text);
      }
      return;
    }

    setLoading(true);
    const email = localStorage.getItem("resetEmail");

    try {
      await api.post("/verify-reset-code", { email, code });
      localStorage.setItem("resetCode", code);
      if (typeof window !== "undefined" && window.Swal) {
        window.Swal.fire({
          icon: "success",
          title: "Code validé",
          text: "Vous pouvez maintenant réinitialiser votre mot de passe.",
          timer: 1400,
          showConfirmButton: false,
        });
      } else {
        setMsg("Code validé !");
      }
      navigate("/driver/reset-password");
    } catch (err) {
      const errorMsg = err?.response?.data?.message || err.message || "Erreur inconnue";
      if (typeof window !== "undefined" && window.Swal) {
        window.Swal.fire({ icon: "error", title: "Erreur", text: errorMsg });
      } else {
        setMsg("Erreur : " + errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-orange-600 mb-4">Vérification du code</h2>

        <form onSubmit={verify} className="space-y-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-orange-500">
              <i className="fa-solid fa-key" />
            </span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Entrez le code reçu"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-400 text-white py-3 rounded-lg font-semibold hover:bg-orange-500 transform hover:-translate-y-0.5 transition shadow hover:shadow-lg disabled:opacity-60"
          >
            <span className="flex items-center justify-center gap-2">
              <i className="fa-solid fa-check" /> {loading ? "Vérification..." : "Vérifier"}
            </span>
          </button>
        </form>

        <p className="mt-4 text-sm text-red-500 min-h-[1.2rem]">{msg}</p>

        <div className="mt-4 text-sm">
          <a href="/driver/reset-password" className="text-orange-600 hover:underline">
            ➡ Réinitialiser le mot de passe
          </a>
        </div>
      </div>
    </div>
  );
}
