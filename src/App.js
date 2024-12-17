import React, { useRef, useState, useEffect } from 'react';

import Profile from './layouts/Profile.js';
import Experience from './layouts/Experience.js';
import Skills from './layouts/Skills.js';
import Work from './layouts/Work.js';
import Certificates from './layouts/Certificates.js';
import About from './layouts/About.js';
import Info from './layouts/Info.js';

import Footer from './layouts/Footer.js';
import NavBar from './components/NavBar';
import WorkInProgress from './components/WorkInProgress.js';

function App() {
  const profileRef = useRef(null);
  const experienceRef = useRef(null);
  const skillsRef = useRef(null);
  const workRef = useRef(null);
  const certificatesRef = useRef(null);
  const aboutRef = useRef(null);
  const infoRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState('profile');
  useEffect(() => {
    function detectMobileDevice() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      return mobileRegex.test(userAgent);
    }

    setIsMobile(detectMobileDevice());
  }, []);

  const renderLayout = () => {
    switch (selectedLayout) {
      case 'profile':
        return <Profile ref={profileRef} isMobile={isMobile} />;

      case 'experience':
        return <Experience ref={experienceRef} isMobile={isMobile} />;

      case 'skills':
        return <Skills ref={skillsRef} isMobile={isMobile} />;
        // return <WorkInProgress />;

      case 'works':
        return <Work ref={workRef} isMobile={isMobile} />;
        // return <WorkInProgress />;

      case 'certificates':
        return <Certificates ref={certificatesRef} isMobile={isMobile} />;
        // return <WorkInProgress />;

      case 'about':
        // return <About ref={aboutRef} isMobile={isMobile} />;
        return <WorkInProgress />;

      case 'info':
        return (
            <>
              <Info ref={infoRef} isMobile={isMobile} style={isMobile ? { maxHeight: '100vh' } : {}} />
              <Footer />
            </>
          );
          
      default:
        return <Profile ref={profileRef} isMobile={isMobile} />;
    }
  };

  return (
    <>
      {isMobile ? (
        <>
          {renderLayout()}
        </>
      ) : (
        <>
          <Profile ref={profileRef} />
          <Experience ref={experienceRef} />
          <Skills ref={skillsRef} />
          <Work ref={workRef} />
          <Certificates ref={certificatesRef} />
          <About ref={aboutRef} />
          <Info ref={infoRef} />
          <Footer />
        </>
      )}

      {/* <WorkInProgress /> */}
      <NavBar 
        profileRef={profileRef} 
        experienceRef={experienceRef} 
        skillsRef={skillsRef} 
        workRef={workRef} 
        certificatesRef={certificatesRef}
        aboutRef={aboutRef}
        infoRef={infoRef}
        isMobile={isMobile}
        setSelectedLayout={setSelectedLayout}
      />
    </>
  );
}

export default App;