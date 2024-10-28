import React from 'react';
import Profile from './layouts/Profile.js';
import Experience from './layouts/Experience.js';
import Skills from './layouts/Skills.js';
import Work from './layouts/Work.js';

import WorkInProgress from './layouts/WorkInProgress.js';

function App() {
  return (
    <div>
      <Profile />
      <Experience />
      <Skills />
      <Work />
      <WorkInProgress />
    </div>
  );
}

export default App;