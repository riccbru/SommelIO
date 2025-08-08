import { z } from "zod";

const evolutionaryStateOptions = ["immature", "young", "ready", "mature", "old"];
const harmonyOptions = ["disharmonious", "quite_harmonious", "harmonious"];

const FinalExamSchema = z.object({
    evolutionary_state:
        z.string().refine(val => evolutionaryStateOptions.includes(val), {
            message: `Evolutionary State must be ${evolutionaryStateOptions.join("/")}`
        }),
    harmony:
        z.string().refine(val => harmonyOptions.includes(val), {
            message: `Harmony must be ${harmonyOptions.join("/")}`
        }),
    pairings:
        z.string().optional(),
    notes:
        z.string().optional()
});

export { FinalExamSchema };
