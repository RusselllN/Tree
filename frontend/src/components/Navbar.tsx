import { EmployeeOptions } from '../nodes/EmployeeOptions';
import { useStore, type StoreState } from '../actions/store.js';
import { shallow } from 'zustand/shallow';

const selector = (store: StoreState) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
  onNodesDelete: store.removeNodes, // for deleting nodes
  createNode: store.createNode
});

export default function Navbar() {
    const store = useStore(selector, shallow);

return(
    <div>
        <ul className="flex px-15 py-8 gap-4 bg-gray-200 w-screen justify-end">
            {/* <li className="bg-blue-400 px-4 py-1 rounded-2xl text-white"><a>Add Member</a></li> */}
            <button className="bg-blue-400 px-4 py-1 rounded-2xl text-white" onClick={() => store.createNode('employee')}>Add Member</button>
            <li className="bg-blue-400 px-4 py-1 rounded-2xl text-white"><a>CIPR Instructions</a></li>
            <li className="bg-blue-400 px-4 py-1 rounded-2xl text-white"><a>Videos</a></li>
        </ul>
    </div>
)

}