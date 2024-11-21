import React, { useState, useEffect } from 'react';
import './NavBar.css';

export default function NavBar( props ) {
    const [active, setActive] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    const sections = [
        { ref: props.profileRef, label: 'Profile', id: 'profile' },
        { ref: props.experienceRef, label: 'Experience', id: 'experience' },
        { ref: props.skillsRef, label: 'Skills', id: 'skills' },
        { ref: props.workRef, label: 'Works', id: 'works' },
        { ref: props.certificatesRef, label: 'Certificates', id: 'certificates' },
        { ref: props.aboutRef, label: 'About', id: 'about' },
        { ref: props.infoRef, label: 'Info', id: 'info' },
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

    const scrollToSection = (section) => {
        if (props.isMobile) {
            props.setSelectedLayout(section.id);
            setMenuOpen(false);
        } else {
            window.scrollTo({
                top: section.current.offsetTop,
                behavior: 'smooth',
            });
            setMenuOpen(false);
        }
        setActive(section.id);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="nav-bar">
        { props.isMobile ? (
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
                            onClick={() => scrollToSection(section)}
                            className={active === section.id ? 'active' : ''}
                        >
                            {section.label}
                        </button>
                    ))}
                </div>
            </>
            ):(
                sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => scrollToSection(section.ref)}
                        className={active === section.id ? 'active' : ''}
                    >
                        <img src={`/img/icon/${section.id}.svg`} alt={`${section.label} icon`} />
                        {section.label}
                    </button>
                ))
            )}
        </nav>
    );
}
