import React, { forwardRef } from 'react';
import { dataAbout } from '../data/data';
import { dataImgs } from '../data/dataImgs';
import './About.css';

const About = forwardRef((props, ref) => {
    const imgProfile = dataImgs.find(img => img.name === "profile2");

    return (
        <section ref={ref} className='layoutCream'>
            <title>About me</title>
            <h2>Curious about me? Here you go:</h2>

            <div className='about-container'>
                <div className="about-image-section">
                    <img src={imgProfile.source} alt="profile-pic" className="about-profile-image" />
                    <div id="about-rectangle" ></div>
                </div>

                <h3 dangerouslySetInnerHTML={{ __html: dataAbout[0].about.join('') }}>
                </h3>
            </div>
            
        </section>
    );
});

export default About;