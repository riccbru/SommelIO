import { useState } from "react";
import { useRouter } from "expo-router";
import { ActivityIndicator, Button } from "react-native-paper";
import { useData } from "@/src/hooks/useData";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import TastingsAPI from "@/src/services/tastings";
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
	const { refreshStats, refreshTastings } = useData();
	const Icon = action.toLowerCase() === "delete" ? TrashIcon : FilePdfIcon;
	const [loading, setLoading] = useState({ download: false, delete: false });

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
			backgroundColor: theme.colors.card,
		},
	});

	const handlePress = async () => {
		if (action.toLowerCase() === "delete") {
			showModal();
		} else {
			handleDownload();
		}
	};

	const handleDownload = async () => {
		try {
			setLoading({ download: true, delete: false });
			await new Promise(resolve => setTimeout(resolve, 2000));
			console.log(`download tasting ${tid}`);
		} catch (error: any) {
			console.log(`[ActionButton-download]: ${error}`);
		} finally {
			setLoading({ download: false, delete: false });
		}
	};

	const handleDelete = async () => {
		try {
			setLoading({ download: false, delete: true });
			await TastingsAPI.deleteTasting(tid);
			hideModal();
			refreshStats();
			refreshTastings();
			router.back();
		} catch (error: any) {
			console.log(`[ActionButton-delete]: ${error}`);
		} finally {
			setLoading({ download: false, delete: false });
		}
	};

	return (
		<>
			<TouchableOpacity activeOpacity={0.5} disabled={loading.download} onPress={handlePress}>
				<View
					style={{
						marginLeft: 10,
						alignItems: "center",
						flexDirection: "row",
						justifyContent: "flex-start",
					}}
				>
					{loading.download ? (
						<ActivityIndicator
							animating
							size={32}
							color={theme.colors.premium}
							style={{ marginRight: 10 }}
						/>
					) : (
						<Icon
							size={32}
							weight='bold'
							style={{ marginRight: 10 }}
							color={action === "delete" ? theme.colors.red : theme.colors.premium}
						/>
					)}
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
						<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
							<Button
								mode='contained'
								onPress={hideModal}
								buttonColor={theme.colors.primary}
								style={{ width: 120, marginLeft: 20 }}
							>
								<Text
									style={{
										color: theme.colors.background,
										fontFamily: "Epilogue-Regular",
									}}
								>
									{t("tastings.cancel")}
								</Text>
							</Button>
							<View style={{ width: 30 }} />
							<Button
								mode='contained'
								onPress={handleDelete}
								disabled={loading.delete}
								buttonColor={theme.colors.red}
								style={{ width: 120, marginRight: 20 }}
							>
								{loading.delete ? (
									<ActivityIndicator size={18} animating color={theme.colors.white} />
								) : (
									<Text
										style={{ color: theme.colors.white, fontFamily: "Epilogue-Regular" }}
									>
										{t("tastings.delete_confirm")}
									</Text>
								)}
							</Button>
						</View>
					</View>
				</View>
			</Modal>
		</>
	);
}
