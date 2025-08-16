import { useRef } from "react";
import { Animated, Pressable, Text } from "react-native";

export default function AnimatedTabButton({ children, onPress, style }) {
	const scale = useRef(new Animated.Value(1)).current;

	const handlePressIn = () => {
		Animated.spring(scale, {
			toValue: 0.9,
			useNativeDriver: true,
		}).start();
	};

	const handlePressOut = () => {
		Animated.spring(scale, {
			toValue: 1,
			friction: 3,
			tension: 40,
			useNativeDriver: true,
		}).start();
	};

	return (
		<Pressable
			style={style}
			onPress={onPress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
		>
			<Animated.View style={{ alignItems: "center", transform: [{ scale }] }}>{children}</Animated.View>
		</Pressable>
	);
}
