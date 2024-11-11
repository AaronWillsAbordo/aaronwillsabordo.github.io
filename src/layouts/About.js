import React, { forwardRef } from 'react';
// import dataSkills from '../data/dataSkills.json'; 
import {dataImgs} from '../data/dataImgs';
import './About.css';

const Skills = forwardRef((props, ref) => {
    const imgProfile = dataImgs.find(img => img.name === "profile2");

    return (
        <section ref={ref} className='layoutCream'>
            <title>About me</title>
            <h2>Curious about me? Here you go:</h2>

            <div className='about-container'>
                <div className="about-image-section">
                    <div id="about-rectangle" ></div>
                    <img src={imgProfile.source} alt="profile-pic" className="about-profile-image" />
                </div>

                <h3 className='about-right-column'>
                    I am a goal-oriented, adaptable, and highly committed professional with a strong background in 
                    software development, machine learning, and web technologies. With hands-on experience 
                    in <strong>AI-powered 3D mesh manipulation</strong>, <strong>full-stack 
                    development</strong>, and <strong>software automation</strong>, I thrive on solving complex 
                    problems and continuously expanding my technical skillset.
                    <br />
                    <br />
                    My expertise includes building scalable, responsive web applications, automating 
                    workflows, and developing neural networks using Python. I enjoy working with diverse tools 
                    and technologies such as React, PyTorch, and cloud-based platforms, and I am always exploring 
                    new areas to further enhance my capabilities.
                    <br />
                    <br />
                    Throughout my journey, I have cultivated a passion for delivering impactful solutions, 
                    collaborating with talented teams, and driving innovation. I am committed to applying my 
                    knowledge to create meaningful results and continuously push the boundaries of what’s 
                    possible in the tech industry.
                </h3>
            </div>
            
        </section>
    );
});

export default Skills;