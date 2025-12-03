import React from "react";
import { motion } from "framer-motion";
export const Services = () => {
const items = [
{ title: "Design", desc: "Modern UI/UX designs" },
{ title: "Development", desc: "High‑quality web apps" },
{ title: "Marketing", desc: "Boost your brand visibility" }
];


return (
<section id="services" className="py-20 bg-black text-white px-6">
<div className="container mx-auto text-center">
<h2 className="text-3xl md:text-4xl font-bold mb-12">Our Services</h2>
<div className="grid md:grid-cols-3 gap-10">
{items.map((s, i) => (
<motion.div
key={i}
whileHover={{ scale: 1.05, backgroundColor: "#ffb000", color: "black" }}
className="p-6 rounded-xl border border-white/20 transition"
>
<h3 className="text-2xl font-bold mb-2">{s.title}</h3>
<p className="opacity-80">{s.desc}</p>
</motion.div>
))}
</div>
</div>
</section>
);
};