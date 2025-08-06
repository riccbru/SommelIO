import { useState } from "react";
import ExamsAPI from "@/src/services/exams";
import { Card, useTheme } from "react-native-paper";
import FormInput from "@/src/components/new/FormInput";
import NextButton from "@/src/components/new/NextButton";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from "react-native";

type FinalExam = {
    evolution: string;
    harmony: string;
    pairings: string;
    notes: string;
}

export default function Final() {

  const theme = useTheme();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FinalExam>({
      evolution: '',
      harmony: '',
      pairings: '',
      notes: '',
  });

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

  const updateFormData = (field: keyof FinalExam, value: string) => {
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

    const evolutionOptions = ["immaturo", "giovane", "pronto", "maturo", "vecchio"];
    const harmonyOptions = ["poco_armonico", "abbastanza_armonico", "armonico"];
    if (!evolutionOptions.includes(formData.evolution)) {
      newErrors.evolution = "Invalid evolution value";
    }

    if (!harmonyOptions.includes(formData.harmony)) {
      newErrors.harmony = "Invalid harmony value";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  return (
      <>
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: theme.colors.background }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
    
                <Card>
                  <Card.Content>
                    <Text style={styles.sectionTitle}>Final Exam</Text>

                    <FormInput
                      label="Evolution"
                      field="evolution"
                      value={formData.evolution}
                      error={errors.evolution}
                      onChange={updateFormData}
                    />

                    <FormInput
                      label="Harmony"
                      field="harmony"
                      value={formData.harmony}
                      error={errors.harmony}
                      onChange={updateFormData}
                    />

                    <FormInput
                      label="Pairings"
                      field="pairings"
                      value={formData.pairings}
                      error={errors.pairings}
                      onChange={updateFormData}
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
          path="/new/final"
          text="SAVE"
          formData={formData}
          validation={validateForm}
          action={ExamsAPI.createFinal}
          requiresTid
        />
      </>
    );
}