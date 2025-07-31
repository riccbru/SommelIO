import { FilePlus, House, User, Users, Wine } from 'phosphor-react-native';

// sabbia: #d3d5cb
// giallo: #b58638

export const TAB_CONFIG = {
  index: {
    title: "AIS",
    icon: House,
  },
  friends: {
    title: "Colleghi AIS",
    icon: Users,
  },
  new: {
    title: "Nuova degustazione",
    icon: FilePlus,
  },
  tastings: {
    title: "Degustazioni",
    icon: Wine,
  },
  user: {
    title: "Profilo",
    icon: User,
  },
} as const;