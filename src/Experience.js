import React from 'react';
import {data} from './data';
import './Experience.css';

export default function Experience() {
    return (
        <div className="layoutCream">
            <title>Experience</title>
            <h2>Here is a quick summary of my most recent experiences:</h2>

            {data.map((company, companyIndex) => (
                <div key={companyIndex} className="experience-container">
                    <div className="experience-column-left">
                        <img src={company.source} alt='companyLogo' />
                    </div>
                    <div className="experience-column-right">
                        <h4>{company.company}</h4>
                        
                        {company.roles.map((role, roleIndex) => (
                            <div key={roleIndex}>
                                <div className="role-header">
                                    <h1>{role.title}</h1>
                                    <h5>{role.date}</h5>
                                </div>

                                <ul>
                                    {role.descriptions.map((description, index) => (
                                        <li key={index} dangerouslySetInnerHTML={{ __html: description }}></li>
                                    ))}
                                </ul>
                                
                                <div className="skills-container">
                                    {role.skills.map((skill, index) => (
                                        <span key={index} className="skill-box">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
