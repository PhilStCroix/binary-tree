import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div>
      <h1>Welcome to the Binary Tree Visualizer</h1>
      <p>Use the links below to navigate the app:</p>
      <ul>
        <li><Link to="/enter-numbers">Enter Numbers</Link></li>
        <li><Link to="/prev-trees">Previous Trees</Link></li>
      </ul>
    </div>
  );
}

export default LandingPage;
