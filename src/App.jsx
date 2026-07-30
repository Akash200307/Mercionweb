import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import ProductHighlight from './components/ProductHighlight';
import About from './components/About';
import Process from './components/Process';
import ServerDiagram from './components/ServerDiagram';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Comparison from './components/Comparison';
import WhyMercion from './components/WhyMercion';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import CustomCursor from './components/CustomCursor';

function Home() {
  return (
    <>
      <Hero />
      <ProductHighlight />
      <Ticker />
      <About />
      <Process />
      <ServerDiagram />
      <Features />
      <Pricing />
      <Comparison />
      <WhyMercion />
      <Testimonials />
      <CTA />
      <Contact />
    </>
  );
}

function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
