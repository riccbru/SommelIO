import { useData } from "@/src/hooks/useData";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import ColleaguesAPI from "@/src/services/colleagues";
import { CheckCircleIcon, XCircleIcon } from "phosphor-react-native";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	RefreshControl,
	Image,
} from "react-native";

type Request = {
	username: string;
	created_at: string;
	rid: string;
	uid: string;
	image_url: string;
};

type Props = {
	requests: Request[];
};

export default function IncomingRequests({ requests }: Props) {
	const theme = useTheme();
	const { t } = useTranslation();
	const { loading, refreshColleagues, refreshRequests } = useData();
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			padding: 10,
			backgroundColor: theme.colors.background,
		},
		emptyText: {
			fontSize: 20,
			marginTop: 20,
			textAlign: "center",
			color: theme.colors.primary,
			fontFamily: "Epilogue-Regular",
		},
		requestItem: {
			padding: 10,
			width: "100%",
			borderRadius: 8,
			marginVertical: 5,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			backgroundColor: theme.colors.primary,
		},
		image: {
			width: 45,
			height: 45,
			marginLeft: 0,
			borderWidth: 1,
			borderRadius: 30,
			backgroundColor: theme.colors.gray,
			borderColor: theme.colors.background,
		},
		requestInfo: {
			flexDirection: "column",
			justifyContent: "flex-start",
		},
		username: {
			fontSize: 20,
			color: theme.colors.background,
			fontFamily: "Epilogue-Regular",
		},
		createdAt: {
			fontSize: 15,
			color: theme.colors.gray,
			fontFamily: "Epilogue-Bold",
		},
		requestActions: {
			gap: 10,
			flexDirection: "row",
		},
		iconButton: {
			padding: 8,
			marginLeft: 5,
			borderRadius: 6,
			alignItems: "center",
			justifyContent: "center",
		},
	});

	const handleRequest = async (rid: string, action: "accept" | "decline") => {
		try {
			await ColleaguesAPI[`${action}Request`](rid);
			refreshRequests();
			refreshColleagues();
		} catch (error: any) {
			console.log(error.message);
		}
	};

	if (!requests?.length) {
		return (
			<View style={styles.container}>
				<Text style={styles.emptyText}>{t("wine_notFound")}</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={requests}
			style={styles.container}
			keyExtractor={item => item.rid}
			refreshControl={
				<RefreshControl refreshing={loading.requests} onRefresh={refreshRequests} />
			}
			renderItem={({ item }) => (
				<View style={styles.requestItem}>
					<View style={styles.requestActions}>
						<Image style={styles.image} source={{ uri: item.image_url.replace(/\\/g, "") }} />
						<View style={styles.requestInfo}>
							<Text style={styles.username}>{item.username}</Text>
							<View style={{ height: 5 }} />
							<Text style={styles.createdAt}>
								{new Date(item.created_at).toLocaleString()}
							</Text>
						</View>
					</View>

					<View style={styles.requestActions}>
						<View style={styles.requestActions}>
							<TouchableOpacity
								activeOpacity={0.7}
								onPress={() => handleRequest(item.rid, "decline")}
								style={[styles.iconButton, { backgroundColor: theme.colors.red }]}
							>
								<XCircleIcon size={24} weight='bold' color={theme.colors.white} />
							</TouchableOpacity>
							<TouchableOpacity
								activeOpacity={0.7}
								onPress={() => handleRequest(item.rid, "accept")}
								style={[styles.iconButton, { backgroundColor: theme.colors.premium }]}
							>
								<CheckCircleIcon size={24} weight='bold' color={theme.colors.white} />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			)}
		/>
	);
}
