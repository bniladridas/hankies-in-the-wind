import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ToolGrid from './components/ToolGrid';
import Footer from './components/Footer';
import ChatBox from './components/ChatBox';
import HankiesInTheWind from './components/HankiesInTheWind';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <HankiesInTheWind />
      <Header />
      <Hero />
      <ToolGrid />
      <Footer />
      <ChatBox />
    </div>
  );
}

export default App;