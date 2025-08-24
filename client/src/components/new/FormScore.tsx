import { useTheme } from "@/src/hooks/useTheme";
import { HelperText } from "react-native-paper";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
	label: string;
	value: number;
	error: string;
	onChange: (value: number) => void;
};

export default function FormScore({ label, value, error, onChange }: Props) {
	const theme = useTheme();

	return (
		<View>
			<Text
				style={{
					marginBottom: 10,
					color: theme.colors.primary,
					fontFamily: "Epilogue-Regular",
				}}
			>
				{label}
			</Text>
			<View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
				{[1, 2, 3, 4, 5].map(num => (
					<TouchableOpacity
						key={num}
						onPress={() => onChange(num)}
						style={{
							width: 45, 
							height: 45,
							padding: 10,
							borderWidth: 2, 
							borderRadius: 6,
							marginHorizontal: 3,
							borderColor: theme.colors.gray,
							backgroundColor: value === num ? theme.colors.primary : theme.colors.surface,
						}}
					>
						<Text
							style={{
								fontSize: 18,
								alignSelf: "center",
								color: value === num ? theme.colors.onPrimary : theme.colors.primary,
							}}
						>
							{num}
						</Text>
					</TouchableOpacity>
				))}
			</View>
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
