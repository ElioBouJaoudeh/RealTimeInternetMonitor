import React from 'react';
import { homeObjOne } from './Data';
import { InfoSection, Features } from '../../components';
import HeroSection from './HeroSection';

function Home() {
  return (
    <>
      <HeroSection/>
      <Features />
    </>
  );
}

export default Home;