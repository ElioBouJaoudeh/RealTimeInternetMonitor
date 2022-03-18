import React from 'react';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video.mp4' autoPlay loop muted />
      <h1>Internet Health Monitor</h1>
      <p>Bring the future close, and your Internet closer.</p>
    </div>
  );
}

export default HeroSection;