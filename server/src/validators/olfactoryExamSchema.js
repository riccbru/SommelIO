import { z } from "zod";

const intensityOptions = ["lacking", "scarcely_intense", "quite_intense", "intense", "very_intense"];
const complexityOptions = ["lacking", "scarcely_complex", "quite_complex", "complex", "ample"];
const qualityOptions = ["coarse", "scarcely_fine", "quite_fine", "fine", "excellent"];

const OlfactoryExamSchema = z.object({
    intensity:
        z.string().refine(val => intensityOptions.includes(val), {
            message: `Intensity must be ${intensityOptions.join("/")}`
        }),
    complexity:
        z.string().refine(val => complexityOptions.includes(val), {
            message: `Complexity must be ${complexityOptions.join("/")}`
        }),
    quality:
        z.string().refine(val => qualityOptions.includes(val), {
            message: `Quality must be ${qualityOptions.join("/")}`
        }),
    aromatic: z.boolean(),
    vinous: z.boolean(),
    floral: z.boolean(),
    fruity: z.boolean(),
    grassy: z.boolean(),
    mineral: z.boolean(),
    fragrant: z.boolean(),
    spicy: z.boolean(),
    toasted: z.boolean(),
    ethereal: z.boolean(),
    notes:
        z.string().optional()
});

export { OlfactoryExamSchema };
