// logic for making new nodes maybe

interface NodeData {
  frequency?: number;
  type?: string;
}

interface StoreState {
  updateNode: (id: string, data: Partial<NodeData>) => void;
}

const context = new AudioContext();
const nodes = new Map<string, AudioNode>();

const selector = (id: string) => (store: StoreState) => ({
  setFrequency: (e: React.ChangeEvent<HTMLInputElement>) => store.updateNode(id, { frequency: +e.target.value }),
  setType: (e: React.ChangeEvent<HTMLSelectElement>) => store.updateNode(id, { type: e.target.value }),
});

// Create node
export function createEmployee(id: string, type: string, data: {label: string}): void {
  const node = new Map<string, unknown>();

  node.set(id, node);
}

// Connect node (unfinished)
export function connectEmployee(sourceID: string, targetID: string): void {
  const source = nodes.get(sourceID);
  const target = nodes.get(targetID);

  if (source && target) {
    source.connect(target);
  }
}
