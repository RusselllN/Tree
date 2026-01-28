import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Form() {
    const schema = z.object({
    name: z.string().min(1, "Name is required"),
    id: z.string().min(1, "ID is required"),
    leader: z.string().min(1, "Leader is required"),
  });

  const defaultValues: z.infer<typeof schema> = {
    name: "",
    id: "",
    leader: "",
  };


  const form = useForm<z.infer<typeof schema>>({defaultValues, resolver: zodResolver(schema)});
  return (
    <form {...form} onSubmit={form.handleSubmit((data) => console.log(data))} className="flex flex-col max-w-sm ">
      <label htmlFor="name">Name:</label>
      <input {...form.register("name")} type="text" id="name" name="name" />
      {form.formState.errors.name && <p className="text-red-500">{form.formState.errors.name.message}</p>}
      <label htmlFor="id">ID:</label>
      <input {...form.register("id")} type="text" id="id" name="id" />
      {form.formState.errors.id && <p className="text-red-500">{form.formState.errors.id.message}</p>}
      <label htmlFor="leader">Leader:</label>
      <input {...form.register("leader")} type="text" id="leader" name="leader" />
        {form.formState.errors.leader && <p className="text-red-500">{form.formState.errors.leader.message}</p>}
      <input type="submit" value="Submit" />
    </form>
  );
}
