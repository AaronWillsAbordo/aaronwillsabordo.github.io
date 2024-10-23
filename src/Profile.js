import React from 'react';
import {dataImgs} from './dataImgs';
import {dataLinks} from './dataLinks';

export default function Profile() {
    const imgLocation = dataImgs.find(img => img.imgName === "location");
    const imgLinkedIn = dataImgs.find(img => img.imgName === "linkedin");
    const imgGitHub = dataImgs.find(img => img.imgName === "github");
    const linkMap = dataLinks.find(link => link.urlName === "mapsGoogleLink");

    return (
        <div className = "layoutWhite">
            <div className="content-box">
                <h1 style={{ textAlign: 'left' }}>Hi, I'm Aaron 👋</h1>
                <p>
                    I’m a <strong>Software Engineer</strong> with expertise in <strong>Python</strong>
                    , <strong>.NET</strong>, <strong>React</strong>, and <strong>data analytics</strong>, 
                    dedicated to building efficient, scalable solutions. 
                    I’m also passionate about creating impactful software 
                    and exploring <strong>AI technologies</strong> in fast-paced, collaborative environments.
                </p>
                
                <a href={linkMap.urlLink} target="_blank" rel="noopener noreferrer" className="location-info">
                    <img src={imgLocation.imgSource} alt="location" />
                    <p>Taguig City, Philippines</p>
                </a>

                <div className='layout-sidebyside'>
                    <a href={imgLinkedIn.imgUrl} target="_blank" rel="noopener noreferrer">
                        <img src={imgLinkedIn.imgSource} alt="LinkedIn" />
                    </a>
                    <a href={imgGitHub.imgUrl} target="_blank" rel="noopener noreferrer">
                        <img src={imgGitHub.imgSource} alt="GitHub" />
                    </a>
                </div>

            </div>
        </div>
    );
}