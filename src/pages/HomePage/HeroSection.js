import React,{useState,useEffect} from "react";
import './HeroSection.css';
import { Button } from "../../globalStyles";
import Modal from "./Modal";

function HeroSection() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <div className='hero-container'>
      <video src='/videos/video.mp4' autoPlay loop muted />
      <h1>Internet Health Monitor</h1>
      <p>Bring the future close, and your Internet closer.</p>
      <br/>
      <div className='hero-btns'>
      <Button primary onClick={openModal}>WHAT'S NEW</Button>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}

export default HeroSection;