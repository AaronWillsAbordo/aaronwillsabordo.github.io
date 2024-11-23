import React, { useState, useEffect, forwardRef } from 'react';
import dataWork from '../data/dataWork.json';
import { dataImgs } from '../data/dataImgs';
import ReactMarkdown from 'react-markdown';
import EmblaCarousel from '../components/EmblaCarousel'
import './Work.css';
import '../components/embla.css'

const Work = forwardRef((props, ref) => {
    const imgGoto = dataImgs.find(img => img.name === "goto");

    return (
        <section className="layoutCream" ref={ref}>
            <title>Work</title>
            <h2>Some of the noteworthy projects I have built:</h2>

            {dataWork.work.map((project) => (
                <div key={project.id} className="work-container">
                    <div className="work-column-left">
                        {project.imgs && project.imgs.length > 0 ? (
                            <EmblaCarousel slides={project.imgs} options={{loop: true}} />
                        ) : (
                            <p>No images available for this project.</p>
                        )}
                    </div>
                    <div className="work-column-right">
                        <h1>{project.title}</h1>
                        <p>
                            <ReactMarkdown>
                                {project.description.join('\n')}
                            </ReactMarkdown>
                        </p>
                        <div className="skills-container">
                            {project.skills.map((skill, index) => (
                                <span key={index} className="skill-box">{skill}</span>
                            ))}
                        </div>
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="goto-box" style={{marginTop: '15px'}} >
                            {project.category === "repo" ? "Goto repo" : "See project"}
                            <img src={imgGoto.source} alt="Go to project" className="goto-icon" />
                        </a>
                    </div>
                </div>
            ))}

        </section>
    );
});

export default Work;
