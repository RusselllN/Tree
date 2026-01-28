// data storage logic

import { applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import { nanoid } from 'nanoid';
import { createWithEqualityFn } from 'zustand/traditional';
import { EmployeeOptions } from './nodes/EmployeeOptions';
import { connectEmployee, createEmployee } from './people.js'

export const useStore = createWithEqualityFn((set, get) => ({
  nodes: [ // dummy nodes
    { id: 'n1', type: 'employee', position: { x: 1000, y: 100 }, data: { label: 'Jerry' } },
    { id: 'n2', position: { x: 1000, y: 300 }, data: { label: 'Jack' } },
    { id: 'n3', position: { x: 1250, y: 300}, data: {label: 'Jill'}},
    { id: 'n4', position: { x: 750, y: 300}, data: {label: 'Supercalifragalisticexpialidocious'}},
  ],
  edges: [
    { id: 'n1-n2', source: 'n1', target: 'n2' },
    { id: 'n1-n3', source: 'n1', target: 'n3' },
    { id: 'n1-n4', source: 'n1', target: 'n4' }
  ],
  nodeTypes: {
    employee: EmployeeOptions
  },
    
 
  onNodesChange(changes) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
 
  onEdgesChange(changes) {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
 
  addEdge(data) {
    const id = nanoid(6);
    const edge = { id, ...data };
 
    set({ edges: [edge, ...get().edges] });
    connectEmployee(data.source,data.target);
  },

  createNode(type){
    const id = nanoid();

    const data = { label: 'are you' };
    const position = { x: 50, y: 50};

    createEmployee(id,type,data);
    set({ nodes: [...get().nodes, { id, type, data, position }] });
  }
  
}));