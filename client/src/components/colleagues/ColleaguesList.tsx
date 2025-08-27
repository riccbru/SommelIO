import { useRouter } from "expo-router";
import { List } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { CaretRightIcon } from "phosphor-react-native";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

type Colleague = {
	status: string;
	created_at: string;
	rid: string;
	colleague: {
		premium: boolean;
		username: string;
		full_name: string;
		uid: string;
	};
};

type Props = {
	searchQuery: string;
	colleagues: Colleague[];
};

export default function ColleaguesList({ colleagues, searchQuery }: Props) {
	const theme = useTheme();
	const router = useRouter();
	const { t } = useTranslation();

	const styles = StyleSheet.create({
		emptyText: {
			fontSize: 16,
			marginTop: 50,
			textAlign: "center",
			color: theme.colors.primary,
			fontFamily: "Epilogue-Regular",
		},
		username: {
			fontSize: 20,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Bold",
		},
		fullname: {
			fontSize: 16,
			color: theme.colors.gray,
			fontFamily: "Epilogue-Regular",
		},
		image: {
			width: 45,
			height: 45,
			marginLeft: 15,
			borderWidth: 1,
			borderRadius: 30,
			borderColor: theme.colors.primary,
		},
	});

	const filteredColleagues = colleagues.filter(colleague => {
		const query = searchQuery.toLowerCase();
		return (
			colleague.colleague.username.toLowerCase().includes(query) ||
			colleague.colleague.full_name.toLowerCase().includes(query)
		);
	});

	if (!filteredColleagues.length) {
		return <Text style={styles.emptyText}>{t("wine_notFound")}</Text>;
	}

	const handlePress = (colleague: Colleague) => {
		router.push(`/colleagues/${colleague.colleague.uid}`);
	};

	return (
		<>
			{colleagues.map((relation, index) => (
				<TouchableOpacity key={index} activeOpacity={0.5} onPress={() => handlePress(relation)}>
					<List.Item
						title={<Text style={styles.username}>{relation.colleague.username}</Text>}
						description={<Text style={styles.fullname}>{relation.colleague.full_name}</Text>}
						left={props => <Image source={{ uri: "" }} style={styles.image} />}
						right={props => (
							<CaretRightIcon
								size={24}
								weight='regular'
								color={theme.colors.primary}
								style={{ marginTop: 13 }}
							/>
						)}
					/>
				</TouchableOpacity>
			))}
		</>
	);
}
