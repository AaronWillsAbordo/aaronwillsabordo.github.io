import React from 'react';

import './Experience.css';

export default function Experience() {
    return (
        <div className="layoutCream">
            <title>Experience</title>
            <h2>Here is a quick summary of my most recent experiences:</h2>
            <div className="experience-container">
                <div className="experience-column-left">
                    <img src="path_to_image.jpg" alt="Experience Icon" />
                </div>
                <div className="experience-column-right">
                    <div>
                        <h3>Position Title</h3>
                        <p>Company Name</p>
                        <p>Brief description of responsibilities and achievements.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}