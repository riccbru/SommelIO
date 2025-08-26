import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { capitalizeFirst, formatOption } from "@/src/utils/utils";
import { HelperText, Text, Card } from "react-native-paper";
import { CaretDownIcon, CaretUpIcon, InfoIcon } from "phosphor-react-native";
import { View, TouchableOpacity, Modal, FlatList, StyleSheet } from "react-native";

type Props<T> = {
	label: string;
	field: keyof T;
	value: string;
	description?: string;
	error?: string;
	options: string[];
	onChange: (field: keyof T, value: string) => void;
	i18nPath?: string;
};

export default function FormSelect<T>({
	label,
	field,
	value,
	description,
	error,
	options,
	onChange,
	i18nPath,
}: Props<T>) {
	const theme = useTheme();
	const { t } = useTranslation();
	const [modal, setModal] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	const hasValue = value && value.trim() !== "";
	const shouldFloatLabel = hasValue || isFocused;
	const ArrowIcon = isOpen ? CaretUpIcon : CaretDownIcon;

	const styles = StyleSheet.create({
		container: {
			height: 52,
			borderRadius: 4,
			position: "relative",
			paddingHorizontal: 14,
			justifyContent: "center",
		},
		label: {
			left: 14,
			fontWeight: "400",
			position: "absolute",
		},
		selectedText: {
			fontSize: 16,
			paddingTop: 8,
			fontFamily: "Epilogue-Regular",
		},
		arrow: {
			right: 14,
			fontSize: 12,
			fontWeight: "bold",
			position: "absolute",
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
			borderBottomWidth: 1,
		},
		lastOption: {
			borderBottomWidth: 0,
		},
		optionText: {
			fontSize: 16,
			fontFamily: "Epilogue-Regular",
		},
		modalDescription: {
			width: "80%",
			maxWidth: 300,
			borderWidth: 3,
			borderRadius: 15,
			borderColor: theme.colors.amber,
		},
		modalDescrOverlay: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: "rgba(0,0,0,0.7)",
		}
	});

	return (
		<View>

				<View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
				{description ? (
					<TouchableOpacity onPress={() => setModal(true)} style={{ marginLeft: 6, marginBottom: 5, flexDirection: "row" }}>
						<InfoIcon size={18} color={theme.colors.primary} />
						<Text style={{
							fontSize: 14,
							marginTop: 3,
							marginLeft: 5,
							fontFamily: "Epilogue-Bold",
							color: error ? theme.colors.error : theme.colors.primary
						}}>
							{label}
						</Text>
					</TouchableOpacity>
				) : (
					<Text style={{
						marginTop: 3,
						marginLeft: 5,
						fontFamily: "Epilogue-Bold",
						fontSize: 14,
						color: error ? theme.colors.error : theme.colors.primary
					}}>
						{label}
					</Text>
				)}
				</View>

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
						borderColor: error
							? theme.colors.error
							: isFocused || isOpen
								? theme.colors.primary
								: theme.colors.gray,
						borderWidth: error ? 2 : 1,
						backgroundColor: theme.colors.surface,
					},
				]}
			>
				{/* Floating Label */}
				<Text
					style={[
						styles.label,
						{
							fontSize: hasValue ? 0 : 16,
							color: error ? theme.colors.error : theme.dark ? "#c9c4cf" : "#565656",
						},
					]}
				>
					{t("no_formSelect")}
				</Text>

				{/* Selected Value */}
				{hasValue && (
					<Text style={[styles.selectedText, { marginBottom: 5, color: theme.colors.primary }]}>
						{formatOption(t(`${i18nPath}.${value}`))}
					</Text>
				)}

				{/* Dropdown Arrow */}
				<View style={styles.arrow}>
					<ArrowIcon size={16} color={error ? theme.colors.error : theme.colors.gray} />
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
								data={options}
								keyExtractor={item => item}
								showsVerticalScrollIndicator={false}
								renderItem={({ item, index }) => (
									<TouchableOpacity
										activeOpacity={0.7}
										style={[
											styles.option,
											{ borderBottomColor: theme.colors.pearl },
											index === options.length - 1 && styles.lastOption,
											value === item && {
												backgroundColor: theme.colors.pearl,
											},
										]}
										onPress={() => {
											onChange(field, item);
											setIsOpen(false);
											setIsFocused(false);
										}}
									>
										<Text
											style={[
												styles.optionText,
												value === item && { fontWeight: "600" },
												{ color: value === item ? theme.colors.black : theme.colors.primary },
											]}
										>
											{formatOption(t(`${i18nPath}.${item}`))}
										</Text>
									</TouchableOpacity>
								)}
							/>
						</Card>
					</View>
				</TouchableOpacity>
			</Modal>

			<HelperText
				type='error'
				visible={!!error}
				theme={theme.colors.red}
				style={{ fontFamily: "Epilogue-Bold" }}
			>
				{error}
			</HelperText>

			{description && <Modal
				transparent
				visible={modal}
				animationType="fade"
				onRequestClose={() => setModal(false)}
			>
				<TouchableOpacity
					activeOpacity={1}
					style={styles.modalDescrOverlay}
					onPressOut={() => setModal(false)}
				>
					<View style={[styles.modalDescription, { backgroundColor: theme.colors.surface, padding: 20, borderRadius: 8 }]}>
						<Text style={{ fontSize: 20, fontFamily: "Epilogue-Bold", color: theme.colors.primary, marginBottom: 5 }}>
							{!hasValue ? label : capitalizeFirst(t(`${i18nPath}.${value}`))}
						</Text>
						<Text style={{ fontSize: 16, fontFamily: "Epilogue-Regular", color: theme.colors.primary }}>
							{description}
						</Text>
					</View>
				</TouchableOpacity>
			</Modal>}
		</View>
	);
}
