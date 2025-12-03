import React, { useState } from "react";
import api from "../../api"; // ← استعمال API المخصص

export default function CompanyForm() {
  const [form, setForm] = useState({
    name: "",
    rcNumber: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    description: "",
  });

  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);

  // handle inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // handle logo upload + preview
  const handleLogo = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    setPreview(URL.createObjectURL(file));
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (logo) data.append("logo", logo);

    try {
      const res = await api.post("/companies", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Company créée !");
      console.log(res.data);

    } catch (err) {
      alert("Erreur : " + (err.response?.data?.message || "Erreur serveur"));
    }
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-xl p-6 rounded-2xl border border-[#FFB000]"
      >
        <h2 className="text-2xl font-bold text-center text-[#FFB000] mb-6">
          Ajouter une Company
        </h2>

        <div className="grid grid-cols-1 gap-4">

          <input
            name="name"
            placeholder="Nom de la société"
            className="p-3 border rounded-md"
            onChange={handleChange}
            required
          />

          <input
            name="rcNumber"
            placeholder="RC Number"
            className="p-3 border rounded-md"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="p-3 border rounded-md"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Mot de passe"
            className="p-3 border rounded-md"
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Téléphone"
            className="p-3 border rounded-md"
            onChange={handleChange}
            required
          />

          <input
            name="city"
            placeholder="Ville"
            className="p-3 border rounded-md"
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            className="p-3 border rounded-md"
            rows="3"
            onChange={handleChange}
          ></textarea>

          <label className="text-[#FFB000] font-semibold">
            Logo (image)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogo}
            className="p-2 border rounded-md bg-white"
          />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-24 h-24 mt-2 rounded-full border-2 border-[#FFB000] object-cover"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-[#FFB000] text-white p-3 rounded-lg font-bold hover:bg-[#e09a00] transition"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
