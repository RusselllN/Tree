// logic for making new nodes maybe

import { Position, Handle } from "@xyflow/react";
import { EmployeeOptions } from './nodes/EmployeeOptions';
import { useStore } from './store.js';
import { shallow } from 'zustand/shallow';

const context = new AudioContext();
const nodes = new Map();

const selector = (id) => (store) => ({
  setFrequency: (e) => store.updateNode(id, { frequency: +e.target.value }),
  setType: (e) => store.updateNode(id, { type: e.target.value }),
});

// Create node
export function createEmployee(id, type, data){
  const node = new Map();

  node.set(id, node);
}

// Connect node (unfinished)
export function connectEmployee(sourceID, targetID) {
  const source = nodes.get(sourceID);
  const target = nodes.get(targetID);
 
  source.connect(target);
}
