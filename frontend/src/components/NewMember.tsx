import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
interface NewMemberProps {
  leaderID: string;
  setAddMember: Dispatch<SetStateAction<boolean>>;
}

export default function NewMember({ leaderID, setAddMember }: NewMemberProps) {
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
    setAddMember(false)
    console.log(data)
    
  }

  return (
    <form
      onSubmit={form.handleSubmit(addMember)}
      className="flex flex-col max-w-sm absolute right-0 top-0"
    >
      <label htmlFor="name">Name:</label>
      <input {...form.register("name")} type="text" id="name" name="name" />
      {form.formState.errors.name && (
        <p className="text-red-500">{form.formState.errors.name.message}</p>
      )}
      <label htmlFor="id">ID:</label>
      <input {...form.register("id")} type="text" id="id" name="id" />
      {form.formState.errors.id && (
        <p className="text-red-500">{form.formState.errors.id.message}</p>
      )}
      <input type="submit" value="Submit" />
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
