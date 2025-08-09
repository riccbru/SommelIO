import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CheckCircleIcon, NotePencilIcon, XCircleIcon } from 'phosphor-react-native';

type EditModeShape = {
  tasting: boolean;
  visual: boolean;
  olfactory: boolean;
  taste: boolean;
  final: boolean;
};

type Props = {
  uuid: string;
  name: keyof EditModeShape;
  subtitle: string;
  editMode: EditModeShape;
  setEditMode: React.Dispatch<React.SetStateAction<EditModeShape>>;
};

export default function TastingCard({ uuid, name, subtitle, editMode, setEditMode }: Props) {

    const theme = useTheme();

    const Icon = editMode[name] ? CheckCircleIcon : NotePencilIcon;

    const styles = StyleSheet.create({
        subtitleRow: {
            marginBottom: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        subtitle: {
            fontSize: 18,
            fontWeight: '600',
            color: "#000000",
        },
        text: {
            color: "#000000"
        }
    });

    const handlePress = () => {
        if (editMode[name]) console.log(`edit ${name}'s ${uuid}`);
        setEditMode(prev => ({
            ...prev,
            [name]: !prev[name],
        }));
    }

    return (
        <View style={styles.subtitleRow}>
            <Text style={styles.subtitle}>{subtitle}</Text>
            {editMode[name] && 
            <TouchableOpacity onPress={handlePress}>
                <XCircleIcon size={28} weight={"regular"} color={theme.colors.red} />
            </TouchableOpacity>
            }
            <TouchableOpacity onPress={handlePress}>
                <Icon size={28} weight={"regular"} color={!editMode[name] ? "#000000" : theme.colors.green} />
            </TouchableOpacity>
        </View>
    );
}
