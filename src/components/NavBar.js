import React, { useState } from 'react';
import {dataImgs} from '../data/dataImgs';
import './NavBar.css';

export default function NavBar({ profileRef, skillsRef, experienceRef }) {
    const imgProfileIcon = dataImgs.find(img => img.name === "profileIcon");
    const imgExperienceIcon = dataImgs.find(img => img.name === "experienceIcon");
    const imgSkillsIcon = dataImgs.find(img => img.name === "skillsIcon");

    const scrollToSection = (elementRef) => {
        window.scrollTo({
        top: elementRef.current.offsetTop,
        behavior: 'smooth',
        });
    };

    const [hovered, setHovered] = useState(false);
    const handleMouseOver = (e) => {
        e.target.style.transform = 'scale(1.2)';
        e.target.style.transition = 'transform 0.3s ease';
        e.target.style.color = 'var(--darkFont)';
    }
    const handleMouseOut = (e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.color = '';
    }

    return (
        <div className="nav-bar">
            <button 
                onMouseOver={handleMouseOver} 
                onMouseOut={handleMouseOut} 
                onClick={() => scrollToSection(profileRef)}>
                <img src={imgProfileIcon.source} alt="Profile Icon" /> Profile
            </button>
            <button 
                onMouseOver={handleMouseOver} 
                onMouseOut={handleMouseOut} 
                onClick={() => scrollToSection(experienceRef)}>
                <img src={imgExperienceIcon.source} alt="Experience Icon" /> Experience
            </button>
            <button 
                onMouseOver={handleMouseOver} 
                onMouseOut={handleMouseOut} 
                onClick={() => scrollToSection(skillsRef)}>
                <img src={imgSkillsIcon.source} alt="Skills Icon" /> Skills
            </button>
        </div>
    );
}
