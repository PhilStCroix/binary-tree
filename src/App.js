import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EnterNumbers from './EnterNumbers';
import PrevTrees from './PrevTrees';
import LandingPage from './LandingPage'; // Import your LandingPage component

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link> {/* This link leads to the landing page */}
            </li>
            <li>
              <Link to="/enter-numbers">Enter Numbers</Link>
            </li>
            <li>
              <Link to="/prev-trees">Previous Trees</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Sets LandingPage as the default */}
          <Route path="/enter-numbers" element={<EnterNumbers />} />
          <Route path="/prev-trees" element={<PrevTrees />} />
          {/* TreeVisuals will not have a direct link */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

