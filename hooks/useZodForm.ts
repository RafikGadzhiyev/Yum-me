// TODO: Finish
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";

// Type problems
export const useZodForm = <T>(zodSchema: ZodSchema<T>) => {
	const zodForm = useForm({
		resolver: zodResolver(zodSchema),
	});

	return zodForm;
};
