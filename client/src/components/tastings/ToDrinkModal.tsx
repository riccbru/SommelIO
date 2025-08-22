import WinesAPI from "@/src/services/wines";
import { XIcon } from "phosphor-react-native";
import { useTranslation } from "react-i18next";
import { Divider, Modal, Portal, Text, useTheme } from "react-native-paper";
import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useData } from "@/src/hooks/useData";

type Props = {
	visible: boolean;
	wines: any[];
	onDismiss: () => void;
};

export default function ToDrinkModal({ visible, wines, onDismiss }: Props) {
	const theme = useTheme();
	const { t } = useTranslation();
	const { refreshWines } = useData();

	const styles = StyleSheet.create({
		modalContainer: {
			margin: 20,
			padding: 20,
			borderWidth: 2,
			height: 300,
			borderRadius: 15,
			borderColor: theme.colors.primary,
			backgroundColor: theme.colors.card,
		},
		winesView: {
			marginVertical: 5,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
		},
		title: {
			fontSize: 22,
			marginBottom: 16,
			textAlign: "center",
			fontFamily: "Epilogue-Bold",
		},
		divider: {
			marginTop: 0,
			marginBottom: 10,
			backgroundColor: theme.colors.primary,
		},
		text: {
			fontSize: 16,
			marginTop: 50,
			textAlign: "center",
			fontFamily: "Epilogue-Regular",
		},
	});

	const handleDismiss = () => {
		onDismiss();
	};

	const handleDelete = async (wid: string) => {
		try {
			await WinesAPI.deleteWine(wid);
			refreshWines();
		} catch (error) {
			console.error(`Delete failed: ${error}`);
		}
	};

	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={handleDismiss}
				contentContainerStyle={styles.modalContainer}
			>
				<Text style={styles.title}>ToDrink</Text>

				<Divider bold style={styles.divider} />

				<ScrollView
					style={{ maxHeight: 300 }}
					refreshControl={
						<RefreshControl refreshing={false} onRefresh={refreshWines} />
					}
				>
					{!wines.length ? (
						<Text style={styles.text}>{t("todrink_notFound")}</Text>
					) : (
						wines?.map((el, index) => (
							<View key={index} style={styles.winesView}>
								<View style={{ flexDirection: "row", alignItems: "center", flexShrink: 1 }}>
									<Text style={{ fontFamily: "Epilogue-Bold", marginRight: 8 }}>
										{index + 1}.
									</Text>
									<Text style={{ fontFamily: "Epilogue-Regular", flexShrink: 1 }}>
										{el.denomination} – {el.winemaker}, {el.vintage}
									</Text>
								</View>
								<TouchableOpacity activeOpacity={0.7} onPress={() => handleDelete(el.wid)}>
									<XIcon size={24} color={theme.colors.red} />
								</TouchableOpacity>
							</View>
						))
					)}
				</ScrollView>
			</Modal>
		</Portal>
	);
}
