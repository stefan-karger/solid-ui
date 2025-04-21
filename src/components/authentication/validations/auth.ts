import type { Input } from "valibot";
import { email, object, string } from "valibot";

export const AuthSchema = object({
  email: string([email()]),
});
export type AuthForm = Input<typeof AuthSchema>;
