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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) data.append(key, formData[key]);

    if (cv) data.append("cv", cv);
    if (certifications) data.append("certifications", certifications);

    try {
      const res = await api.post("/create-driver", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMsg("Compte créé avec succès !");
    } catch (err) {
      setMsg("Erreur : " + err.response?.data?.message);
    }
  };

  return (
    <div className="container">
      <h2>Créer un compte chauffeur</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom complet"
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        />

        <input
          type="text"
          placeholder="Téléphone"
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <input
          type="number"
          placeholder="Années d'expérience"
          onChange={(e) =>
            setFormData({ ...formData, experienceYears: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Ville"
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />

        <label>CV (PDF)</label>
        <input type="file" accept="application/pdf" onChange={(e) => setCv(e.target.files[0])} />

        <label>Certifications (PDF)</label>
        <input type="file" accept="application/pdf" onChange={(e) => setCertifications(e.target.files[0])} />

        <button type="submit">Créer un compte</button>
      </form>

      <p>{msg}</p>
    </div>
  );
}
