import { z } from "zod";

const sweetnessOptions = ["dry", "medium_dry", "medium_sweet", "sweet", "excessively_sweet"];
const alcoholsOptions = ["light", "lightly_warm", "medium_warm", "warm", "alcoholic"];
const softnessOptions = ["sharp", "scarcely_soft", "quite_soft", "soft", "velvety"];
const acidityOptions = ["flat", "scarcely_fresh", "quite_fresh", "fresh", "acidulous"];
const tannicityOptions = ["flabby", "scarcely_tannic", "quite_tannic", "tannic", "astringent"];
const saltinessOptions = ["tasteless", "scarcely_tasty", "quite_tasty", "tasty", "salty"];
const balanceOptions = ["unbalanced", "quite_balanced", "balanced"];
const intensityOptions = ["lacking", "scarcely_intense", "quite_intense", "intense", "very_intense"];
const persistenceOptions = ["short", "scarcely_persistent", "quite_persistent", "persistent", "very_persistent"];
const qualityOptions = ["coarse", "scarcely_fine", "quite_fine", "fine", "excellent"];
const structureOptions = ["thin", "weak", "full", "vigorous", "heavy"];

const TasteExamSchema = z.object({
    sweetness:
        z.string().refine(val => sweetnessOptions.includes(val), {
            message: `Sweetness must be ${sweetnessOptions.join("/")}`
        }),
    alcohols:
        z.string().refine(val => alcoholsOptions.includes(val), {
            message: `Alcohols must be ${alcoholsOptions.join("/")}`
        }),
    softness:
        z.string().refine(val => softnessOptions.includes(val), {
            message: `Softness must be ${softnessOptions.join("/")}`
        }),
    acidity:
        z.string().refine(val => acidityOptions.includes(val), {
            message: `Acidity must be ${acidityOptions.join("/")}`
        }),
    tannicity:
        z.string().refine(val => tannicityOptions.includes(val), {
            message: `Tannicity must be ${tannicityOptions.join("/")}`
        }),
    saltiness:
        z.string().refine(val => saltinessOptions.includes(val), {
            message: `Saltiness must be ${saltinessOptions.join("/")}`
        }),
    balance:
        z.string().refine(val => balanceOptions.includes(val), {
            message: `Balance must be ${balanceOptions.join("/")}`
        }),
    intensity:
        z.string().refine(val => intensityOptions.includes(val), {
            message: `Intensity must be ${intensityOptions.join("/")}`
        }),
    persistence:
        z.string().refine(val => persistenceOptions.includes(val), {
            message: `Persistence must be ${persistenceOptions.join("/")}`
        }),
    quality:
        z.string().refine(val => qualityOptions.includes(val), {
            message: `Quality must be ${qualityOptions.join("/")}`
        }),
    structure:
        z.string().refine(val => structureOptions.includes(val), {
            message: `Structure must be ${structureOptions.join("/")}`
        }),
    notes:
        z.string().optional()
});

export { TasteExamSchema };
