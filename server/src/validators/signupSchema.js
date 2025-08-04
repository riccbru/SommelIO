import { z } from "zod";

const SignupSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  birthdate:
    z.string()
      .min(1, "Birthdate is required")
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Birthdate must be in YYYY-MM-DD format")
      .refine(
        (dateStr) => {
          const date = new Date(dateStr);
          return(
            !isNaN(date.getTime()) &&
            dateStr === date.toISOString().split('T')[0]
          )
        }, {
          "error": "Birthdate is invalid"
        }
      ),
  password: z.string().min(1, "Password is required"),
});

export { SignupSchema };
