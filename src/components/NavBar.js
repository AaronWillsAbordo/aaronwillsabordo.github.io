import React, { useState, useEffect } from 'react';
import { dataImgs } from '../data/dataImgs';
import './NavBar.css';

export default function NavBar({ profileRef, skillsRef, experienceRef }) {
    const imgProfileIcon = dataImgs.find(img => img.name === "profileIcon");
    const imgExperienceIcon = dataImgs.find(img => img.name === "experienceIcon");
    const imgSkillsIcon = dataImgs.find(img => img.name === "skillsIcon");

    const scrollToSection = (elementRef) => {
        window.scrollTo({
            top: elementRef.current.offsetTop - 50, // Adjust to make sure the section is correctly in view
            behavior: 'smooth',
        });
    };

    const [activeSection, setActiveSection] = useState('profile'); // Default to 'profile' on first load
    const [hoveredButton, setHoveredButton] = useState(null); // Track the hovered button

    // Function to handle scroll events and determine the active section
    const handleScroll = () => {
        const profileTop = profileRef.current.offsetTop;
        const experienceTop = experienceRef.current.offsetTop;
        const skillsTop = skillsRef.current.offsetTop;
        const scrollPosition = window.scrollY + window.innerHeight / 2; // Adjust the scroll detection to be more forgiving

        if (scrollPosition >= skillsTop) {
            setActiveSection('skills');
        } else if (scrollPosition >= experienceTop) {
            setActiveSection('experience');
        } else if (scrollPosition >= profileTop) {
            setActiveSection('profile');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // Trigger the scroll detection logic when the component mounts to highlight the default section
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleMouseOver = (buttonName) => {
        setHoveredButton(buttonName);
    };

    const handleMouseOut = () => {
        setHoveredButton(null);
    };

    const buttonStyle = (buttonName) => {
        const isHovered = hoveredButton === buttonName;
        const isActive = activeSection === buttonName;
        const scale = isHovered || isActive ? 'scale(1.2)' : 'scale(1)';
        const color = isActive ? 'var(--darkFont)' : '';
        const fontWeight = isHovered || isActive ? 'bold' : 'normal';

        return {
            transform: scale,
            transition: 'transform 0.3s ease',
            color: color,
            fontWeight: fontWeight,
        };
    };

    return (
        <div className="nav-bar">
            <button 
                onMouseOver={() => handleMouseOver('profile')}
                onMouseOut={handleMouseOut}
                onClick={() => scrollToSection(profileRef)}
                style={buttonStyle('profile')}
            >
                <img src={imgProfileIcon.source} alt="Profile Icon" /> Profile
            </button>
            <button 
                onMouseOver={() => handleMouseOver('experience')}
                onMouseOut={handleMouseOut}
                onClick={() => scrollToSection(experienceRef)}
                style={buttonStyle('experience')}
            >
                <img src={imgExperienceIcon.source} alt="Experience Icon" /> Experience
            </button>
            <button 
                onMouseOver={() => handleMouseOver('skills')}
                onMouseOut={handleMouseOut}
                onClick={() => scrollToSection(skillsRef)}
                style={buttonStyle('skills')}
            >
                <img src={imgSkillsIcon.source} alt="Skills Icon" /> Skills
            </button>
        </div>
    );
}
