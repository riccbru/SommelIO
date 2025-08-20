import { z } from "zod";

const WineSchema = z.object({
	denomination: z
		.string({
			required_error: "Wine denomination is required",
			invalid_type_error: "Wine denomination must be a string",
		})
		.min(1, "Wine denomination is required"),
	winemaker: z
		.string({
			required_error: "Winemaker is required",
			invalid_type_error: "Winemaker must be a string",
		})
		.min(1, "Winemaker is required"),
	vintage: z
		.number({
			required_error: "Vintage is required",
			invalid_type_error: "Vintage must be a number",
		})
		.int()
		.gte(1000, "Vintage must be a 4-digit number")
		.lte(2025, "Vintage must be a 4-digit number"),
});

export { WineSchema };
