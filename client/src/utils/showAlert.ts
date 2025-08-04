import { Alert } from "react-native";

type AlertOptions = {
  title: string;
  message: string;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
};

export function showAlert({
  title = "Alert",
  message,
  cancelText = "Cancel",
  confirmText = "OK",
  onCancel,
  onConfirm,
}: AlertOptions): void {
  Alert.alert(
    title,
    message,
    [
      {
        text: cancelText,
        style: "cancel",
        onPress: onCancel,
      },
      {
        text: confirmText,
        onPress: onConfirm,
      },
    ],
    { cancelable: true }
  );
}
