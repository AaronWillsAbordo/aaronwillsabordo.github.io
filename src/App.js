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
        return <About ref={aboutRef} isMobile={isMobile} />;
        // return <WorkInProgress />;

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

  //region CHATBOT;
  const [userInput, setUserInput] = useState('');
  const [botResponse, setBotResponse] = useState('');
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    try {
      const res = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
      });
      const data = await res.json();
      setBotResponse(data.response || 'No response');
    } catch (error) {
      console.error('Error talking to chatbot:', error);
      setBotResponse('Error connecting to chatbot');
    }
  };
  //endregion CHATBOT

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

          {/* <ChatBot /> */}
          <div style={{ padding: '2rem', backgroundColor: '#f5f5f5' }}>
            <h3>Chatbot Test</h3>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type a message"
              style={{ padding: '0.5rem', width: '300px', marginRight: '1rem' }}
            />
            <button onClick={handleSendMessage} style={{ padding: '0.5rem 1rem' }}>
              Send
            </button>
            <div style={{ marginTop: '1rem' }}>
              <strong>Bot says:</strong> {botResponse}
            </div>
          </div>
          {/* <ChatBot /> */}
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