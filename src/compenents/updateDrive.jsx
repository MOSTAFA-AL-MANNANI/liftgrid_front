// src/pages/UpdateProfile.jsx
import { useEffect, useState } from "react";
import api from "../api";

export default function UpdateProfile() {
  const driver = JSON.parse(localStorage.getItem("driver"));
  const [formData, setFormData] = useState(driver || {});
  const [msg, setMsg] = useState("");
  const [cv, setCv] = useState(null);
  const [certifications, setCertifications] = useState(null);

  const updateProfile = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) data.append(key, formData[key]);
    if (cv) data.append("cv", cv);
    if (certifications) data.append("certifications", certifications);

    try {
      const res = await api.put(`/update-driver/${driver._id}`, data);
      setMsg("Profil mis à jour !");
      localStorage.setItem("driver", JSON.stringify(res.data.updated));
    } catch (err) {
      setMsg("Erreur : " + err.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>Modifier Profil</h2>

      <form onSubmit={updateProfile}>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        />

        <input
          type="text"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />

        <input
          type="number"
          value={formData.experienceYears}
          onChange={(e) =>
            setFormData({ ...formData, experienceYears: e.target.value })
          }
        />

        <label>CV (PDF)</label>
        <input type="file" accept="application/pdf" onChange={(e) => setCv(e.target.files[0])} />

        <label>Certifications (PDF)</label>
        <input type="file" accept="application/pdf" onChange={(e) => setCertifications(e.target.files[0])} />

        <button>Mettre à jour</button>
      </form>

      <p>{msg}</p>
    </div>
  );
}
