import { Redirect } from "expo-router";
import { useAuth } from "@/src/hooks/useAuth";
import LoadingSpinner from "@/src/components/LoadingSpinner";

export default function Index() {
	const { isLoggedIn, isReady } = useAuth();

	if (!isReady) {
		return <LoadingSpinner text='' />;
	}

	return <Redirect href={isLoggedIn ? "/(tabs)" : "/login"} />;
}
