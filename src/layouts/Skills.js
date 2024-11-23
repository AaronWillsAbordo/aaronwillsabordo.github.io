import React, { forwardRef } from 'react';
import dataSkills from '../data/dataSkills.json'; 
import './Skills.css';

const Skills = forwardRef((props, ref) => {
    const firstRow = dataSkills.skills.slice(0, 5);
    const secondRow = dataSkills.skills.slice(5, 10);
    const thirdRow = dataSkills.skills.slice(10);

    const renderSkillsMobile = (skills) => {
        return skills.reduce((acc, skill, index) => {
            if (index % 3 === 0) {
                acc.push([]);
            }
    
            acc[acc.length - 1].push(skill);
            return acc;
        }, []).map((group, groupIndex) => {
            const gridStyle = {
                display: 'grid',
                gap: '20px',
                justifyContent: 'center',
                justifyItems: 'center',
                alignItems: 'center',
                width: '100%',
                padding: '10px',
                boxSizing: 'border-box',
                gridTemplateColumns: group.length === 1
                    ? '1fr'
                    : group.length === 2
                    ? 'repeat(2, minmax(40%, 1fr))'
                    : 'repeat(3, minmax(30%, 1fr))',
            };
    
            return (
                <div className="skills-mobile" key={groupIndex} style={gridStyle}>
                    {group.map((skill, index) => (
                        <div className="skill-item" key={index}>
                            <img src={skill.path} alt={skill.id} className="skill-logo" />
                            <h2>{skill.name}</h2>
                        </div>
                    ))}
                </div>
            );
        });
    };

    return (
        <section ref={ref} className='layoutWhite'>
            <title>Skills</title>
            <h2>The skills, tools, and technologies I am good at:</h2>

            { props.isMobile ? 
                (
                    renderSkillsMobile(dataSkills.skills)
                ) : (
                    <div className="skills-grid">
                        {[firstRow, secondRow, thirdRow].map((row, index) => (
                            <div 
                                key={index} 
                                className={`skills-row ${index === 2 ? 'last-row' : ''}`} 
                                style={props.isMobile ? { gridGap: '10px 10px' } : undefined}
                            >
                                {row.map((skill) => (
                                    <div key={skill.id} className="skill-item">
                                        <img src={skill.path} alt={skill.id} className="skill-logo" />
                                        <h2>{skill.name}</h2>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}

        </section>
    );
});

export default Skills;