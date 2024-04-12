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
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Binary Tree Visualizer</h1>
      <div>
        {trees.map(tree => (
          <div key={tree.id} style={{ marginTop: '20px' }}>
            <p>Tree ID: {tree.id}</p>
            <p>Input Numbers: {tree.inputNumbers}</p>
            <p>Tree Structure: {tree.treeStructure}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrevTrees;



