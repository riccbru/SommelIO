import { Text, View } from "react-native";
import { formatOption } from "@/src/utils/utils";

type OlfactoryExam = {
  intensity: string;
  complexity: string;
  quality: string;
  aromatic: boolean;
  vinous: boolean;
  floral: boolean;
  fruity: boolean;
  grassy: boolean;
  mineral: boolean;
  fragrant: boolean;
  spicy: boolean;
  toasted: boolean;
  ethereal: boolean;
  notes: string;
};

type Props = {
  exam: OlfactoryExam;
}

export default function OlfactoryDetails({ exam }: Props) {
  
  if (!exam || Object.keys(exam).length === 0) {
    return(
      <Text>{}</Text>
    );
  }

  return (
    <View>
        <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Intensity: </Text>{formatOption(exam.intensity).toUpperCase()}</Text>
        <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Complexity: </Text>{formatOption(exam.complexity).toUpperCase()}</Text>
        <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Quality: </Text>{formatOption(exam.quality).toUpperCase()}</Text>
        <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Aromatic: </Text>{exam?.description?.aromatic ? 'X' : ' '}</Text>
        <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Vinous: </Text>{exam?.description?.vinous ? 'X' : ' '}</Text>
        <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Floral: </Text>{exam?.description?.floral ? 'X' : ' '}</Text>
        <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Fruity: </Text>{exam?.description?.fruity ? 'X' : ' '}</Text>
        <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Grassy: </Text>{exam?.description?.grassy ? 'X' : ' '}</Text>
        <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Mineral: </Text>{exam?.description?.mineral ? 'X' : ' '}</Text>
        <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Fragrant: </Text>{exam?.description?.fragrant ? 'X' : ' '}</Text>
        <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Spicy: </Text>{exam?.description?.spicy ? 'X' : ' '}</Text>
        <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Toasted: </Text>{exam?.description?.toasted ? 'X' : ' '}</Text>
        <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Ethereal: </Text>{exam?.description?.ethereal ? 'X' : ' '}</Text>
        {exam.notes && <Text style={{ marginBottom: 5 }}> <Text style={{ fontWeight: 'bold' }}>Notes:</Text> {exam?.description?.notes} </Text>}
    </View>
  );
}