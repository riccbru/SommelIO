import Settings from "./Settings";
import { Text, View } from "react-native";
import { useTheme } from "@/src/hooks/useTheme";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";

type Props = {
	bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
};

export default function SettingsBottomSheet({ bottomSheetRef }: Props) {
	const theme = useTheme();

	return (
		<>
			<BottomSheet
				index={-1}
				snapPoints={["85%"]}
				ref={bottomSheetRef}
				enablePanDownToClose={true}
				backgroundStyle={{ backgroundColor: theme.colors.background }}
				handleIndicatorStyle={{ backgroundColor: theme.colors.primary }}
				backdropComponent={props => (
					<BottomSheetBackdrop
						{...props}
						opacity={0.7}
						appearsOnIndex={0}
						disappearsOnIndex={-1}
					/>
				)}
			>
				<BottomSheetView style={{ paddingHorizontal: 15 }}>
					<View style={{ alignItems: "center", marginTop: 10, marginBottom: 10 }}>
						<Text
							style={{
								fontSize: 18,
								color: theme.colors.primary,
								fontFamily: "Epilogue-Bold",
							}}
						>
							Settings
						</Text>
					</View>
					<Settings />
				</BottomSheetView>
			</BottomSheet>
		</>
	);
}
