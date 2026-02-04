// data storage logic

import {
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection,
  type NodeTypes,
} from '@xyflow/react';
import { nanoid } from 'nanoid';
import { createWithEqualityFn } from 'zustand/traditional';
import { EmployeeOptions } from '../nodes/EmployeeOptions';
import { connectEmployee, createEmployee } from './people';

// name: Person's name
// id: 5 letters or numbers 
// level: commission level (rep, dist, div)
// testdate: next day person will take test
export type NodeData = {
  name: string;
  id: string;
  level: string;
  testdate: string;
};

export type AppNode = Node<NodeData>;
export type AppEdge = Edge;

export interface StoreState {
  nodes: AppNode[];
  edges: AppEdge[];
  nodeTypes: NodeTypes;
  onNodesChange: (changes: NodeChange<AppNode>[]) => void;
  onEdgesChange: (changes: EdgeChange<AppEdge>[]) => void;
  removeNodes: (nodes: AppNode[]) => void;
  addEdge: (data: Connection) => void;
  createNode: (type: string) => void;
  createConnectedNode: (type: string, name: string, id: string, level: string | undefined, testdate: string | undefined, parentId: string) => void;
}


export const useStore = createWithEqualityFn<StoreState>((set, get) => ({
  nodes: [ // dummy nodes
    { id: 'n1', type: 'employee', position: { x: 1000, y: 100 }, data: { name: 'Jerry', id: '00001', level: '1', testdate: 'tomorrow' } },
    { id: 'n2', type: 'employee', position: { x: 1000, y: 300 }, data: { name: 'Jack', id: '00002', level: '1', testdate: 'tomorrow' } },
    { id: 'n3', type: 'employee', position: { x: 1250, y: 300 }, data: { name: 'Jill', id: '00003', level: '1', testdate: 'tomorrow' } },
    { id: 'n4', type: 'employee', position: { x: 750, y: 300 }, data: { name: 'Supercalifragalisticexpialidocious', id: '00004', level: '1', testdate: 'tomorrow' } },
  ],
  edges: [
    { id: 'n1-n2', source: 'n1', target: 'n2' },
    { id: 'n1-n3', source: 'n1', target: 'n3' },
    { id: 'n1-n4', source: 'n1', target: 'n4' },
  ],
  nodeTypes: {
    employee: EmployeeOptions,
  },

  onNodesChange(changes: NodeChange<AppNode>[]) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange(changes: EdgeChange<AppEdge>[]) {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  addEdge(data: Connection) {
    const id = nanoid(6);
    const edge: AppEdge = { id, ...data };

    set({ edges: [edge, ...get().edges] });
    connectEmployee(data.source, data.target);
  },

  createNode(type: string) {
    const id = nanoid();

    const data: NodeData = { name: 'this', id: '1', level: '1', testdate: '1' };
    const position = { x: 50, y: 50 };

    createEmployee(id, type, data);
    set({ nodes: [...get().nodes, { id, type, data, position }] });
  },
  removeNodes(nodes: AppNode[]) {
    const nodeIds = nodes.map((n) => n.id);
    set({
      nodes: get().nodes.filter((n) => !nodeIds.includes(n.id)),
      edges: get().edges.filter((e) => !nodeIds.includes(e.source) && !nodeIds.includes(e.target)),
    });
  },

  createConnectedNode(type: string, name: string, id: string, level: string | undefined, testdate: string | undefined, parentId: string) {
    // const id = nanoid();
    const edgeId = nanoid(6);

    // Find parent node to position the new node below it
    const parentNode = get().nodes.find((n) => n.id === parentId);
    const position = parentNode
      ? { x: parentNode.position.x, y: parentNode.position.y + 200 }
      : { x: 50, y: 50 };

    if (!level) { level = "-1"};
    if (!testdate) {testdate = "n/a"}
    const data: NodeData = { name, id, level, testdate };

    createEmployee(id, type, data);
    
    // Create the new node and edge connecting it to the parent
    set({
      nodes: [...get().nodes, { id, type, data, position }],
      edges: [...get().edges, { id: edgeId, source: parentId, target: id }],
    });

    connectEmployee(parentId, id);
  }
}));