
import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Position, Handle } from '@xyflow/react';
 
const initialNodes = [
  { id: 'n1', type: 'employee', position: { x: 0, y: 0 }, data: { label: 'Jerry' } },
  { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Jack' } },
  { id: 'n3', position: { x: 250, y: 100}, data: {label: 'Jill'}},
  { id: 'n4', position: { x: -250, y: 100}, data: {label: 'Supercalifragalisticexpialidocious'}}
];
const initialEdges = [
  { id: 'n1-n2', source: 'n1', target: 'n2' },
  { id: 'n1-n3', source: 'n1', target: 'n3' },
  { id: 'n1-n4', source: 'n1', target: 'n4' }
];


export function TextUpdaterNode(props) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
 
  return (
    <div className="text-updater-node">
      <div>

        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
    </div>
  );
}

export function EmployeeOptions() {
  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );
  return(
    <div className='button-person'>
      <div className="hover"><button onClick={() => alert(1)}>Jerry</button></div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}




export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  
  
  const nodeTypes = {
    textUpdater: TextUpdaterNode,
    employee: EmployeeOptions,
  };
 
  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes} // unique node type
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
    </div>
  );
}