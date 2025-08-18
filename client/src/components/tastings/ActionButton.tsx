import { useState } from "react";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import TastingsAPI from "@/src/services/tastings";
import { Button, useTheme } from "react-native-paper";
import { FilePdfIcon, TrashIcon } from "phosphor-react-native";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
	tid: string;
	name?: string;
	winemaker?: string;
	action: string;
};

export default function ActionButton({ tid, action, name, winemaker }: Props) {
	const theme = useTheme();
	const router = useRouter();
	const { t } = useTranslation();
	const [modal, setModal] = useState(false);
	const Icon = action.toLowerCase() === "delete" ? TrashIcon : FilePdfIcon;

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
			borderColor: theme.colors.red,
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
	};

	const handlePress = async () => {
		if (action.toLowerCase() === "delete") {
			showModal();
		} else {
			console.log(`download tasting ${tid}`);
		}
	};

	return (
		<>
			<TouchableOpacity onPress={handlePress}>
				<View
					style={{
						marginLeft: 10,
						alignItems: "center",
						flexDirection: "row",
						justifyContent: "flex-start",
					}}
				>
					<Icon
						size={32}
						weight='bold'
						style={{ marginRight: 10 }}
						color={theme.dark ? "#ffffff" : "#000000"}
					/>
					<Text
						style={{
							fontSize: 20,
							color: theme.colors.primary,
							fontFamily: "Epilogue-Regular",
						}}
					>
						{t(`tastings.${action}`)}
					</Text>
				</View>
			</TouchableOpacity>
			<Modal transparent={true} visible={modal} animationType='fade' onDismiss={hideModal}>
				<View style={styles.modalContainer}>
					<View style={styles.modalCard}>
						<Text
							style={{
								fontSize: 18,
								marginBottom: 20,
								fontFamily: "Epilogue-Regular",
								color: theme.colors.primary,
							}}
						>
							{t("tastings.confirm_mex")}
							{"\n"}
							{name} - {winemaker}?
						</Text>
						<View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
							<Button onPress={hideModal} mode='text' style={{ marginRight: 10 }}>
								<Text style={{ fontFamily: "Epilogue-Regular" }}>
									{t("tastings.cancel")}
								</Text>
							</Button>
							<Button onPress={handleDelete} mode='contained' buttonColor={theme.colors.red}>
								<Text style={{ fontFamily: "Epilogue-Regular" }}>
									{t("tastings.delete_confirm")}
								</Text>
							</Button>
						</View>
					</View>
				</View>
			</Modal>
		</>
	);
}
