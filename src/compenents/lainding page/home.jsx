import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Home = () => {
return (
<section
id="home"
className="min-h-screen bg-black flex items-center justify-center text-center px-6"
>
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
className="text-white max-w-2xl"
>
<h1 className="text-4xl md:text-6xl font-bold mb-4">
Welcome to <span className="text-[#ffb000]">Our Website</span>
</h1>
<p className="text-lg md:text-xl opacity-80">
We provide the best services with professional solutions.
</p>
<Link to="/choserole" className="inline-block mt-6 px-6 py-3 bg-[#ffb000] text-black font-semibold rounded-lg hover:bg-[#e6a700] transition-colors duration-300">
  Get Started
</Link>
</motion.div>
</section>
);
};