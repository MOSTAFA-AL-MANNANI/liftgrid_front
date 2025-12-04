// src/pages/UpdateDriver.jsx
import { useEffect, useState } from "react";
import api from "../api"; // axios instance configuré

export default function UpdateDriver() {
  const [driver, setDriver] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    experienceYears: "",
    city: ""
  });
  const [cv, setCv] = useState(null);
  const [certifications, setCertifications] = useState(null);
  const [msg, setMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // récupérer driver ID depuis localStorage
  const driverId = JSON.parse(localStorage.getItem("driver") || "{}")?._id;

  useEffect(() => {
    if (!driverId) return;

    api.get(`/drivers/${driverId}`)
      .then(res => {
        setDriver(res.data);
        setForm({
          fullName: res.data.fullName || "",
          phone: res.data.phone || "",
          experienceYears: res.data.experienceYears || "",
          city: res.data.city || ""
        });
      })
      .catch(err => console.error("Erreur API:", err));
  }, [driverId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (setter) => (e) => {
    const file = e.target.files[0];
    setter(file || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!driverId) return setMsg("Driver ID introuvable");

    const data = new FormData();
    data.append("fullName", form.fullName);
    data.append("phone", form.phone);
    data.append("experienceYears", form.experienceYears);
    data.append("city", form.city);

    if (cv) data.append("cv", cv);
    if (certifications) data.append("certifications", certifications);

    setSubmitting(true);
    try {
      const res = await api.put(`/drivers/${driverId}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      console.log("Files reçus:", res.data); // ✅ Vérification côté backend

      setMsg("Profil mis à jour avec succès !");
      if (res.data.updated) setDriver(res.data.updated);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMsg("Erreur lors de la mise à jour");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-orange-600 mb-6">Modifier Profil</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4" encType="multipart/form-data">
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Nom complet"
            className="col-span-2 p-3 border rounded-md"
            required
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Téléphone"
            className="col-span-2 p-3 border rounded-md"
            required
          />
          <input
            name="experienceYears"
            value={form.experienceYears}
            onChange={handleChange}
            type="number"
            placeholder="Années d'expérience"
            className="p-3 border rounded-md"
          />
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Ville"
            className="p-3 border rounded-md"
          />

          {/* Upload CV */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-semibold">CV (PDF)</label>
            <input type="file" accept="application/pdf" onChange={handleFile(setCv)} className="w-full" />
          </div>

          {/* Upload Certifications */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-semibold">Certifications (PDF)</label>
            <input type="file" accept="application/pdf" onChange={handleFile(setCertifications)} className="w-full" />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="md:col-span-2 bg-orange-400 text-white py-3 rounded-lg font-semibold hover:bg-orange-500 transition"
          >
            {submitting ? "Mise à jour..." : "Mettre à jour"}
          </button>
        </form>

        {msg && <p className="mt-4 text-center text-red-500">{msg}</p>}
      </div>
    </div>
  );
}
