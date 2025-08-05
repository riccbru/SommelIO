import { FilePlusIcon, HouseIcon, UserIcon, UsersIcon, WineIcon } from 'phosphor-react-native';

export const TAB_CONFIG = {
  index: {
    title: "News",
    icon: HouseIcon,
  },
  friends: {
    title: "Colleagues",
    icon: UsersIcon,
  },
  new: {
    title: "New tasting",
    icon: FilePlusIcon,
  },
  tastings: {
    title: "Tastings",
    icon: WineIcon,
  },
  user: {
    title: "Profile",
    icon: UserIcon,
  },
} as const;