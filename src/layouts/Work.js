import React, { forwardRef } from 'react';
import dataWork from '../data/dataWork.json';
import {dataImgs} from '../data/dataImgs';
import './Work.css';

const Work = forwardRef((props, ref) => {
    const imgGoto = dataImgs.find(img => img.name === "goto");

    return (
        <section className="layoutCream" ref={ref}>
            <title>Work</title>
            <h2>Some of the noteworthy projects I have built:</h2>

            {dataWork.work.map((project) => (
                <div key={project.id} className="work-container">
                    <div className="work-column-left">
                        <img src={project.img} alt={`${project.title} logo`} />
                    </div>
                    <div className="work-column-right">
                        <h1>{project.title}</h1>
                        <p>{project.description}</p>
                        <div className="skills-container">
                            {project.skills.map((skill, index) => (
                                <span key={index} className="skill-box">{skill}</span>
                            ))}
                        </div>
                        <div className="goto-container">
                            <div className="goto-box" onClick={() => window.open(project.link, "_blank")}>
                                See project
                                <img src={imgGoto.source} alt="Go to project" className="goto-icon" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
});

export default Work;
