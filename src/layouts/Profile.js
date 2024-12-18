import React, { useEffect, useState, forwardRef } from 'react';
import { dataProfile } from '../data/data';
import { dataImgs } from '../data/dataImgs';
import { dataLinks } from '../data/dataLinks';

import './Profile.css';

const Profile = forwardRef((props, ref) => {
    const imgLocation = dataImgs.find(img => img.name === "location");
    const imgLinkedIn = dataImgs.find(img => img.name === "linkedin");
    const imgGitHub = dataImgs.find(img => img.name === "github");
    const imgProfile = dataImgs.find(img => img.name === "profile");
    const imgArrowDown = dataImgs.find(img => img.name === "arrowDown");
    const linkMap = dataLinks.find(link => link.name === "mapsGoogleLink");
    
    const [arrowVisible, setArrowVisible] = useState(true);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setArrowVisible(false);
            } else {
                setArrowVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    return (
        <section ref={ref} className="layoutWhite">
            {props.isMobile ? (
                <article style={{height: '100vh', display: 'flex', justifyContent: 'center'}}>
                    <div className="profile-content">
                        <div className="image-section">
                            {/* <div id="rectangle" ></div> */}
                            <img src={imgProfile.source} alt="profile-pic" className="profile-image" />
                        </div>
                        <div className="content-box">
                            <h1 style={{ paddingBottom: '10px', fontSize: '32px' }}>Hi, I'm Aaron 👋</h1>
                            <h3 
                                dangerouslySetInnerHTML={{ __html: dataProfile[0].profile.join('') }}>
                            </h3>
                            
                            <div className="location-content">
                                <a href={linkMap.url} target="_blank" rel="noopener noreferrer" className="location-info">
                                    <img src={imgLocation.source} alt="location" />
                                </a>
                                <a href={linkMap.url} target="_blank" rel="noopener noreferrer" className="location-info">
                                    <p>Taguig City, Philippines</p>
                                </a>
                            </div>

                            <div className='layout-sidebyside'>
                                <a href={imgLinkedIn.url} target="_blank" rel="noopener noreferrer">
                                    <img src={imgLinkedIn.source} alt="LinkedIn" />
                                </a>
                                <a href={imgGitHub.url} target="_blank" rel="noopener noreferrer">
                                    <img src={imgGitHub.source} alt="GitHub" />
                                </a>
                            </div>

                        </div>
                        
                    </div>
                    <img className={`scroll-arrow ${!arrowVisible ? 'hidden' : ''}`} style={{rotate: '-90deg', bottom: '10%', left: '60%'}} src={imgArrowDown.source} alt="arrowDown" />
                </article>
            ):(
                <article style={{height: '100vh', display: 'flex', justifyContent: 'center'}}>
                    <div className="profile-content">
                        <div className="content-box">
                            <h1 style={{ paddingBottom: '20px', fontSize: '32px' }}>Hi, I'm Aaron 👋</h1>
                            <h3 
                                dangerouslySetInnerHTML={{ __html: dataProfile[0].profile.join('') }}>
                            </h3>
                            
                            <div className="location-content">
                                <a href={linkMap.url} target="_blank" rel="noopener noreferrer" className="location-info">
                                    <img src={imgLocation.source} alt="location" />
                                </a>
                                <a href={linkMap.url} target="_blank" rel="noopener noreferrer" className="location-info">
                                    <p>Taguig City, Philippines</p>
                                </a>
                            </div>

                            <div className='layout-sidebyside'>
                                <a href={imgLinkedIn.url} target="_blank" rel="noopener noreferrer">
                                    <img src={imgLinkedIn.source} alt="LinkedIn" />
                                </a>
                                <a href={imgGitHub.url} target="_blank" rel="noopener noreferrer">
                                    <img src={imgGitHub.source} alt="GitHub" />
                                </a>
                            </div>

                        </div>
                        <div className="image-section">
                            <div id="rectangle" ></div>
                            <img src={imgProfile.source} alt="profile-pic" className="profile-image" />
                        </div>
                    </div>

                    <img className={`scroll-arrow ${!arrowVisible ? 'hidden' : ''}`} src={imgArrowDown.source} alt="arrowDown" />
                </article>
            )}


        </section>
    );
});

export default Profile;