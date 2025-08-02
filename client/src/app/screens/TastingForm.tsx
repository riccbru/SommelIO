import React, { useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { View, TextInput, Button, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';

type TastingFormRouteParams = {
  tasting?: Tasting;
};

export default function TastingForm() {
  const route = useRoute<RouteProp<Record<string, TastingFormRouteParams>, string>>();
  const navigation = useNavigation();
  const existingTasting = route.params?.tasting;

  const [wineDenomination, setWineDenomination] = useState(existingTasting?.wine_denomination || '');
  const [sampleNumber, setSampleNumber] = useState(existingTasting?.sample_number || '');

  const isEditing = !!existingTasting;

  const handleSave = async () => {
    try {
      if (isEditing) {
        await TastingsAPI.updateTasting(existingTasting.tid, {
          wine_denomination: wineDenomination,
          sample_number: sampleNumber,
          // ...other fields
        });
      } else {
        await TastingsAPI.createTasting({
          wine_denomination: wineDenomination,
          sample_number: sampleNumber,
          // ...other fields
        });
      }
      navigation.goBack();
    } catch (err) {
      console.error('Save failed', err);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text variant="titleLarge">{isEditing ? "Edit Tasting" : "New Tasting"}</Text>

      <TextInput
        placeholder="Wine Denomination"
        value={wineDenomination}
        onChangeText={setWineDenomination}
        style={{ marginBottom: 12, borderBottomWidth: 1 }}
      />

      <TextInput
        placeholder="Sample Number"
        value={sampleNumber}
        onChangeText={setSampleNumber}
        style={{ marginBottom: 12, borderBottomWidth: 1 }}
      />

      {/* Add more fields as needed */}

      <Button title="Save" onPress={handleSave} />
    </ScrollView>
  );
}
