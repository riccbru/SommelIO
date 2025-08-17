import en from "./en";
import fr from "./fr";
import it from "./it";

export const resources = {
	en: { translation: en },
	fr: { translation: fr },
	it: { translation: it },
} as const;

export type SupportedLanguages = keyof typeof resources;
