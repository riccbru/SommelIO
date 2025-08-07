import React from "react";
import { Platform, Text, View } from "react-native";
import { Checkbox, useTheme } from "react-native-paper";

type Props<T> = {
  label: string;
  name: keyof T;
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
};

export default function FormCheckbox<T extends Record<string, any>>({ label, name, formData, setFormData }: Props<T>) {
    const theme = useTheme();
    const isChecked = !!formData[name];
    const toggle = () => setFormData((prev) => ({ ...prev, [name]: !prev[name] }));
    const CheckboxComponent = Platform.OS === "ios" ? Checkbox.IOS : Checkbox.Android;

    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 8,
                paddingHorizontal: 16,
            }}
        >
            <Text style={{ fontSize: 18, color: "#c9c4cf" }}>{label}</Text>
            <CheckboxComponent
                color={theme.colors.text}
                status={isChecked ? "checked" : "unchecked"}
                onPress={toggle}
            />
        </View>
    );
}
