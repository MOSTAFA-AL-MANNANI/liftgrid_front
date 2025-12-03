import { useState } from "react";
import api from "../../api";
import Forklift from "../../assets/forklift.svg";
import { useNavigate } from "react-router-dom";

export default function LoginCompany() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login-company", { email, password });
      localStorage.setItem("companyToken", res.data.token);
      localStorage.setItem("company", JSON.stringify(res.data.company));
      // SweetAlert2 success popup if available
      if (typeof window !== "undefined" && window.Swal) {
        window.Swal.fire({
          icon: "success",
          title: "Connecté",
          text: "Connexion réussie !",
          timer: 1800,
          showConfirmButton: false,
        });
        navigate("/company/dashboard");
      } else {
        setMsg("Connexion réussie !");
      }
    } catch (err) {
      const errorMsg =
        err && err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message || "Erreur inconnue";
      if (typeof window !== "undefined" && window.Swal) {
        window.Swal.fire({
          icon: "error",
          title: "Erreur",
          text: errorMsg,
        });
      } else {
        setMsg("Erreur : " + errorMsg);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-orange-50 to-white p-8">
          <img src={Forklift} alt="Chariot élévateur" className="w-56 h-56 object-contain animate-bounce" />
        </div>

        <div className="p-8 md:p-12">
          <h2 className="text-2xl font-semibold text-orange-600 mb-6">Connexion Chauffeur</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="sr-only">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-orange-500">
                  <i className="fa-solid fa-envelope" />
                </span>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
                />
              </div>
            </div>

            <div>
              <label className="sr-only">Mot de passe</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-orange-500">
                  <i className="fa-solid fa-lock" />
                </span>
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-400 text-white py-3 rounded-lg font-semibold hover:bg-orange-500 transform hover:-translate-y-0.5 transition shadow hover:shadow-lg"
            >
              <span className="flex items-center justify-center gap-2">
                <i className="fa-solid fa-right-to-bracket" /> Se connecter
              </span>
            </button>
          </form>

          <p className="mt-4 text-sm text-red-500 min-h-[1.2rem]">{msg}</p>

          <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-3 text-sm">
            <a href="/company/forgot-password" className="text-orange-600 hover:underline">Mot de passe oublié ?</a>
            <a href="/company/register" className="text-orange-600 hover:underline">Créer un compte</a>
          </div>
        </div>
      </div>
    </div>
  );
}
