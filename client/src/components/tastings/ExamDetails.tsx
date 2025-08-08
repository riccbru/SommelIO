import { Text, View } from "react-native";
import { capitalizeFirst, formatOption } from "@/src/utils/utils";

export default function ExamDetails({ exam }) {
  const sections = Object.entries(exam);
  return (
    <View>
        {sections.map(([fieldKey, value]) => {
            if (fieldKey === 'eid' || value === null || value === undefined || value === '') return null;

            if (typeof value === 'object' && !Array.isArray(value)) {
              return (
                <View key={fieldKey} style={{ marginBottom: 5 }}>
                  <Text style={{ fontWeight: 'bold' }}>{capitalizeFirst(fieldKey)}:</Text>
                  {Object.entries(value).map(([nestedKey, nestedVal]) => (
                    <Text key={nestedKey} style={{ marginLeft: 10 }}>
                      {formatOption(nestedKey)}: {formatOption(nestedVal).toUpperCase()}
                    </Text>
                  ))}
                </View>
              );
            }

            return (
              <Text key={fieldKey} style={{ marginBottom: 5 }}>
                <Text style={{ fontWeight: 'bold' }}>{formatOption(fieldKey)}: </Text>
                {formatOption(value).toUpperCase()}
              </Text>
            );
          })}
    </View>
  );
}