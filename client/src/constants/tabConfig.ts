import { FilePlusIcon, HouseIcon, UserIcon, UsersIcon, WineIcon } from "phosphor-react-native";

export const TAB_CONFIG = {
	home: {
		title: "tabs.home",
		icon: HouseIcon,
	},
	colleagues: {
		title: "tabs.colleagues",
		icon: UsersIcon,
	},
	new: {
		title: "tabs.new",
		icon: FilePlusIcon,
	},
	wines: {
		title: "tabs.wines",
		icon: WineIcon,
	},
	profile: {
		title: "tabs.profile",
		icon: UserIcon,
	},
} as const;
