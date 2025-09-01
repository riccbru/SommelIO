import { FilePlusIcon, HouseIcon, UserIcon, UsersIcon, WineIcon } from "phosphor-react-native";

export const TAB_CONFIG = {
	index: {
		title: "tabs.index",
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
	user: {
		title: "tabs.profile",
		icon: UserIcon,
	},
} as const;
