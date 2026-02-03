import { Position, Handle } from "@xyflow/react";
import { useState } from "react";
import NewMember from "../components/NewMember";
import MemberMenu from "../components/MemberMenu";

interface EmployeeOptionsProps {
  id: string;
  data: { name: string, id: string, level: string, testdate: string };
}

export function EmployeeOptions({ id, data }: EmployeeOptionsProps) {
  const [addMember, setAddMember] = useState(false);

  return (
    <>
      {addMember && <NewMember leaderID={id} setAddMember={setAddMember} />}
      <div className="button-person relative">
        <div className="border rounded-lg px-10 py-2">
          <button onClick={() => MemberMenu(data)}></button>
          {data.name}
        </div>
        <button
          className={`${addMember && "rotate-45"} transition-all absolute top-0 right-2 text-sm`}
          onClick={() => setAddMember(!addMember)}
        >
          +
        </button>
        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} />
      </div>
    </>
  );
}
