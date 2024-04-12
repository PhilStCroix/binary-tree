import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EnterNumbers = ({ setTreeData }) => {
  const [numbers, setNumbers] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');  // Clear any previous errors on a new submit
    try {
      const response = await axios.post('http://localhost:8080/process-numbers', { numbers });
      setTreeData(response.data); // assuming response.data contains the tree structure
      navigate('/tree-visuals'); // navigate to the TreeVisuals page after setting the data
    } catch (error) {
      console.error('Error submitting numbers:', error);
      setError('Failed to process numbers. Please try again.'); // Set an error message to display to the user
    } finally {
      setIsLoading(false); // Ensure loading is turned off after the request
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Binary Tree Visualizer</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}  // Display any error messages
      <form onSubmit={handleSubmit} style={{ margin: '20px' }}>
        <input
          type="text"
          value={numbers}
          onChange={(e) => setNumbers(e.target.value)}
          placeholder="Enter numbers"
          style={{ marginRight: '10px', padding: '10px' }}
          disabled={isLoading}  // Disable input when loading
        />
        <button type="submit" style={{ padding: '10px 20px' }} disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default EnterNumbers;
