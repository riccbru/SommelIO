import Settings from "./Settings";
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
				snapPoints={["80%"]}
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
					<Settings />
				</BottomSheetView>
			</BottomSheet>
		</>
	);
}
