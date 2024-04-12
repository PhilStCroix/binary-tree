import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing">
      <h1>Welcome to BinaryTree Visualizer!</h1>
      <p>Understand and visualize your binary search trees in a simple and interactive way.</p>
      <div className="actions">
        <Link to="/enter-numbers" className="btn btn-primary">Try it now!</Link>
        <Link to="/learn-more" className="btn btn-secondary">Learn More</Link>
      </div>
    </div>
  );
};

export default LandingPage;