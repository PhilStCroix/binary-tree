import axios from 'axios';
import React, { useState, useEffect } from 'react';

const PrevTrees = () => {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrees = async () => {
      try {
        const response = await axios.get('http://localhost:8080/previous-trees');
        setTrees(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchTrees();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading trees.</p>;

  return (
    <div>
      {/* Render your trees here */}
    </div>
  );
};

export default PrevTrees;

