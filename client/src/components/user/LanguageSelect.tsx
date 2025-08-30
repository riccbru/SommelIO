import { useState } from "react";
import { useTheme } from "@/src/hooks/useTheme";
import { Text, Card } from "react-native-paper";
import { CaretDownIcon, CaretUpIcon } from "phosphor-react-native";
import { View, TouchableOpacity, Modal, FlatList, StyleSheet } from "react-native";

type Language = "it" | "fr" | "en";

type LanguageOption = {
	code: string;
	flag: string;
	name: string;
};

type Props = {
	value: string;
	languages: LanguageOption[];
	onChange: (language: Language) => void;
};

export default function LanguageSelect({ value, languages, onChange }: Props) {
	const theme = useTheme();
	const [isOpen, setIsOpen] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	const selectedLanguage = languages.find(lang => lang.code === value);
	const ArrowIcon = isOpen ? CaretUpIcon : CaretDownIcon;

	const styles = StyleSheet.create({
		container: {
			minWidth: 120,
			borderRadius: 8,
			paddingVertical: 12,
			flexDirection: "row",
			alignItems: "center",
			paddingHorizontal: 12,
		},
		selectedContent: {
			flex: 1,
			paddingRight: 6,
			flexDirection: "row",
			alignItems: "center",
		},
		flag: {
            marginTop: 1,
			fontSize: 24,
			marginRight: 10,
		},
		selectedText: {
			flex: 1,
			fontSize: 18,
            marginTop: 3,
			fontFamily: "Epilogue-Regular",
		},
		arrow: {
			alignSelf: "center",
		},
		modalOverlay: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: "rgba(0,0,0,0.3)",
		},
		modalContent: {
			width: "80%",
			maxWidth: 300,
		},
		dropdownCard: {
			elevation: 8,
			maxHeight: 250,
			borderWidth: 2,
			shadowRadius: 8,
			shadowOpacity: 0.25,
			shadowColor: theme.colors.black,
			borderColor: theme.colors.primary,
			shadowOffset: { width: 0, height: 2 },
		},
        option: {
			padding: 16,
			alignItems: "center",
			flexDirection: "row",
			borderBottomWidth: 1,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
		},
		lastOption: {
			borderBottomWidth: 0,
		},
		optionFlag: {
			fontSize: 30,
			marginRight: 12,
		},
		optionText: {
			fontSize: 16,
			fontFamily: "Epilogue-Regular",
		},
	});

	return (
		<View>
			<TouchableOpacity
				activeOpacity={0.7}
				onPress={() => {
					setIsOpen(true);
					setIsFocused(true);
				}}
				onBlur={() => setIsFocused(false)}
				style={[
					styles.container,
					{
						borderColor: isFocused || isOpen ? theme.colors.primary : theme.colors.gray,
						borderWidth: 1,
						backgroundColor: theme.colors.surface,
					},
				]}
			>
				<View style={styles.selectedContent}>
					<Text style={styles.flag}>{selectedLanguage.flag}</Text>
					<Text 
						style={[styles.selectedText, { color: theme.colors.primary }]}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						{selectedLanguage.code.toUpperCase()}
					</Text>
				</View>

				<View style={styles.arrow}>
					<ArrowIcon size={24} weight="bold" color={theme.colors.gray} />
				</View>
			</TouchableOpacity>

			{/* Dropdown Modal */}
			<Modal
				transparent
				visible={isOpen}
				animationType='fade'
				onRequestClose={() => {
					setIsOpen(false);
					setIsFocused(false);
				}}
			>
				<TouchableOpacity
					activeOpacity={0.7}
					style={styles.modalOverlay}
					onPress={() => {
						setIsOpen(false);
						setIsFocused(false);
					}}
				>
					<View style={styles.modalContent}>
						<Card style={[styles.dropdownCard, { backgroundColor: theme.colors.surface }]}>
							<FlatList
								data={languages}
								keyExtractor={item => item.code}
								showsVerticalScrollIndicator={false}
								renderItem={({ item, index }) => (
									<TouchableOpacity
										activeOpacity={0.7}
										style={[
											styles.option,
											{ borderBottomColor: theme.colors.pearl },
											index === languages.length - 1 && styles.lastOption,
											value === item.code && {
												backgroundColor: theme.colors.pearl,
											},
										]}
										onPress={() => {
											onChange(item.code);
											setIsOpen(false);
											setIsFocused(false);
										}}
									>
										<Text style={styles.optionFlag}>{item.flag}</Text>
										<Text
											style={[
												styles.optionText,
												value === item.code && { fontWeight: "600" },
												{
													color:
														value === item.code
															? theme.colors.black
															: theme.colors.primary,
												},
											]}
										>
											{item.name}
										</Text>
									</TouchableOpacity>
								)}
							/>
						</Card>
					</View>
				</TouchableOpacity>
			</Modal>
		</View>
	);
}