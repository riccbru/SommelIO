import { Text, View } from "react-native";

export default function TastingDetails({ tasting }) {
  return (
    <View>
        <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Category: </Text>{tasting.wine_category_name.toUpperCase()}</Text>
        <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Sample: </Text>{tasting.sample_number}</Text>
        <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Alcohol: </Text>{tasting.alcohol_content}</Text>
        <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Vintage: </Text>{tasting.vintage}</Text>
        <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Wine Temperature: </Text>{tasting.wine_temperature}</Text>
        <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Ambient Temperature: </Text>{tasting.ambient_temperature}</Text>
        <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Date & Time: </Text>{tasting.tasting_date.split('T')[0]}, {tasting.tasting_time.split('T')[1].slice(0, 5)}</Text>
        <Text style={{ marginBottom: 5 }}><Text style={{ fontWeight: 'bold' }}>Location: </Text>{tasting.tasting_location.toUpperCase()}</Text>
    </View>
  );
}