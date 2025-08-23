import { FilePlusIcon, HouseIcon, UserIcon, UsersIcon, WineIcon } from "phosphor-react-native";

export const TAB_CONFIG = {
	index: {
		title: "News",
		icon: HouseIcon,
	},
	colleagues: {
		title: "Colleagues",
		icon: UsersIcon,
	},
	new: {
		title: "",
		icon: FilePlusIcon,
	},
	wines: {
		title: "Wines",
		icon: WineIcon,
	},
	user: {
		title: "Profile",
		icon: UserIcon,
	},
} as const;
