import React, { useRef } from 'react';
import Profile from './layouts/Profile.js';
import Experience from './layouts/Experience.js';
import Skills from './layouts/Skills.js';
import Work from './layouts/Work.js';

import NavBar from './components/NavBar';
import WorkInProgress from './components/WorkInProgress.js';

function App() {
  const profileRef = useRef(null);
  const experienceRef = useRef(null);
  const skillsRef = useRef(null);
  const workRef = useRef(null);

  return (
    <div>
      <Profile ref={profileRef} />
      <Experience ref={experienceRef} />
      <Skills ref={skillsRef} />
      <Work ref={workRef} />
      <WorkInProgress />
      <NavBar 
        profileRef={profileRef} 
        experienceRef={experienceRef} 
        skillsRef={skillsRef} 
        workRef={workRef} 
      />
    </div>
  );
}

export default App;
