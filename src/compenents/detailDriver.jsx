import { useEffect, useState } from "react";
import api from "../api"; // Axios instance

export default function DriverDetail() {
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("driver");
    if (!stored) {
      setError("Driver ID non trouvé dans localStorage");
      setLoading(false);
      return;
    }

    let driverId = null;
    try {
      driverId = JSON.parse(stored)?._id;
    } catch (e) {
      setError("Impossible de parser driver ID");
      setLoading(false);
      return;
    }

    if (!driverId) {
      setError("Driver ID invalide");
      setLoading(false);
      return;
    }

    // API pour récupérer les infos du driver
    api.get(`/drivers/${driverId}`)
      .then(res => {
        setDriver(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  const driverId = driver._id;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold text-orange-600 mb-6">Détails du Driver</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="font-semibold text-gray-700">Nom complet:</p>
          <p className="text-gray-900">{driver.fullName}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-700">Téléphone:</p>
          <p className="text-gray-900">{driver.phone}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-700">Email:</p>
          <p className="text-gray-900">{driver.email}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-700">Ville:</p>
          <p className="text-gray-900">{driver.city}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-700">Expérience (années):</p>
          <p className="text-gray-900">{driver.experienceYears}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-700">Date de création:</p>
          <p className="text-gray-900">{new Date(driver.createdAt).toLocaleDateString()}</p>
        </div>

        {/* CV */}
        <div className="md:col-span-2">
          <p className="font-semibold text-gray-700">CV:</p>
<a
  href={`http://localhost:3000/drivers/${driverId}/cv`}
  target="_blank"
  rel="noreferrer"
  className="text-blue-500 underline"
>
  Voir / Télécharger CV
</a>
        </div>

        {/* Certifications */}
        <div className="md:col-span-2">
          <p className="font-semibold text-gray-700">Certifications:</p>


<a
  href={`http://localhost:3000/drivers/${driverId}/certifications`}
  target="_blank"
  rel="noreferrer"
  className="text-blue-500 underline"
>
  Voir / Télécharger Certifications
</a>
        </div>
      </div>
    </div>
  );
}
