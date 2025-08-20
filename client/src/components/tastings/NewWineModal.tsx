import { XIcon } from "phosphor-react-native";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Modal, Portal, Text, TextInput, Divider, useTheme } from "react-native-paper";

type NewWine = {
	denomination: string;
	winemaker: string;
	vintage: string;
};

type TastingsListItem = {
	wine_denomination: string;
	winemaker: string;
	vintage: number;
};

type Props = {
	visible: boolean;
	onDismiss: () => void;
	newWine: NewWine;
	setNewWine: (wine: NewWine) => void;
	tastings: TastingsListItem[];
};

export default function NewWineModal({ visible, onDismiss, newWine, setNewWine, tastings }: Props) {
	const theme = useTheme();
	const { t } = useTranslation();

	const data: any[] = [];

	const styles = StyleSheet.create({
		modalContainer: {
			margin: 20,
			padding: 20,
			borderWidth: 2,
			borderRadius: 15,
			borderColor: theme.colors.primary,
			backgroundColor: theme.colors.card,
		},
		divider: {
			marginTop: 5,
			marginBottom: 20,
			backgroundColor: theme.colors.primary,
		},
	});

	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={onDismiss}
				contentContainerStyle={styles.modalContainer}
			>
				<TextInput
					mode='outlined'
					value={newWine.denomination}
					style={{ marginBottom: 5 }}
					label={t("new.tasting.denomination")}
					onChangeText={text => setNewWine({ ...newWine, denomination: text })}
				/>
				<TextInput
					mode='outlined'
					value={newWine.winemaker}
					style={{ marginBottom: 10 }}
					label={t("new.tasting.winemaker")}
					onChangeText={text => setNewWine({ ...newWine, winemaker: text })}
				/>
				<TextInput
					mode='outlined'
					keyboardType='numeric'
					value={newWine.vintage}
					style={{ marginBottom: 10 }}
					label={t("new.tasting.vintage")}
					onChangeText={text => setNewWine({ ...newWine, vintage: text })}
				/>

				<TouchableOpacity
					style={{
						height: 40,
						borderRadius: 15,
						backgroundColor: theme.colors.amber,
						marginBottom: 10,
						alignItems: "center",
						justifyContent: "center",
					}}
					onPress={() => console.log("Adding new wine to todrink list")}
				>
					<Text style={{ fontFamily: "Epilogue-Regular", fontSize: 20 }}>
						{t("new.add_wine")}
					</Text>
				</TouchableOpacity>

				<Divider bold style={styles.divider} />

				<ScrollView style={{ maxHeight: 300 }}>
					{data?.map((el, index) => (
						<View
							key={index}
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								marginVertical: 5,
							}}
						>
							<View style={{ flexDirection: "row", alignItems: "center", flexShrink: 1 }}>
								<Text style={{ fontFamily: "Epilogue-Bold", marginRight: 8 }}>
									{index + 1}.
								</Text>
								<Text style={{ fontFamily: "Epilogue-Regular", flexShrink: 1 }}>
									{el.wine_denomination} – {el.winemaker}
								</Text>
							</View>
							<TouchableOpacity
								activeOpacity={0.7}
								onPress={() => console.log(`deleting wine ${index + 1}`)}
							>
								<XIcon size={24} color={theme.colors.red} />
							</TouchableOpacity>
						</View>
					))}
				</ScrollView>
			</Modal>
		</Portal>
	);
}
