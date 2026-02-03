import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useStore } from "../actions/store";
interface NewMemberProps {
  leaderID: string;
  setAddMember: Dispatch<SetStateAction<boolean>>;
}

export default function NewMember({ leaderID, setAddMember }: NewMemberProps) {
  const createConnectedNode = useStore((state) => state.createConnectedNode);

  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    id: z.string().min(1, "ID is required"),
    leader: z.string().min(1, "Leader is required"),
  });

  const defaultValues: z.infer<typeof schema> = {
    name: "",
    id: "",
    leader: leaderID,
  };

  const form = useForm<z.infer<typeof schema>>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const addMember = async (data: z.infer<typeof schema>) => {
    createConnectedNode('employee', data.name, leaderID);
    setAddMember(false);
  }

  return (
    <form
      onSubmit={form.handleSubmit(addMember)}
      // className="flex flex-col max-w-sm absolute left-0 top-0 px-30"
      className="flex flex-col max-w-sm absolute left-0 top-0 py-13"
    >
      <div className="border rounded-lg">
        <div>
          <label className="px-2" htmlFor="name">Name:</label>
          <input {...form.register("name")} type="text" id="name" name="name" />
          {form.formState.errors.name && (
            <p className="text-red-500">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="px-2" htmlFor="id">ID:</label>
          <input {...form.register("id")} type="text" id="id" name="id" />
          {form.formState.errors.id && (
            <p className="text-red-500">{form.formState.errors.id.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <input className="" type="submit" value="Submit" />
        </div>
      </div>

      {/* <div className="border rounded-lg">
      <label className="px-2" htmlFor="name">Name:</label>
      <input {...form.register("name")} type="text" id="name" name="name" />
      {form.formState.errors.name && (
        <p className="text-red-500">{form.formState.errors.name.message}</p>
      )}
      <label className="px-2" htmlFor="id">ID:</label>
      <input {...form.register("id")} type="text" id="id" name="id" />
      {form.formState.errors.id && (
        <p className="text-red-500">{form.formState.errors.id.message}</p>
      )}
      <div className="px-16">
      <input type="submit" value="Submit" />
      </div> */}
      {/* <label htmlFor="leader">Leader:</label> */}
      {/* <input
        {...form.register("leader")}
        type="text"
        id="leader"
        name="leader"
      />}
      {form.formState.errors.leader && (
        <p className="text-red-500">{form.formState.errors.leader.message}</p>
      )} */}
      
    </form>
  );
}
