import { useState } from "react";
import { Icon } from "phosphor-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ConfirmButtonProps = {
  Icon: Icon;
  iconColor: string;
  bgColor: string;
  textColor: string;
  label: string;
  confirmLabel: string;
  onConfirm: () => void;
};

export default function ConfirmButton({
  Icon,
  iconColor,
  bgColor,
  textColor,
  label,
  confirmLabel,
  onConfirm,
}: ConfirmButtonProps) {
  const [confirm, setConfirm] = useState(false);

  const styles = StyleSheet.create({
    touchables: {
			width: 150,
			borderRadius: 15,
			paddingVertical: 10,
			paddingHorizontal: 15,
		},
		buttonsLayout: {
			alignItems: "center",
			flexDirection: "row",
			justifyContent: "center",
		},
		buttonsText: {
			fontSize: 18,
			marginTop: 3,
			marginLeft: 3,
			fontFamily: "Epilogue-Bold",
		}
  });

  const handlePress = () => {
    if (confirm) {
      onConfirm();
      setConfirm(false);
    } else {
      setConfirm(true);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={handlePress}
      style={[styles.touchables, { backgroundColor: bgColor }]}
    >
      <View style={styles.buttonsLayout}>
        <Icon size={28} weight="bold" color={iconColor} />
        <Text style={[styles.buttonsText, { color: textColor }]}>
          {confirm ? confirmLabel : label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
