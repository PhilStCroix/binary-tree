import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EnterNumbers from './EnterNumbers';
import PrevTrees from './PrevTrees';
import TreeVisuals from './TreeVisuals';
import LandingPage from './LandingPage';

function App() {
  const [treeData, setTreeData] = useState(null);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Pass setTreeData to EnterNumbers so it can update the treeData state */}
          <Route path="/enter-numbers" element={<EnterNumbers setTreeData={setTreeData} />} />
          <Route path="/prev-trees" element={<PrevTrees />} />
          {/* Pass the treeData state to TreeVisuals */}
          <Route path="/tree-visuals" element={treeData ? <TreeVisuals serializedTreeStructure={JSON.stringify(treeData)} /> : <p>Loading or no tree data available</p>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;