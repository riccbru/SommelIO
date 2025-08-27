import { z } from "zod";

const sweetnessOptions = ["dry", "medium_dry", "medium_sweet", "sweet", "excessively_sweet"];
const acidityOptions = ["scarcely_fresh", "quite_fresh", "fresh", "vibrant", "acidulous"];

const alcoholsOptions = ["lightly_warm", "medium_warm", "warm", "very_warm", "alcoholic"];
const tannicityOptions = ["scarcely_tannic", "quite_tannic", "tannic", "tenacious", "astringent"];

const softnessOptions = ["scarcely_soft", "quite_soft", "soft", "velvety", "mellow"];
const saltinessOptions = ["scarcely_tasty", "quite_tasty", "tasty", "savory", "salty"];

const effervesceOptions = ["", "delicate", "moderate", "lively", "exuberant", "vivid"];

const intensityOptions = ["quite_intense", "intense", "very_intense"];
const structureOptions = ["medium", "full", "vigorous"];
const balanceOptions = ["unbalanced", "quite_balanced", "balanced"];
const persistenceOptions = ["quite_persistent", "persistent", "very_persistent"];
const qualityOptions = ["acceptable", "good", "distinguished", "very_good", "excellent"];

const NewTasteExamSchema = z.object({
	sweetness: z.string().refine(val => sweetnessOptions.includes(val), {
		message: `Sweetness must be ${sweetnessOptions.join("/")}`,
	}),
	acidity: z.string().refine(val => acidityOptions.includes(val), {
		message: `Acidity must be ${acidityOptions.join("/")}`,
	}),
	alcohols: z.string().refine(val => alcoholsOptions.includes(val), {
		message: `Alcohols must be ${alcoholsOptions.join("/")}`,
	}),
	tannicity: z.string().refine(val => tannicityOptions.includes(val), {
		message: `Tannicity must be ${tannicityOptions.join("/")}`,
	}),
	softness: z.string().refine(val => softnessOptions.includes(val), {
		message: `Softness must be ${softnessOptions.join("/")}`,
	}),
	saltiness: z.string().refine(val => saltinessOptions.includes(val), {
		message: `Saltiness must be ${saltinessOptions.join("/")}`,
	}),
	effervescence: z
		.string()
		.refine(val => effervesceOptions.includes(val), {
			message: `Effervescence must be ${effervesceOptions.join("/")}`,
		})
		.optional(),
	intensity: z.string().refine(val => intensityOptions.includes(val), {
		message: `Intensity must be ${intensityOptions.join("/")}`,
	}),
	balance: z.string().refine(val => balanceOptions.includes(val), {
		message: `Balance must be ${balanceOptions.join("/")}`,
	}),
	structure: z.string().refine(val => structureOptions.includes(val), {
		message: `Structure must be ${structureOptions.join("/")}`,
	}),
	persistence: z.string().refine(val => persistenceOptions.includes(val), {
		message: `Persistence must be ${persistenceOptions.join("/")}`,
	}),
	quality: z.string().refine(val => qualityOptions.includes(val), {
		message: `Quality must be ${qualityOptions.join("/")}`,
	}),
	notes: z.string().optional(),
});

export { NewTasteExamSchema };
