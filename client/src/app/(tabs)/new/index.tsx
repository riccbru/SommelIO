import { useState } from "react";
import TastingsAPI from "@/src/services/tastings";
import FormInput from "@/src/components/new/FormInput";
import NextButton from "@/src/components/new/NextButton";
import FormSelect from "@/src/components/new/FormSelect";
import CancelButton from "@/src/components/new/CancelButton";
import { Card, useTheme } from "react-native-paper";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import FormCheckbox from "@/src/components/new/FormCheckbox";

type Tasting = {
  wine_denomination: string;
  favorite: boolean;
  wine_category_name: string;
  sample_number: string;
  alcohol_content: string;
  vintage: string;
  wine_temperature: string;
  ambient_temperature: string;
  tasting_date: string;
  tasting_time: string;
  tasting_location: string;
};

const defaultFormData = {
  wine_denomination: '',
  favorite: false,
  wine_category_name: '',
  sample_number: '',
  alcohol_content: '',
  vintage: '',
  wine_temperature: '',
  ambient_temperature: '',
  tasting_date: new Date().toISOString().split('T')[0],
  tasting_time: new Date().toLocaleTimeString('it-IT', { hour12: false, hour: '2-digit', minute: '2-digit' }),
  tasting_location: ''
}

export default function New() {

  const theme = useTheme();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Tasting>(defaultFormData);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: theme.colors.background
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 15,
      color: theme.colors.text
    },
    text: {
      fontSize: 30,
      fontWeight: 300,
      fontFamily: "Epilogue",
      color: theme.colors.text
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
  });

  const updateFormData = (field: keyof Tasting, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.wine_denomination.trim()) {
      newErrors.wine_denomination = 'Wine denomination is required';
    }

    const allowedCategories = ['white', 'red', 'rosé'];
    if (!formData.wine_category_name.trim()) {
      newErrors.wine_category_name = 'Wine category is required';
    } else if (!allowedCategories.includes(formData.wine_category_name.toLowerCase())) {
      newErrors.wine_category_name = 'Wine category must be white/red/rosé';
    }

    if (!formData.sample_number.trim()) {
      newErrors.sample_number = 'Sample number is required';
    }

    if (!formData.vintage.trim()) {
      newErrors.vintage = 'Vintage is required';
    }

    if (!formData.alcohol_content.trim()) {
      newErrors.alcohol_content = 'Alcohol content is required';
    } else if (isNaN(parseFloat(formData.alcohol_content))) {
      newErrors.alcohol_content = 'Alcohol content must be a number';
    }

    if (!formData.wine_temperature.trim()) {
      newErrors.wine_temperature = 'Wine temperature is required';
    } else if (isNaN(parseFloat(formData.wine_temperature))) {
      newErrors.wine_temperature = 'Wine temperature must be a number';
    }

    if (!formData.ambient_temperature.trim()) {
      newErrors.ambient_temperature = 'Ambient temperature is required';
    } else if (isNaN(parseFloat(formData.ambient_temperature))) {
      newErrors.ambient_temperature = 'Ambient temperature must be a number';
    }

    if (!formData.tasting_date || !formData.tasting_date.trim()) {
      newErrors.tasting_date = 'Date is required';
    } else if (isNaN(Date.parse(formData.tasting_date))) {
      newErrors.date = 'Tasting date is invalid';
    }

    if (!formData.tasting_time || !formData.tasting_time.trim()) {
      newErrors.tasting_time = 'Tasting time is required';
    } else if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(formData.tasting_time)) {
      newErrors.tasting_time = 'Tasting time is invalid';
    }

    if (!formData.tasting_location.trim()) {
      newErrors.tasting_location = 'Tasting location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={90}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: theme.colors.background }}
      >
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">

          <Card>
            <Card.Content>
              <View style={{ flex: 1, flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "space-between" }}>
                <Text style={styles.sectionTitle}>Wine description</Text>
                <CancelButton setFormData={setFormData} defaultFormData={defaultFormData} />
              </View>

              <FormInput
                label="Denomination"
                field="wine_denomination"
                value={formData.wine_denomination}
                error={errors.wine_denomination}
                onChange={updateFormData}
              />

              <FormSelect
                label="Category"
                field="wine_category_name"
                value={formData.wine_category_name}
                error={errors.wine_category_name}
                onChange={updateFormData}
                options={["white", "red", "rosé"]}
              />

              <FormCheckbox
                label="Favorite"
                name="favorite"
                formData={formData}
                setFormData={setFormData}
              />

              <FormInput
                label="Sample number"
                field="sample_number"
                value={formData.sample_number}
                error={errors.sample_number}
                onChange={updateFormData}
              />

              <FormInput
                label="Vintage year"
                field="vintage"
                value={formData.vintage}
                error={errors.vintage}
                keyboardType="numeric"
                onChange={updateFormData}
              />

              <FormInput
                label="Alcohol content (%)"
                field="alcohol_content"
                value={formData.alcohol_content}
                error={errors.alcohol_content}
                keyboardType="numeric"
                onChange={updateFormData}
              />

              <FormInput
                label="Wine temperature (°C)"
                field="wine_temperature"
                value={formData.wine_temperature}
                error={errors.wine_temperature}
                keyboardType="numeric"
                onChange={updateFormData}
              />

              <FormInput
                label="Ambient temperature (°C)"
                field="ambient_temperature"
                value={formData.ambient_temperature}
                error={errors.ambient_temperature}
                keyboardType="numeric"
                onChange={updateFormData}
              />

              <FormInput
                label="Tasting date (YYYY-MM-DD)"
                field="tasting_date"
                value={formData.tasting_date}
                error={errors.tasting_date}
                keyboardType="numbers-and-punctuation"
                onChange={updateFormData}
              />

              <FormInput
                label="Tasting time (HH:MM)"
                field="tasting_time"
                value={formData.tasting_time}
                error={errors.tasting_time}
                keyboardType="numbers-and-punctuation"
                onChange={updateFormData}
              />

              <FormInput
                label="Tasting location"
                field="tasting_location"
                value={formData.tasting_location}
                error={errors.tasting_location}
                onChange={updateFormData}
              />

            </Card.Content>
          </Card>
          <NextButton
            path="/new/visual"
            text="VISUAL EXAM"
            validation={validateForm}
            formData={{ ...formData, vintage: Number(formData.vintage) }}
            action={TastingsAPI.createTasting}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}