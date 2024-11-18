import React, { useState, useEffect } from 'react';
import { useMediaQuery } from "@uidotdev/usehooks";
import './NavBar.css';

export default function NavBar({ profileRef, skillsRef, experienceRef, workRef, certificatesRef, aboutRef, infoRef }) {
    const [active, setActive] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const isMobile = useMediaQuery("only screen and (max-width : 800px)");

    const sections = [
        { ref: profileRef, label: 'Profile', id: 'profile' },
        { ref: experienceRef, label: 'Experience', id: 'experience' },
        { ref: skillsRef, label: 'Skills', id: 'skills' },
        { ref: workRef, label: 'Works', id: 'works' },
        { ref: certificatesRef, label: 'Certificates', id: 'certificates' },
        { ref: aboutRef, label: 'About', id: 'about' },
        { ref: infoRef, label: 'Info', id: 'info' },
    ];

    const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        sections.forEach((section) => {
            if (section.ref.current) {
                const sectionTop = section.ref.current.offsetTop;
                const sectionHeight = section.ref.current.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    setActive(section.id);
                }
            }
        });
    };

    const scrollToSection = (elementRef) => {
        window.scrollTo({
            top: elementRef.current.offsetTop,
            behavior: 'smooth',
        });
        setMenuOpen(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="nav-bar">
        { isMobile ? (
            <>
                <div className={`burger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                    <input type="checkbox" checked={menuOpen} readOnly />
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={`menu ${menuOpen ? 'visible' : ''}`}>
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.ref)}
                            className={active === section.id ? 'active' : ''}
                        >
                            {section.label}
                        </button>
                    ))}
                </div>
            </>
            ):(
            <>
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
            </>
            )}
        </nav>
    );
}
