import { useState } from "react";
import ExamsAPI from "@/src/services/exams";
import FormInput from "@/src/components/new/FormInput";
import NextButton from "@/src/components/new/NextButton";
import { Card, useTheme } from "react-native-paper";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import CancelButton from "@/src/components/new/CancelButton";
import FormSelect from "@/src/components/new/FormSelect";
import FormCheckbox from "@/src/components/new/FormCheckbox";

type OlfactoryExam = {
    intensity: string;
    complexity: string;
    quality: string;
    aromatic: boolean;
    vinous: boolean;
    floral: boolean;
    fruity: boolean;
    fragrant: boolean;
    herbaceous: boolean;
    mineral: boolean;
    spicy: boolean;
    ethereal: boolean;
    frank: boolean;
    notes: string;
};

const defaultFormData = {
  intensity: '',
  complexity: '',
  quality: '',
  aromatic: false,
  vinous: false,
  floral: false,
  fruity: false,
  fragrant: false,
  herbaceous: false,
  mineral: false,
  spicy: false,
  ethereal: false,
  frank: false,
  notes: '',
}

export default function Olfactory() {

  const theme = useTheme();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<OlfactoryExam>(defaultFormData);

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

  const updateFormData = (field: keyof OlfactoryExam, value: string) => {
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
    const intensityOptions = ["carente", "poco_intenso", "abbastanza_intenso", "intenso", "molto_intenso"];
    const complexityOptions = ["carente", "poco_complesso", "abbastanza_complesso", "complesso", "ampio"];
    const qualityOptions = ["comune", "poco_fine", "abbastanza_fine", "fine", "eccellente"];

    if (!intensityOptions.includes(formData.intensity)) {
      newErrors.intensity = "Invalid intensity value";
    }

    if (!complexityOptions.includes(formData.complexity)) {
      newErrors.complexity = "Invalid complexity value";
    }

    if (!qualityOptions.includes(formData.quality)) {
      newErrors.quality = "Invalid quality value";
    }

    const descriptors = [
      "aromatic", "vinous", "floral", "fruity", "fragrant",
      "herbaceous", "mineral", "spicy", "ethereal", "frank"
    ];

    const hasAtLeastOneDescriptor = descriptors.some(
      (key) => formData[key as keyof OlfactoryExam] === true
    );

    if (!hasAtLeastOneDescriptor) {
      newErrors.descriptors = "At least one descriptor must be selected";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
      <>
        <KeyboardAvoidingView
          keyboardVerticalOffset={140}
          style={{ flex: 1, backgroundColor: theme.colors.background }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
    
                <Card>
                  <Card.Content>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "space-between" }}>
                      <Text style={styles.sectionTitle}>Olfactory Exam</Text>
                      <CancelButton setFormData={setFormData} defaultFormData={defaultFormData} />
                    </View>

                    <FormSelect
                      label="Intensity"
                      field="intensity"
                      value={formData.intensity}
                      error={errors.intensity}
                      onChange={updateFormData}
                      options={["carente", "poco_intenso", "abbastanza_intenso", "intenso", "molto_intenso"]}
                    />

                    <FormSelect
                      label="Complexity"
                      field="complexity"
                      value={formData.complexity}
                      error={errors.complexity}
                      onChange={updateFormData}
                      options={["carente", "poco_complesso", "abbastanza_complesso", "complesso", "ampio"]}
                    />

                    <FormSelect
                      label="Quality"
                      field="quality"
                      value={formData.quality}
                      error={errors.quality}
                      onChange={updateFormData}
                      options={["comune", "poco_fine", "abbastanza_fine", "fine", "eccellente"]}
                    />

                    <FormCheckbox
                      label="Aromatic"
                      name="aromatic"
                      formData={formData}
                      setFormData={setFormData}
                    />
                    <FormCheckbox
                      label="Vinous"
                      name="vinous"
                      formData={formData}
                      setFormData={setFormData}
                    />
                    <FormCheckbox
                      label="Floral"
                      name="floral"
                      formData={formData}
                      setFormData={setFormData}
                    />
                    <FormCheckbox
                      label="Fruity"
                      name="fruity"
                      formData={formData}
                      setFormData={setFormData}
                    />
                    <FormCheckbox
                      label="Fragrant"
                      name="fragrant"
                      formData={formData}
                      setFormData={setFormData}
                    />
                    <FormCheckbox
                      label="Herbaceous"
                      name="herbaceous"
                      formData={formData}
                      setFormData={setFormData}
                    />
                    <FormCheckbox
                      label="Mineral"
                      name="mineral"
                      formData={formData}
                      setFormData={setFormData}
                    />
                    <FormCheckbox
                      label="Spicy"
                      name="spicy"
                      formData={formData}
                      setFormData={setFormData}
                    />
                    <FormCheckbox
                      label="Ethereal"
                      name="ethereal"
                      formData={formData}
                      setFormData={setFormData}
                    />
                    <FormCheckbox
                      label="Frank"
                      name="frank"
                      formData={formData}
                      setFormData={setFormData}
                    />

                    <FormInput
                      label="Notes"
                      field="notes"
                      value={formData.notes}
                      error={errors.notes}
                      onChange={updateFormData}
                    />
    
                  </Card.Content>
                </Card>
    
            </ScrollView>
        </KeyboardAvoidingView>
        <NextButton
          path="/new/taste"
          text="TASTE EXAM"
          formData={formData}
          validation={validateForm}
          action={ExamsAPI.createOlfactory}
          requiresTid
        />
      </>
    );
}