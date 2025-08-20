import { ReactNode, useRef } from "react";
import { Animated, GestureResponderEvent, Pressable, StyleProp, ViewStyle } from "react-native";

type Props = {
	children: ReactNode;
	style?: StyleProp<ViewStyle>;
	onPress?: (event: GestureResponderEvent) => void;
};

export default function AnimatedTabButton({ children, onPress, style }: Props) {
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
			<Animated.View style={{ alignItems: "center", transform: [{ scale }] }}>
				{children}
			</Animated.View>
		</Pressable>
	);
}
