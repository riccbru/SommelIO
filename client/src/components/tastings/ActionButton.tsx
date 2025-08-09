import { useState } from "react";
import { useRouter } from "expo-router";
import TastingsAPI from "@/src/services/tastings";
import { capitalizeFirst } from "@/src/utils/utils";
import { Button, useTheme } from "react-native-paper";
import { FileArrowDownIcon, TrashIcon } from "phosphor-react-native";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
    tid: string;
    name?: string;
    winemaker?: string;
    action: string;
}

export default function ActionButton({ tid, action, name, winemaker }: Props) {

    const theme = useTheme();
    const router = useRouter();
    const [modal, setModal] = useState(false);
    const Icon = action.toLowerCase() === 'delete' ? TrashIcon : FileArrowDownIcon;

    const showModal = () => setModal(true);
    const hideModal = () => setModal(false);

    const styles = StyleSheet.create({
        modalContainer: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
        },
        modalCard: {
            padding: 15,
            borderWidth: 3,
            borderRadius: 15,
            borderColor: theme.colors.amber,
            backgroundColor: theme.colors.background,
        },
    });

    const handleDelete = async () => {
        try {
            await TastingsAPI.deleteTasting(tid);
            hideModal();
            router.replace("/(tabs)/tastings");
        } catch (error: any) {
            console.log(`[ActionButton-delete]: ${error}`);
        }
    }

    const handlePress = async () => {
        if (action.toLowerCase() === "delete") {
            showModal();
        } else {
            console.log(`download tasting ${tid}`);
        }
    }

    return (
        <>
            <TouchableOpacity onPress={handlePress}>
                <View style={{ marginLeft: 10, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <Icon size={32} weight='bold' style={{ marginRight: 10, marginBottom: 20 }} color={theme.dark ? "#ffffff" : "#000000"} />
                    <Text style={{ fontSize: 20, fontWeight: "500", marginBottom: 20, color: theme.colors.text }}>
                        {capitalizeFirst(action)} tasting
                    </Text>
                </View>
            </TouchableOpacity>
            <Modal transparent={true} visible={modal} animationType="slide" onDismiss={hideModal}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalCard}>
                        <Text style={{ fontSize: 18, marginBottom: 20, color: theme.colors.text }}>
                            Are you sure you want to delete tasting {name} - {winemaker}?
                        </Text>
                        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                            <Button onPress={hideModal} mode="text" style={{ marginRight: 10 }}>
                                Cancel
                            </Button>
                            <Button onPress={handleDelete} mode="contained" buttonColor={theme.colors.red}>
                                Delete
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
        
    )
}