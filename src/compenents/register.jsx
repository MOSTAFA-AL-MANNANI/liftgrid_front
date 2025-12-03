// src/pages/RegisterDriver.jsx
import { useState } from "react";
import api from "../api";

export default function RegisterDriver() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    city: "",
    experienceYears: "",
  });

  const [cv, setCv] = useState(null);
  const [certifications, setCertifications] = useState(null);
  const [msg, setMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleFile = (setter) => (e) => {
    const f = e.target.files && e.target.files[0];
    setter(f || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic client-side validation
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      const text = "Veuillez remplir les champs obligatoires.";
      if (typeof window !== "undefined" && window.Swal) {
        window.Swal.fire({ icon: "warning", title: "Champs manquants", text });
      } else {
        setMsg(text);
      }
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      const text = "Veuillez entrer une adresse e-mail valide.";
      if (typeof window !== "undefined" && window.Swal) {
        window.Swal.fire({ icon: "warning", title: "Email invalide", text });
      } else {
        setMsg(text);
      }
      return;
    }

    if (formData.password.length < 6) {
      const text = "Le mot de passe doit contenir au moins 6 caractères.";
      if (typeof window !== "undefined" && window.Swal) {
        window.Swal.fire({ icon: "warning", title: "Mot de passe court", text });
      } else {
        setMsg(text);
      }
      return;
    }

    const data = new FormData();
    for (let key in formData) data.append(key, formData[key]);
    if (cv) data.append("cv", cv);
    if (certifications) data.append("certifications", certifications);

    setSubmitting(true);
    try {
      await api.post("/create-driver", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (typeof window !== "undefined" && window.Swal) {
        window.Swal.fire({ icon: "success", title: "Succès", text: "Compte créé avec succès !" });
      } else {
        setMsg("Compte créé avec succès !");
      }

      // optionally reset form
      setFormData({ fullName: "", phone: "", email: "", password: "", city: "", experienceYears: "" });
      setCv(null);
      setCertifications(null);
    } catch (err) {
      const errorMsg = err?.response?.data?.message || err.message || "Erreur inconnue";
      if (typeof window !== "undefined" && window.Swal) {
        window.Swal.fire({ icon: "error", title: "Erreur", text: errorMsg });
      } else {
        setMsg("Erreur : " + errorMsg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-orange-600 mb-6">Créer un compte chauffeur</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-orange-500">
              <i className="fa-solid fa-user" />
            </span>
            <input
              type="text"
              placeholder="Nom complet"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
              required
            />
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-orange-500">
              <i className="fa-solid fa-phone" />
            </span>
            <input
              type="text"
              placeholder="Téléphone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
              required
            />
          </div>

          <div className="relative md:col-span-1">
            <span className="absolute inset-y-0 left-3 flex items-center text-orange-500">
              <i className="fa-solid fa-envelope" />
            </span>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
              required
            />
          </div>

          <div className="relative md:col-span-1">
            <span className="absolute inset-y-0 left-3 flex items-center text-orange-500">
              <i className="fa-solid fa-lock" />
            </span>
            <input
              type="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
              required
            />
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-orange-500">
              <i className="fa-solid fa-briefcase" />
            </span>
            <input
              type="number"
              placeholder="Années d'expérience"
              value={formData.experienceYears}
              onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
            />
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-orange-500">
              <i className="fa-solid fa-city" />
            </span>
            <input
              type="text"
              placeholder="Ville"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input id="cvInput" type="file" accept="application/pdf" className="hidden" onChange={handleFile(setCv)} />
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-lg text-orange-600 hover:bg-orange-100 transition">
                <i className="fa-solid fa-file-pdf" />
                {cv ? cv.name : "Télécharger CV (PDF)"}
              </span>
            </label>
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input id="certInput" type="file" accept="application/pdf" className="hidden" onChange={handleFile(setCertifications)} />
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-lg text-orange-600 hover:bg-orange-100 transition">
                <i className="fa-solid fa-award" />
                {certifications ? certifications.name : "Télécharger certifications (PDF)"}
              </span>
            </label>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-orange-400 text-white py-3 rounded-lg font-semibold hover:bg-orange-500 transform hover:-translate-y-0.5 transition shadow hover:shadow-lg disabled:opacity-60"
            >
              <span className="flex items-center justify-center gap-2">
                <i className="fa-solid fa-user-plus" /> {submitting ? "Création..." : "Créer un compte"}
              </span>
            </button>
          </div>

          <p className="mt-2 text-sm text-red-500 md:col-span-2 min-h-[1.2rem]">{msg}</p>
        </form>
      </div>
    </div>
  );
}
