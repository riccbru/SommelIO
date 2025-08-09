import { formatOption } from "@/src/utils/utils";
import { Text, View } from "react-native";

type TasteExam = {
  sweetness: string;
  alcohols: string;
  softness: string;
  acidity: string;
  tannicity: string;
  saltiness: string;
  balance: string;
  intensity: string;
  persistence: string;
  quality: string;
  structure: string;
  notes: string;
}

type Props = {
  exam: TasteExam;
}

export default function TasteDetails({ exam }: Props) {

  if (!exam || Object.keys(exam).length === 0) {
    return(
      <Text>{}</Text>
    );
  }

  return (
      <View>
          <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Sweetness: </Text>{formatOption(exam.sweetness).toUpperCase()}</Text>
          <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Alcohols: </Text>{formatOption(exam.alcohols).toUpperCase()}</Text>
          <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Softness: </Text>{formatOption(exam.softness).toUpperCase()}</Text>
          <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Acidity: </Text>{formatOption(exam.acidity).toUpperCase()}</Text>
          <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Tannicity: </Text>{formatOption(exam.tannicity).toUpperCase()}</Text>
          <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Saltiness: </Text>{formatOption(exam.saltiness).toUpperCase()}</Text>
          <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Intensity: </Text>{formatOption(exam.intensity).toUpperCase()}</Text>
          <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Persistence: </Text>{formatOption(exam.persistence).toUpperCase()}</Text>
          <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Quality: </Text>{formatOption(exam.quality).toUpperCase()}</Text>
          <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Structure: </Text>{formatOption(exam.structure).toUpperCase()}</Text>
          <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Balance: </Text>{formatOption(exam.balance).toUpperCase()}</Text>
          {exam.notes && <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Notes: </Text>{exam.notes}</Text>}
      </View>
  );
}