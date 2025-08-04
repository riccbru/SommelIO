import { useAuth } from '@/src/hooks/useAuth';
import { useRouter } from 'expo-router';
import { Button, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper';

interface UserModalProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserModal({ modal, setModal }: UserModalProps) {

    const theme = useTheme();
    const { user } = useAuth();
    const router = useRouter();
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
            borderColor: theme.colors.darkGreen,
            backgroundColor: theme.colors.green,
        },
        modalTitle: {
            fontSize: 18,
            fontWeight: "600",
            paddingBottom: 10
        },
        userTitleData: {
            fontSize: 18,
            color: theme.colors.text
        },
        userEntries: {
            fontSize: 14,
            fontWeight: "600",
        },
        userData: {
            fontSize: 14,
            color: theme.colors.text
        },
        buttonContainer: {
            flexDirection: "row",
            justifyContent: "flex-end",
        },
        button: {
            padding: 5,
            borderRadius: 10,
            backgroundColor: theme.colors.darkGreen
        },
        buttonText: {
            fontSize: 16,
            color: theme.colors.text
        }
    });

    const handlePress = async () => {
        setModal(false);
        router.replace("/login")
    }

    return (
        <Modal
            visible={modal}
            transparent={true}
            animationType="slide"
            onDismiss={() => setModal(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalCard}>
                    <Text style={styles.modalTitle}>
                        Welcome, <Text style={styles.userTitleData}>{user?.username}</Text>
                    </Text>
                    <Text style={styles.userEntries}>
                        UID: <Text style={styles.userData}>{user?.uid}</Text>
                    </Text>
                    <Text style={styles.userEntries}>
                        NAME: <Text style={styles.userData}>{user?.full_name}</Text>
                    </Text>
                    <Text style={styles.userEntries}>
                        EMAIL: <Text style={styles.userData}>{user?.email}</Text>
                    </Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handlePress}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
