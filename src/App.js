import React from 'react';
import Profile from './layouts/Profile.js';
import Experience from './layouts/Experience.js';
import Skills from './layouts/Skills.js';

import WorkInProgress from './layouts/WorkInProgress.js';

function App() {
  return (
    <div>
      <Profile />
      <Experience />
      <Skills />
      <WorkInProgress />
    </div>
  );
}

export default App;