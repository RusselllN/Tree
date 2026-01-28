
import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Panel} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { EmployeeOptions } from './nodes/EmployeeOptions';
import { Position, Handle } from '@xyflow/react'; // for connecting nodes

import { shallow } from 'zustand/shallow';
import { useStore } from './store.js';

// store node data
const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
  onNodesDelete: store.removeNodes, // for deleting nodes
  createNode: store.createNode
});

// custom node types
const nodeTypes = {
  employee: EmployeeOptions
};

// Build Nodes
export default function App() {
  const store = useStore(selector, shallow);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={store.nodes}
        edges={store.edges}
        nodeTypes={nodeTypes} // unique node type
        onNodesChange={store.onNodesChange}
        onEdgesChange={store.onEdgesChange}
        onConnect={store.addEdge}
        onNodesDelete={store.onNodesDelete} // for deleting nodes
      >
        <Panel position="top-right">
          <button className="px-5" onClick={() => store.createNode('employee')}>New Employee</button>
        </Panel>
        <Background />
      </ReactFlow>
    </div>
  );
}