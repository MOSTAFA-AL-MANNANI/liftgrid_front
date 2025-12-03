import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  const fetchJob = async () => {
    try {
      const res = await api.get(`/jobs/${id}`);
      setJob(res.data);
    } catch (err) {
      alert("Erreur: " + err.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  if (!job) return <p className="p-6">Chargement...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-[#FFB000] mb-2">{job.title}</h2>
      <p className="text-gray-600 mb-2">Ville: {job.city}</p>
      <p className="text-gray-600 mb-2">Salaire: {job.salary || "Non précisé"}</p>
      <p className="text-gray-600 mb-2">
        Expérience requise: {job.experienceRequired || 0} ans
      </p>
      <p className="mb-4">{job.description}</p>
      <p className="text-sm text-gray-500">
        Créé le: {new Date(job.createdAt).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-500">
        Entreprise: {job.company.name} ({job.company.email})
      </p>
    </div>
  );
}
