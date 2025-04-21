import type { InferInput } from "valibot";
import { email, object, pipe, string } from "valibot";

export const AuthSchema = object({
  email: pipe(string(), email()),
});
export type AuthForm = InferInput<typeof AuthSchema>;
