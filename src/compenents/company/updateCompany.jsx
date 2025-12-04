// src/pages/UpdateCompany.jsx
import React, { useState, useEffect } from "react";
import api from "../../api";

export default function UpdateCompany() {
  const [company, setCompany] = useState(null);
  const [form, setForm] = useState({});
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [logoChanged, setLogoChanged] = useState(false);

  // Charger company depuis API
  useEffect(() => {
    const stored = localStorage.getItem("company");
    if (!stored) return;

    const comp = JSON.parse(stored);

    api.get(`/companies/${comp._id}`)
      .then((res) => {
        setCompany(res.data);
        setForm(res.data);
        if (res.data.logo) {
          setPreview(`data:${res.data.logo.contentType};base64,${res.data.logo.data}`);
        }
      })
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogo = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLogo(file);
    setLogoChanged(true);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach(key => { if (key !== "logo") data.append(key, form[key]); });
    if (logoChanged && logo) data.append("logo", logo);

    try {
      const res = await api.put(`/companies/${company._id}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setCompany(res.data.company);
      setLogoChanged(false);

      alert("Données mises à jour !");
    } catch (err) {
      alert("Erreur : " + (err.response?.data?.message || err.message));
    }
  };

  if (!company) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="min-h-screen bg-white flex justify-center items-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-xl p-6 rounded-2xl border border-[#FFB000]">
        <h2 className="text-2xl font-bold text-center text-[#FFB000] mb-6">Modifier Company</h2>

        <div className="grid grid-cols-1 gap-4">
          <input name="name" value={form.name || ""} onChange={handleChange} className="p-3 border rounded-md" placeholder="Nom"/>
          <input name="phone" value={form.phone || ""} onChange={handleChange} className="p-3 border rounded-md" placeholder="Téléphone"/>
          <input name="city" value={form.city || ""} onChange={handleChange} className="p-3 border rounded-md" placeholder="Ville"/>
          <textarea name="description" value={form.description || ""} onChange={handleChange} className="p-3 border rounded-md" placeholder="Description"></textarea>

          <label className="text-[#FFB000] font-semibold">Modifier Logo</label>
          <input type="file" accept="image/*" onChange={handleLogo} className="p-2 border rounded-md bg-white"/>

          {preview && (
            <img
              src={preview}
              alt="logo"
              className="w-24 h-24 rounded-full border-2 border-[#FFB000] object-cover"
            />
          )}
        </div>

        <button type="submit" className="w-full mt-6 bg-[#FFB000] text-white p-3 rounded-lg font-bold hover:bg-[#e09a00] transition">
          Sauvegarder
        </button>
      </form>
    </div>
  );
}
