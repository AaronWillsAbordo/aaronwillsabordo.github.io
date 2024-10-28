import React from 'react';
import './NavBar.css';

export default function NavBar({ profileRef, skillsRef, experienceRef }) {
  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: 'smooth',
    });
  };

  return (
    <div className="nav-bar">
      <button onClick={() => scrollToSection(profileRef)}>Profile</button>
      <button onClick={() => scrollToSection(experienceRef)}>Experience</button>
      <button onClick={() => scrollToSection(skillsRef)}>Skills</button>
    </div>
  );
}
