import React, { forwardRef } from 'react';
import './Certificates.css';
import dataCertificates from '../data/dataCertificates.json';
import { dataImgs } from '../data/dataImgs';

const Certificates = forwardRef((props, ref) => {
    const imgGoto = dataImgs.find(img => img.name === "goto");

    // const handleImageLoad = (e) => {
    //     const img = e.target;
    //     if (img.naturalWidth > img.naturalHeight) {
    //         img.style.width = '150px';
    //     }
    // };

    return (
        <section ref={ref} className="layoutWhite">
            <title>Certificates</title>
            <h2>Education and trainings I took:</h2>
            <div className="certificates-container">
                {dataCertificates.certificates.map((cert) => (
                    <div key={cert.id} className="certificate-box">

                        <div className='ribbon-image-container'>
                            <img 
                                src={cert.logo} 
                                alt={`${cert.schoolName} logo`} 
                                className="ribbon-image" 
                                // onLoad={handleImageLoad}
                            />
                        </div>
                        
                        <div className="certificate-details">
                            <div className="left-column">
                                {cert.leftColumnImage && (
                                    <img src={cert.leftColumnImage} alt="Certificate Icon" />
                                )}
                            </div>
                            <a href={cert.link} target="_blank" rel="noopener noreferrer" className="goto-box">
                                Show credentials
                                <img src={imgGoto.source} alt="goto-creds" className="goto-icon" />
                            </a>
                        </div>

                        <h1 className="certificate-title">{cert.title}</h1>
                        <h2 className="certificate-school">{cert.schoolName}</h2>
                        {cert.credentialId && <h2 className="certificate-id">ID: {cert.credentialId}</h2>}
                        
                        <div className="skills-container" style={{justifyContent: 'center'}}>
                            {cert.skillsArray.map((skill, index) => (
                                <span key={index} className="skill-box">{skill}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
});

export default Certificates;