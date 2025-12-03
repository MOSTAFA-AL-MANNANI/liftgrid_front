import React, { useState } from "react";
import api from "../../api";

export default function AddJob() {
  const company = JSON.parse(localStorage.getItem("company"));
  const [form, setForm] = useState({
    title: "",
    description: "",
    city: "",
    salary: "",
    experienceRequired: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/jobs", {
        companyId: company._id,
        title: form.title,
        description: form.description,
        city: form.city,
        salary: form.salary,
        experienceRequired: form.experienceRequired,
      });
      alert("Job créé !");
      setForm({ title: "", description: "", city: "", salary: "", experienceRequired: "" });
    } catch (err) {
      alert("Erreur: " + err.response?.data?.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-[#FFB000] mb-4">Ajouter un Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Titre"
          className="w-full p-2 border rounded"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          name="city"
          placeholder="Ville"
          className="w-full p-2 border rounded"
          value={form.city}
          onChange={handleChange}
          required
        />
        <input
          name="salary"
          type="number"
          placeholder="Salaire"
          className="w-full p-2 border rounded"
          value={form.salary}
          onChange={handleChange}
        />
        <input
          name="experienceRequired"
          type="number"
          placeholder="Années d'expérience"
          className="w-full p-2 border rounded"
          value={form.experienceRequired}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-[#FFB000] text-white p-2 rounded hover:bg-[#e09a00]"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}
