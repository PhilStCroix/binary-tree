import EnterNumbers from './EnterNumbers';
import PrevTrees from './PrevTrees';
import TreeVisuals from './TreeVisuals';

import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (

    <Router>
      <div>

        <Routes>
          <Route path="/enter-numbers" exact element={<EnterNumbers />} />
          <Route path="/prev-trees" exact element={<PrevTrees />} />
          <Route path="/tree-visuals" exact element={<TreeVisuals />} />
        </Routes>

      </div>
    </Router>
   
  );
}

export default App;