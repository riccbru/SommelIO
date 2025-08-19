import { useState } from "react";
import { CaretDownIcon, CaretUpIcon } from "phosphor-react-native";
import { HelperText, Text, Card, useTheme } from "react-native-paper";
import { View, TouchableOpacity, Modal, FlatList, StyleSheet } from "react-native";
import { formatOption } from "@/src/utils/utils";
import { useTranslation } from "react-i18next";

type Props<T> = {
	label: string;
	field: keyof T;
	value: string;
	error?: string;
	options: string[];
	onChange: (field: keyof T, value: string) => void;
	i18nPath?: string;
};

export default function FormSelect<T>({
	label,
	field,
	value,
	error,
	options,
	onChange,
	i18nPath,
}: Props<T>) {
	const theme = useTheme();
	const { t } = useTranslation();
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
			shadowColor: "#000000",
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
							fontFamily: "Epilogue-Regular",
							top: shouldFloatLabel ? -8 : 16,
							fontSize: shouldFloatLabel ? 12 : 16,
							paddingHorizontal: shouldFloatLabel ? 4 : 0,
							color: error ? theme.colors.error : theme.dark ? "#c9c4cf" : "#565656",
							backgroundColor: shouldFloatLabel ? theme.colors.surface : "transparent",
						},
					]}
				>
					{label}
				</Text>

				{/* Selected Value */}
				{hasValue && (
					<Text style={[styles.selectedText, { color: theme.colors.primary }]}>
						{/* {formatOption(value)} */}
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
				visible={isOpen}
				transparent
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
												{ color: value === item ? "#000000" : theme.colors.primary },
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
		</View>
	);
}
