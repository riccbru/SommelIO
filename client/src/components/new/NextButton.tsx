import { View, Text } from "react-native";
import { LinkProps, useRouter } from "expo-router";
import { Button, useTheme } from "react-native-paper";
import { ArrowCircleRightIcon, CheckCircleIcon } from "phosphor-react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
    path: LinkProps["href"];
    text: string;
    validation: () => boolean;
    formData: any;
    action: (formData: any) => Promise<any>;
    requiresTid?: boolean;
}

export default function NextButton({ path, text, validation, formData, action, requiresTid }: Props) {

    const theme = useTheme();
    const router = useRouter();

    const handlePress = async () => {
        const isValid = validation();
        if (isValid) {
            try {
                if (!requiresTid) {
                    const response = await action(formData);
                    const newTid = response?.data?.tid;
                    if (newTid) await AsyncStorage.setItem('newTid', newTid);
                } else {
                    const tid = await AsyncStorage.getItem('newTid');
                    if (!tid) throw new Error('No tasting ID found');
                    await action(tid, formData);
                }
                if (text !== 'SAVE') {
                    router.push(path);
                } else {
                    router.replace("/(tabs)/new");
                    router.replace("/(tabs)/tastings");
                }
            } catch (error) {
                console.log(`NextButton: ${error}`);
            }
        }
    }
    return (
        <View style={{ alignItems: "center", backgroundColor: theme.colors.background }}>
            <Button
                mode='text'
                onPress={handlePress}
                style={{ width: 200, marginTop: 20, marginBottom: 20, backgroundColor: theme.colors.pearl }}
                >
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", color: "#000000" }}>{text}</Text>
                    {text === 'SAVE' ? (
                        <CheckCircleIcon size={24} style={{ marginLeft: 5 }} color={"#000000"} />
                    ) : (
                        <ArrowCircleRightIcon size={24} style={{ marginLeft: 5 }} color={"#000000"} />
                    )}
                </View>
            </Button>
        </View>
    );   
}
