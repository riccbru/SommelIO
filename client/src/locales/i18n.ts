import i18n from "i18next";
import { resources } from "./index";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
	lng: "en",
	resources,
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
