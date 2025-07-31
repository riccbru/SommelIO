import { FilePlusIcon, HouseIcon, UserIcon, UsersIcon, WineIcon } from 'phosphor-react-native';

export const TAB_CONFIG = {
  index: {
    title: "News AIS",
    icon: HouseIcon,
  },
  friends: {
    title: "Colleghi AIS",
    icon: UsersIcon,
  },
  new: {
    title: "Nuova degustazione",
    icon: FilePlusIcon,
  },
  tastings: {
    title: "Degustazioni",
    icon: WineIcon,
  },
  user: {
    title: "Profilo",
    icon: UserIcon,
  },
} as const;