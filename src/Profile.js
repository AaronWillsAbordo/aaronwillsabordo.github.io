import React from 'react';
import {dataImgs} from './dataImgs'

export default function Profile() {
    const imgLocation = dataImgs.find(img => img.imgName === "location");

    return (
        <div className = "layoutCream">
            <h1 style={{ textAlign: 'left' }}>Hi, I'm Aaron 👋</h1>
            <p>
                I’m a <strong>Software Engineer</strong> with expertise in <strong>Python</strong>, 
                <strong>.NET</strong>, <strong>React</strong>, and <strong>data analytics</strong>, 
                dedicated to building efficient, scalable solutions. 
                I’m also passionate about creating impactful software 
                and exploring <strong>AI technologies</strong> in fast-paced, collaborative environments.
            </p>
            <div className="layout-sidebyside">
                <img src={imgLocation.imgSource} alt="location" />
                <p>Taguig City, Philippines</p>
            </div>
        </div>
    );
}