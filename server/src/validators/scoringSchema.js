import { z } from "zod";

const ScoringSchema = z
	.object({
		visual_appearance: z
			.number({ required_error: "Visual appearance is required" })
			.int({ message: "Visual appearance must be an integer" })
			.min(1, { message: "Visual appearance must be at least 1" })
			.max(5, { message: "Visual appearance cannot exceed 5" }),

		visual_color: z
			.number({ required_error: "Visual color is required" })
			.int({ message: "Visual color must be an integer" })
			.min(1, { message: "Visual color must be at least 1" })
			.max(5, { message: "Visual color cannot exceed 5" }),

		olfactory_intensity: z
			.number({ required_error: "Olfactory intensity is required" })
			.int({ message: "Olfactory intensity must be an integer" })
			.min(1, { message: "Olfactory intensity must be at least 1" })
			.max(5, { message: "Olfactory intensity cannot exceed 5" }),

		olfactory_complexity: z
			.number({ required_error: "Olfactory complexity is required" })
			.int({ message: "Olfactory complexity must be an integer" })
			.min(1, { message: "Olfactory complexity must be at least 1" })
			.max(5, { message: "Olfactory complexity cannot exceed 5" }),

		olfactory_quality: z
			.number({ required_error: "Olfactory quality is required" })
			.int({ message: "Olfactory quality must be an integer" })
			.min(1, { message: "Olfactory quality must be at least 1" })
			.max(5, { message: "Olfactory quality cannot exceed 5" }),

		taste_structure: z
			.number({ required_error: "Taste structure is required" })
			.int({ message: "Taste structure must be an integer" })
			.min(1, { message: "Taste structure must be at least 1" })
			.max(5, { message: "Taste structure cannot exceed 5" }),

		taste_balance: z
			.number({ required_error: "Taste balance is required" })
			.int({ message: "Taste balance must be an integer" })
			.min(1, { message: "Taste balance must be at least 1" })
			.max(5, { message: "Taste balance cannot exceed 5" }),

		taste_intensity: z
			.number({ required_error: "Taste intensity is required" })
			.int({ message: "Taste intensity must be an integer" })
			.min(1, { message: "Taste intensity must be at least 1" })
			.max(5, { message: "Taste intensity cannot exceed 5" }),

		taste_persistence: z
			.number({ required_error: "Taste persistence is required" })
			.int({ message: "Taste persistence must be an integer" })
			.min(1, { message: "Taste persistence must be at least 1" })
			.max(5, { message: "Taste persistence cannot exceed 5" }),

		taste_quality: z
			.number({ required_error: "Taste quality is required" })
			.int({ message: "Taste quality must be an integer" })
			.min(1, { message: "Taste quality must be at least 1" })
			.max(5, { message: "Taste quality cannot exceed 5" }),

		harmony: z
			.number({ required_error: "Harmony is required" })
			.int({ message: "Harmony must be an integer" })
			.min(1, { message: "Harmony must be at least 1" })
			.max(5, { message: "Harmony cannot exceed 5" }),

		notes: z.string().optional(),
	})
	.superRefine((data, ctx) => {
		Object.entries(data).forEach(([key, value]) => {
			if (value === undefined || value === null) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `${key} is required`,
					path: [key],
				});
			}
		});
	});

export { ScoringSchema };
