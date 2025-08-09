import { Text, View } from "react-native";
import { formatOption } from "@/src/utils/utils";

type FinalExam = {
  evolutionary_state: string;
  harmony: string;
  pairings: string;
  notes: string;
}

type Props = {
  exam: FinalExam;
}

export default function FinalDetails({ exam }: Props) {
  
  if (!exam || Object.keys(exam).length === 0) {
    return(
      <Text>{}</Text>
    );
  }
  
  return (
      <View>
          <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Evolutionary State: </Text>{formatOption(exam.evolutionary_state).toUpperCase()}</Text>
          <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Harmony: </Text>{formatOption(exam.harmony).toUpperCase()}</Text>
          {exam.pairings && <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Pairings: </Text>{exam.pairings}</Text>}
          {exam.notes && <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Notes: </Text>{exam.notes}</Text>}
      </View>
  );
}