import { Text, View } from "react-native";
import { HelperText, SegmentedButtons, useTheme } from "react-native-paper";

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
			<View style={{ alignItems: "center" }}>
				<SegmentedButtons
					style={{ marginLeft: 2, marginRight: 2, padding: 3 }}
					value={value?.toString()}
					onValueChange={v => onChange(Number(v))}
					buttons={[
						{ value: "1", label: "1" },
						{ value: "2", label: "2" },
						{ value: "3", label: "3" },
						{ value: "4", label: "4" },
						{ value: "5", label: "5" },
					]}
				/>
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
