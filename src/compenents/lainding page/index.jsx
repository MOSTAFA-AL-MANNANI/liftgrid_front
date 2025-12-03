import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './navbar';
import { About } from './about';
import { Home } from './home';
import { Services } from './services';
import { Footer } from './footer';


const Index = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{ display: 'flex', flexDirection: 'column' }}
  >
    <Navbar />
    <Home />
    <About />
    <Services />
    <Footer />
  </motion.div>
);

export default Index;
