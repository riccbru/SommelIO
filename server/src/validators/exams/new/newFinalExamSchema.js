import { z } from "zod";

const evolutionaryStateOptions = ["ready", "mature"];
const harmonyOptions = ["disharmonious", "quite_harmonious", "harmonious"];
const qualityOptions = ["acceptable", "good", "distinguished", "very_good", "excellent"];

const NewFinalExamSchema = z.object({
	evolutionary_state: z.string().refine(val => evolutionaryStateOptions.includes(val), {
		message: `Evolutionary State must be ${evolutionaryStateOptions.join("/")}`,
	}),
	harmony: z.string().refine(val => harmonyOptions.includes(val), {
		message: `Harmony must be ${harmonyOptions.join("/")}`,
	}),
	quality: z.string().refine(val => qualityOptions.includes(val), {
		message: `Quality must be ${qualityOptions.join("/")}`,
	}),
	pairings: z.string().optional(),
	notes: z.string().optional(),
});

export { NewFinalExamSchema };
