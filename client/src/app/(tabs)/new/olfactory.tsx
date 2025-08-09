import { useState } from "react";
import ExamsAPI from "@/src/services/exams";
import { capitalizeFirst } from "@/src/utils/utils";
import { Card, useTheme } from "react-native-paper";
import FormInput from "@/src/components/new/FormInput";
import ExitButton from "@/src/components/new/ExitButton";
import FormSelect from "@/src/components/new/FormSelect";
import NextButton from "@/src/components/new/NextButton";
import CancelButton from "@/src/components/new/CancelButton";
import FormCheckbox from "@/src/components/new/FormCheckbox";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

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

const defaultFormData = {
  intensity: '',
  complexity: '',
  quality: '',
  aromatic: false,
  vinous: false,
  floral: false,
  fruity: false,
  grassy: false,
  mineral: false,
  fragrant: false,
  spicy: false,
  toasted: false,
  ethereal: false,
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
    buttonContainer: {
      marginTop: 20,
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    }
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

  const intensityOptions = ["lacking", "scarcely_intense", "quite_intense", "intense", "very_intense"];
  const complexityOptions = ["lacking", "scarcely_complex", "quite_complex", "complex", "ample"];
  const qualityOptions = ["coarse", "scarcely_fine", "quite_fine", "fine", "excellent"];
  const descriptors = ["aromatic", "vinous", "floral", "fruity", "grassy", "mineral", "fragrant", "spicy", "toasted", "ethereal"];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!intensityOptions.includes(formData.intensity)) {
      newErrors.intensity = "Invalid intensity value";
    }

    if (!complexityOptions.includes(formData.complexity)) {
      newErrors.complexity = "Invalid complexity value";
    }

    if (!qualityOptions.includes(formData.quality)) {
      newErrors.quality = "Invalid quality value";
    }

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
                <CancelButton
                  setErrors={setErrors}
                  setFormData={setFormData}
                  defaultFormData={defaultFormData}
                />
              </View>

              <FormSelect
                label="Intensity"
                field="intensity"
                value={formData.intensity}
                error={errors.intensity}
                onChange={updateFormData}
                options={intensityOptions}
              />

              <FormSelect
                label="Complexity"
                field="complexity"
                value={formData.complexity}
                error={errors.complexity}
                onChange={updateFormData}
                options={complexityOptions}
              />

              <FormSelect
                label="Quality"
                field="quality"
                value={formData.quality}
                error={errors.quality}
                onChange={updateFormData}
                options={qualityOptions}
              />

              {descriptors.map((el, index) => (
                <FormCheckbox key={index}
                  label={capitalizeFirst(el)}
                  name={el}
                  formData={formData}
                  setFormData={setFormData}
                />
              ))}

              <FormInput
                label="Notes"
                field="notes"
                value={formData.notes}
                error={errors.notes}
                onChange={updateFormData}
              />

            </Card.Content>
          </Card>

          <View style={styles.buttonContainer}>
            <ExitButton
              setErrors={setErrors}
              setFormData={setFormData}
              defaultFormData={defaultFormData}
            />
            <NextButton
              requiresTid
              path="/new/taste"
              text="TASTE"
              formData={formData}
              validation={validateForm}
              action={ExamsAPI.createOlfactory}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}