import { formatOption } from "@/src/utils/utils";
import { Text, View } from "react-native";

type VisualExam = {
    limpidity: string;
    color_family: string;
    color_shade: string;
    consistency: string;
    bubble_size: string;
    bubble_number: string;
    bubble_persistence: string;
    notes: string;
};

type Props = {
  exam: VisualExam;
}

export default function VisualDetails({ exam }: Props) {
  
  if (!exam || Object.keys(exam).length === 0) {
    return(
      <Text>{}</Text>
    );
  }

  return (
      <View>
          <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Limpidity: </Text>{formatOption(exam?.limpidity).toUpperCase()}</Text>
          <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Color family: </Text>{formatOption(exam?.color_family).toUpperCase()}</Text>
          <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Color shade: </Text>{formatOption(exam?.color_shade).toUpperCase()}</Text>
          <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Cosistency: </Text>{formatOption(exam?.consistency).toUpperCase()}</Text>
          {exam.bubble_size && <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Bubble size: </Text>{formatOption(exam?.bubble_size).toUpperCase()}</Text>}
          {exam.bubble_number && <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Bubble number: </Text>{formatOption(exam?.bubble_number).toUpperCase()}</Text>}
          {exam.bubble_persistence && <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Bubble persistence: </Text>{formatOption(exam?.bubble_persistence).toUpperCase()}</Text>}
          {exam.notes && <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Notes: </Text>{exam?.notes}</Text>}
      </View>
  );
}