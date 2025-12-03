import React from "react";
import { motion } from "framer-motion";
export const About = () => {
return (
<section id="about" className="py-20 bg-[#111] text-white px-6">
<div className="container mx-auto max-w-4xl text-center">
<h2 className="text-3xl md:text-4xl font-bold mb-6">About Us</h2>
<motion.p
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
transition={{ duration: 0.8 }}
className="text-lg opacity-80"
>
We are a creative team offering high‑quality solutions for companies
and individuals.
</motion.p>
</div>
</section>
);
};