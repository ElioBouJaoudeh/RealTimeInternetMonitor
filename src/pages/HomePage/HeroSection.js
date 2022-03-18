import React from 'react';
import './HeroSection.css';
import styled from 'styled-components';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video.mp4' autoPlay loop muted />
      <h1>Internet Health Monitor</h1>
      <p>Always at your service.</p>
    </div>
  );
}

export default HeroSection;