import en from "./en";
import fr from "./fr";
import it from "./it";

export const resources = {
	en: { translation: en },
	it: { translation: it },
	fr: { translation: fr },
} as const;

export type SupportedLanguages = keyof typeof resources;
