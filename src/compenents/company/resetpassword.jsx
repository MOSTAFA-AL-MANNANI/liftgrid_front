// src/compenents/resetpassword.jsx
import { useState } from "react";
import api from "../../api";

export default function ResetPasswordCompany() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");

  const reset = async (e) => {
    e.preventDefault();

    if (!password || password.length < 6) {
      const shortMsg = "Le mot de passe doit contenir au moins 6 caractères.";
      if (typeof window !== "undefined" && window.Swal) {
        window.Swal.fire({ icon: "warning", title: "Invalid", text: shortMsg });
      } else {
        setMsg(shortMsg);
      }
      return;
    }

    const email = localStorage.getItem("resetEmail");
    const code = localStorage.getItem("resetCode");

    try {
      await api.post("/reset-password/company", {
        email,
        code,
        newPassword: password,
      });

      if (typeof window !== "undefined" && window.Swal) {
        window.Swal.fire({
          icon: "success",
          title: "Succès",
          text: "Mot de passe modifié !",
          timer: 1600,
          showConfirmButton: false,
        });
      } else {
        setMsg("Mot de passe modifié !");
      }
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
        <h2 className="text-2xl font-semibold text-orange-600 mb-4">Réinitialiser le mot de passe</h2>

        <form onSubmit={reset} className="space-y-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-orange-500">
              <i className="fa-solid fa-lock" />
            </span>
            <input
              type={show ? "text" : "password"}
              placeholder="Nouveau mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
              aria-label="Nouveau mot de passe"
              required
            />

            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-600 transition"
              aria-label={show ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              <i className={show ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} />
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-400 text-white py-3 rounded-lg font-semibold hover:bg-orange-500 transform hover:-translate-y-0.5 transition shadow hover:shadow-lg"
          >
            <span className="flex items-center justify-center gap-2">
              <i className="fa-solid fa-check" /> Changer le mot de passe
            </span>
          </button>
        </form>

        <p className="mt-4 text-sm text-red-500 min-h-[1.2rem]">{msg}</p>
      </div>
    </div>
  );
}
