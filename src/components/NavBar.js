import React from 'react';
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

    return (
        <div className="nav-bar">
            <button onClick={() => scrollToSection(profileRef)}>
                <img src={imgProfileIcon.source} alt="Profile Icon" /> Profile
            </button>
            <button onClick={() => scrollToSection(experienceRef)}>
                <img src={imgExperienceIcon.source} alt="Experience Icon" /> Experience
            </button>
            <button onClick={() => scrollToSection(skillsRef)}>
                <img src={imgSkillsIcon.source} alt="Skills Icon" /> Skills
            </button>
        </div>
    );
}
