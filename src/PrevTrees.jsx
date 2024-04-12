import axios from 'axios';
import React, { useState, useEffect } from 'react';
import TreeVisuals from './TreeVisuals'; // Import the TreeVisuals component

const PrevTrees = () => {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrees = async () => {
      try {
        const response = await axios.get('http://localhost:8080/previous-trees');
        // Assuming the response contains the tree structures in a suitable format
        setTrees(response.data.map(tree => ({
          ...tree,
          treeStructure: JSON.parse(tree.treeStructure) // Parse if it's a JSON string
        })));
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
      {trees.map(tree => (
        <div key={tree.id}>
          <p>Tree ID: {tree.id}</p>
          <p>Input Numbers: {tree.inputNumbers}</p>
          {/* Render the tree visualization for each tree */}
          <TreeVisuals treeData={tree.treeStructure} />
        </div>
      ))}
    </div>
  );
};

export default PrevTrees;


