import { z } from "zod";

const intensityOptions = ["quite_intense", "intense", "very_intense"];
const complexityOptions = ["quite_complex", "complex", "ample"];
const qualityOptions = ["acceptable", "good", "distinguished", "really_good", "excellent"];

const NewOlfactoryExamSchema = z.object({
	intensity: z.string().refine(val => intensityOptions.includes(val), {
		message: `Intensity must be ${intensityOptions.join("/")}`,
	}),
	complexity: z.string().refine(val => complexityOptions.includes(val), {
		message: `Complexity must be ${complexityOptions.join("/")}`,
	}),
	quality: z.string().refine(val => qualityOptions.includes(val), {
		message: `Quality must be ${qualityOptions.join("/")}`,
	}),

	aromatic: z.boolean(),
	floral: z.boolean(),
	spicy: z.boolean(),
	varietal: z.boolean(),
	vegetal: z.boolean(),
	baking: z.boolean(),
	fruity: z.boolean(),
	fragrant: z.boolean(),
	empyreumatic: z.boolean(),

	notes: z.string().optional(),
});

export { NewOlfactoryExamSchema };
