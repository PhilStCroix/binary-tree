import React from 'react';

const TreeNode = ({ value, left, right }) => (
  <div className="tree-node">
    <div className="node-value">{value}</div>
    <div className="children">
      {left && <TreeNode {...left} />}
      {right && <TreeNode {...right} />}
    </div>
  </div>
);

const TreeVisuals = ({ treeData }) => {
  if (!treeData) return <div>No tree data provided</div>;

  return (
    <div className="tree-container">
      <TreeNode {...treeData} />
    </div>
  );
};

export default TreeVisuals;

