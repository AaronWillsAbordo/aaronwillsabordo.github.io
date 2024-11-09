import React, { useState, useEffect, forwardRef } from 'react';
import dataWork from '../data/dataWork.json';
import { dataImgs } from '../data/dataImgs';
import './Work.css';
import ReactMarkdown from 'react-markdown';

const Work = forwardRef((props, ref) => {
    const imgGoto = dataImgs.find(img => img.name === "goto");

    const Carousel = ({ images }) => {
        const [curr, setCurr] = useState(0);
        const [autoSlideActive, setAutoSlideActive] = useState(true);
        const [isPortrait, setIsPortrait] = useState(false);
        const autoSlideInterval = 3000;

        const prev = () => {
            setCurr((curr) => (curr === 0 ? images.length - 1 : curr - 1));
            stopAutoSlide();
        };

        const next = () => {
            setCurr((curr) => (curr === images.length - 1 ? 0 : curr + 1));
            stopAutoSlide();
        };

        const stopAutoSlide = () => {
            setAutoSlideActive(false);
            setTimeout(() => setAutoSlideActive(true), 10000);
        };

        useEffect(() => {
            if (!autoSlideActive || images.length <= 1) return;
            const slideInterval = setInterval(next, autoSlideInterval);
            return () => clearInterval(slideInterval);
        }, [autoSlideActive, images.length]);

        const handleImageLoad = (e) => {
            const { naturalWidth, naturalHeight } = e.target;
            setIsPortrait(naturalHeight > naturalWidth);
        };

        return (
            <div className="carousel">
                <div
                    className="carousel-track"
                    style={{ transform: `translateX(-${curr * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <div key={index} className="carousel-slide">
                            <img
                                src={image}
                                alt={`Project screenshot ${index + 1}`}
                                className="carousel-image"
                                style={{
                                    height: isPortrait ? '600px' : '200px',
                                    objectPosition: 'center center' 
                                }}
                                onLoad={handleImageLoad}
                            />
                        </div>
                    ))}
                </div>

                {images.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between p-4">
                        <button onClick={prev} className="carousel-button prev">❮</button>
                        <button onClick={next} className="carousel-button next">❯</button>
                    </div>
                )}
                <div className="carousel-dots flex items-center justify-center gap-2">
                    {images.map((_, i) => (
                        <div key={i} className={`carousel-dot ${curr === i ? 'p-2' : ''}`} />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <section className="layoutCream" ref={ref}>
            <title>Work</title>
            <h2>Some of the noteworthy projects I have built:</h2>

            {dataWork.work.map((project) => (
                <div key={project.id} className="work-container">
                    <div className="work-column-left">
                        {project.imgs && project.imgs.length > 0 ? (
                            <Carousel images={project.imgs} />
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
