// Landing Page Components: Navbar, Home, About, Services, Contact, Footer
// React.js + TailwindCSS
// Colors: white (#ffffff) + #ffb000
// Responsive + Hover + Animations


import React from "react";
import { motion } from "framer-motion";


/* ========================= NAVBAR ========================= */
export const Navbar = () => {
return (
<nav className="fixed top-0 w-full bg-black/60 backdrop-blur-md shadow-md z-50">
<div className="container mx-auto flex items-center justify-between py-4 px-6">
{/* Logo */}
<div className="flex items-center gap-2">
<img
src="/logo.png" // change path
alt="Logo"
className="w-10 h-10 object-contain"
/>
<h1 className="text-white font-bold text-xl">MyBrand</h1>
</div>


{/* Links */}
<ul className="hidden md:flex items-center gap-8 text-white font-medium">
{[
{ name: "Home", link: "#home" },
{ name: "About", link: "#about" },
{ name: "Services", link: "#services" },
{ name: "Contact", link: "#contact" }
].map((item, i) => (
<motion.li
key={i}
whileHover={{ scale: 1.1, color: "#ffb000" }}
className="cursor-pointer transition"
>
<a href={item.link}>{item.name}</a>
</motion.li>
))}
</ul>


{/* Mobile Menu Button */}
<div className="md:hidden text-white text-3xl cursor-pointer">≡</div>
</div>
</nav>
);
};