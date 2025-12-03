
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavbarDriver() {
	const [open, setOpen] = useState(false);
	const [fullName, setFullName] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		try {
			const d = JSON.parse(localStorage.getItem("driver") || "null");
			setFullName(d?.fullName || "Chauffeur");
		} catch (e) {
			setFullName("Chauffeur");
		}
	}, []);

	const handleLogout = async () => {
		if (typeof window !== "undefined" && window.Swal) {
			const result = await window.Swal.fire({
				title: "Déconnexion",
				text: "Voulez-vous vous déconnecter ?",
				icon: "question",
				showCancelButton: true,
				confirmButtonColor: "#fb923c",
				cancelButtonColor: "#6b7280",
				confirmButtonText: "Oui, déconnecter",
			});

			if (!result.isConfirmed) return;
		}

		// Clear driver session data
		localStorage.removeItem("driverToken");
		localStorage.removeItem("driver");
		// optionally clear other keys
		try {
			localStorage.removeItem("resetEmail");
			localStorage.removeItem("resetCode");
		} catch (e) {}

		navigate("/driver/login");
	};

	return (
		<header className="bg-white shadow-sm">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16 items-center">
					<div className="flex items-center gap-4">
						<Link to="/" className="flex items-center gap-3">
							<img className="h-16" src="/lift.png" alt="LiftGrid Logo" />
							<div className="hidden sm:block">
								<div className="text-lg font-semibold text-orange-600">LiftGrid</div>
								<div className="text-xs text-gray-500">Chauffeurs</div>
							</div>
						</Link>
					</div>

					<nav className="hidden md:flex items-center gap-4">

						<Link to="/driver/profile" className="text-gray-700 hover:text-orange-500 transition flex items-center gap-2">
							<i className="fa-solid fa-user" />
							<span>Voir profil</span>
						</Link>

						<Link to="/driver/profile" className="text-gray-700 hover:text-orange-500 transition flex items-center gap-2">
							<i className="fa-solid fa-pen-to-square" />
							<span>Mettre à jour</span>
						</Link>

						<Link to="/driver/jobs" className="text-gray-700 hover:text-orange-500 transition flex items-center gap-2">
							<i className="fa-solid fa-pen-to-square" />
							<span>Voir Les Offres</span>
						</Link>

						<Link to="/driver/applications-status" className="text-gray-700 hover:text-orange-500 transition flex items-center gap-2">
							<i className="fa-solid fa-pen-to-square" />
							<span>Application status</span>
						</Link>
						<button onClick={handleLogout} className="ml-2 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-orange-400 text-white hover:bg-orange-500 transition">
							<i className="fa-solid fa-right-from-bracket" /> Déconnexion
						</button>
					</nav>

					<div className="flex items-center md:hidden">
						<button onClick={() => setOpen((v) => !v)} className="p-2 rounded-md text-gray-700 hover:bg-gray-100">
							<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
							</svg>
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			{open && (
				<div className="md:hidden bg-white border-t">
					<div className="px-4 pt-4 pb-4 space-y-2">
						<div className="flex items-center justify-between">
							<div className="text-sm font-medium text-gray-700">{fullName}</div>
							<button onClick={handleLogout} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-orange-400 text-white hover:bg-orange-500 transition">
								<i className="fa-solid fa-right-from-bracket" />
							</button>
						</div>

						<Link to="/driver/offers" className="block text-gray-700 hover:text-orange-500 transition flex items-center gap-2">
							<i className="fa-solid fa-briefcase" /> Voir les offres
						</Link>

						<Link to="/driver/profile" className="block text-gray-700 hover:text-orange-500 transition flex items-center gap-2">
							<i className="fa-solid fa-user" /> Voir profil
						</Link>

						<Link to="/driver/update-profile" className="block text-gray-700 hover:text-orange-500 transition flex items-center gap-2">
							<i className="fa-solid fa-pen-to-square" /> Mettre à jour
						</Link>
					</div>
				</div>
			)}
		</header>
	);
}

