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

export type NodeData = {
  label: string;
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
}

export const useStore = createWithEqualityFn<StoreState>((set, get) => ({
  nodes: [ // dummy nodes
    { id: 'n1', type: 'employee', position: { x: 1000, y: 100 }, data: { label: 'Jerry' } },
    { id: 'n2', position: { x: 1000, y: 300 }, data: { label: 'Jack' } },
    { id: 'n3', position: { x: 1250, y: 300 }, data: { label: 'Jill' } },
    { id: 'n4', position: { x: 750, y: 300 }, data: { label: 'Supercalifragalisticexpialidocious' } },
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

    const data: NodeData = { label: 'are you' };
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
  }
}));