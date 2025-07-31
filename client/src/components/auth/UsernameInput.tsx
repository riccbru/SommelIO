import { StyleSheet, TextInput } from "react-native";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function UsernameInput({ value, onChangeText }: Props) {
  return (
    <TextInput
      style={styles.input}
      placeholder="Username"
      placeholderTextColor="#808080"
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    color: "#000000",
    backgroundColor: "#d3d5cb"
  }
});
