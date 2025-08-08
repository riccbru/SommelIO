import { z } from "zod";

const colorFamilyOptions = ["yellow", "red", "rosé"];
const colorShadesOptions = {
    yellow: ["greenish_yellow", "straw_yellow", "golden_yellow", "amber"],
    red: ["purple_red", "ruby_red", "garnet", "orange_red"],
    rosé: ["soft_rosé", "cherry_red", "dark_rosé"],
};
const limpidityOptions = ["veiled", "quite_limpid", "limpid", "crystal_clear", "brilliant"];
const consistencyOptions = ["flowing", "scarcely_consistent", "quite_consistent", "consistent", "oily"];
const bubblesizeOptions = ["", "large", "quite_fine", "fine"];
const bubbleNumberOptions = ["", "very_few", "quite_numerous", "numerous"];
const bubblePersistenceOptions = ["", "fading", "quite_persistent", "persistent"];

const VisualExamSchema = z.object({
    color_family:
        z.string().refine(val => colorFamilyOptions.includes(val), {
            message: `Color family must be ${colorFamilyOptions.join("/")}`
        }),
    color_shade:
        z.string().min(1, "Color shade is required"),
    limpidity:
        z.string().refine(val => limpidityOptions.includes(val), {
            message: `Limpidity must be ${limpidityOptions.join("/")}`
        }),
    consistency:
        z.string().refine(val => consistencyOptions.includes(val), {
            message: `Consistency must be ${consistencyOptions.join("/")}`
        }),
    bubble_size:
        z.string().refine(val => bubblesizeOptions.includes(val), {
            message: `Bubble size must be ${bubblesizeOptions.join("/")}`
        }).optional(),
    bubble_number:
        z.string().refine(val => bubbleNumberOptions.includes(val), {
            message: `Bubble number must be ${bubbleNumberOptions.join("/")}`
        }).optional(),
    bubble_persistence:
        z.string().refine(val => bubblePersistenceOptions.includes(val), {
            message: `Bubble persistence must be ${bubblePersistenceOptions.join("/")}`
        }).optional(),
    notes:
        z.string().optional()
}).superRefine((val, ctx) => {
    const validShades = colorShadesOptions[val.color_family];
    if (!validShades.includes(val.color_shade)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Color shade '${val.color_shade}' is not valid for color family '${val.color_family}'`,
            path: ["color_shade"],
        });
    }
});

export { VisualExamSchema };
