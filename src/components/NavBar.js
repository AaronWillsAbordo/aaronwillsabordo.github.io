// NavBar.js
import React, { useEffect, useState } from 'react';
import './NavBar.css';

export default function NavBar({ profileRef, skillsRef, experienceRef, workRef, certificatesRef, aboutRef }) {
    const [active, setActive] = useState('');

    const sections = [
        { ref: profileRef, label: 'Profile', id: 'profile' },
        { ref: experienceRef, label: 'Experience', id: 'experience' },
        { ref: skillsRef, label: 'Skills', id: 'skills' },
        { ref: workRef, label: 'Works', id: 'works' },
        { ref: certificatesRef, label: 'Certificates', id: 'certificates' },
        { ref: aboutRef, label: 'About', id: 'about' },
    ];

    const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        sections.forEach(section => {
            if (section.ref.current) {
                const sectionTop = section.ref.current.offsetTop;
                const sectionHeight = section.ref.current.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    setActive(section.id);
                }
            }
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initialize active state
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (elementRef) => {
        window.scrollTo({
            top: elementRef.current.offsetTop,
            behavior: 'smooth',
        });
    };

    return (
        <div className="nav-bar">
            {sections.map((section) => (
                <button
                    key={section.id}
                    onClick={() => scrollToSection(section.ref)}
                    className={active === section.id ? 'active' : ''}
                >
                    <img src={`/img/icon/${section.id}.svg`} alt={`${section.label} icon`} />
                    {section.label}
                </button>
            ))}
        </div>
    );
}
