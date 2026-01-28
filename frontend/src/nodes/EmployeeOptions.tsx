import { Position, Handle } from "@xyflow/react";

export function EmployeeOptions() {
  return (
    <div className="button-person">
      <div className="border rounded-lg px-15 py-2">
        <button onClick={() => alert(1)}>Jerry</button>
      </div>
      <button onClick={() => alert(2)}>Add Child</button>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
