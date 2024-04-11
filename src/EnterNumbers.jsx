import axios from 'axios';
import React, { useState } from 'react';

const EnterNumbers = () => {
  const [numbers, setNumbers] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/process-numbers', { numbers });
      console.log(response.data); // handle the response
    } catch (error) {
      console.error('Error submitting numbers:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={numbers}
        onChange={(e) => setNumbers(e.target.value)}
        placeholder="Enter numbers"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EnterNumbers;
