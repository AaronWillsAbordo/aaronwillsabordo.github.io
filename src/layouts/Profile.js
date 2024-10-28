import React, { useEffect, useState } from 'react';
import {dataImgs} from '../data/dataImgs';
import {dataLinks} from '../data/dataLinks';

import './Profile.css';

export default function Profile() {
    const imgLocation = dataImgs.find(img => img.name === "location");
    const imgLinkedIn = dataImgs.find(img => img.name === "linkedin");
    const imgGitHub = dataImgs.find(img => img.name === "github");
    const imgProfile = dataImgs.find(img => img.name === "profile");
    const imgArrowDown = dataImgs.find(img => img.name === "arrowDown");
    const linkMap = dataLinks.find(link => link.name === "mapsGoogleLink");
    
    const [arrowVisible, setArrowVisible] = useState(true);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY === 0) {
                setArrowVisible(true);
            } else {
                setArrowVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    return (
        <div className="layoutWhite layoutWhite--profile">
            <div className="profile-content">
                <div className="content-box">
                    <h1 style={{ paddingBottom: '20px', fontSize: '32px' }}>Hi, I'm Aaron 👋</h1>
                    <h3>
                        I’m a <strong>Software Engineer</strong> with expertise in <strong>Python</strong>
                        , <strong>.NET</strong>, <strong>React</strong>, and <strong>data analytics</strong>, 
                        dedicated to building efficient, scalable solutions. 
                        I’m also passionate about creating impactful software 
                        and exploring <strong>AI technologies</strong>. Eager to contribute to a challenging 
                        and collaborative environment where I can continuously learn and grow.
                    </h3>
                    
                    <div className="location-content">
                        <a href={linkMap.url} target="_blank" rel="noopener noreferrer" className="location-info">
                            <img src={imgLocation.source} alt="location" />
                        </a>
                        <a href={linkMap.url} target="_blank" rel="noopener noreferrer" className="location-info">
                            <p>Taguig City, Philippines</p>
                        </a>
                    </div>

                    <div className='layout-sidebyside'>
                        <a href={imgLinkedIn.url} target="_blank" rel="noopener noreferrer">
                            <img src={imgLinkedIn.source} alt="LinkedIn" />
                        </a>
                        <a href={imgGitHub.url} target="_blank" rel="noopener noreferrer">
                            <img src={imgGitHub.source} alt="GitHub" />
                        </a>
                    </div>

                </div>
                <div className="image-section">
                    <div id="rectangle" ></div>
                    <img src={imgProfile.source} alt="profile-pic" className="profile-image" />
                </div>
            </div>

            <div className={`scroll-arrow ${!arrowVisible ? 'hidden' : ''}`}>
                <img src={imgArrowDown.source} alt="arrowDown" />
            </div>


        </div>
    );
}