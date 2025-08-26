import { ReactNode, useRef } from "react";
import { Animated, GestureResponderEvent, Pressable, StyleProp, ViewStyle } from "react-native";

type Props = {
	children: ReactNode;
	style?: StyleProp<ViewStyle>;
	onPress?: (event: GestureResponderEvent) => void;
};

export default function AnimatedTabButton({ children, onPress, style }: Props) {
	const scale = useRef(new Animated.Value(1)).current;

	const handlePressOut = () => {
		Animated.sequence([
			Animated.timing(scale, {
				toValue: 1.15,
				duration: 225,
				useNativeDriver: true,
			}),
			Animated.timing(scale, {
				toValue: 1,
				duration: 200,
				useNativeDriver: true,
			})
		]).start();
	};

	return (
		<Pressable
			style={style}
			onPress={onPress}
			onPressOut={handlePressOut}
		>
			<Animated.View style={{ alignItems: "center", transform: [{ scale }] }}>
				{children}
			</Animated.View>
		</Pressable>
	);
}
