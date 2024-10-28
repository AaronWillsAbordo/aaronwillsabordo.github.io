import React, { forwardRef } from 'react';
import dataSkills from '../data/dataSkills.json'; // default import
import './Skills.css';

const Skills = forwardRef((props, ref) => {
    const firstRow = dataSkills.skills.slice(0, 5);
    const secondRow = dataSkills.skills.slice(5, 10);
    const thirdRow = dataSkills.skills.slice(10);

    return (
        <section ref={ref} className='layoutWhite'>
            <title>Skills</title>
            <h2>The skills, tools, and technologies I am good at:</h2>

            <div className="skills-grid">
                {[firstRow, secondRow, thirdRow].map((row, index) => (
                    <div key={index} className={`skills-row ${index === 2 ? 'last-row' : ''}`}>
                        {row.map((skill) => (
                            <div key={skill.id} className="skill-item">
                                <img src={skill.path} alt={skill.id} className="skill-logo" />
                                <h2>{skill.name}</h2>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
});

export default Skills;