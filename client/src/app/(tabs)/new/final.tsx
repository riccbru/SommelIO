import { useState } from "react";
import ExamsAPI from "@/src/services/exams";
import { Card, useTheme } from "react-native-paper";
import FormInput from "@/src/components/new/FormInput";
import ExitButton from "@/src/components/new/ExitButton";
import FormSelect from "@/src/components/new/FormSelect";
import NextButton from "@/src/components/new/NextButton";
import CancelButton from "@/src/components/new/CancelButton";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

type FinalExam = {
  evolutionary_state: string;
  harmony: string;
  pairings: string;
  notes: string;
}

const defaultFormData = {
  evolutionary_state: '',
  harmony: '',
  pairings: '',
  notes: '',
}

export default function Final() {

  const theme = useTheme();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FinalExam>(defaultFormData);

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
  
  const evolutionaryStateOptions = ["immature", "young", "ready", "mature", "old"];
  const harmonyOptions = ["disharmonious", "quite_harmonious", "harmonious"];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!evolutionaryStateOptions.includes(formData.evolutionary_state)) {
      newErrors.evolutionary_state = "Invalid evolution state value";
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
        keyboardVerticalOffset={90}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: theme.colors.background }}
      >
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">

          <Card>
            <Card.Content>
              <View style={{ flex: 1, flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "space-between" }}>
                <Text style={styles.sectionTitle}>Final</Text>
                <CancelButton
                  setErrors={setErrors}
                  setFormData={setFormData}
                  defaultFormData={defaultFormData}
                />
              </View>

              <FormSelect
                label="Evolutionary State"
                field="evolutionary_state"
                value={formData.evolutionary_state}
                error={errors.evolutionary_state}
                onChange={updateFormData}
                options={evolutionaryStateOptions}
              />

              <FormSelect
                label="Harmony"
                field="harmony"
                value={formData.harmony}
                error={errors.harmony}
                onChange={updateFormData}
                options={harmonyOptions}
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

          <View style={styles.buttonContainer}>
            <ExitButton
              setErrors={setErrors}
              setFormData={setFormData}
              defaultFormData={defaultFormData}
            />
            <NextButton
              requiresTid
              path="/new/final"
              text="SAVE"
              formData={formData}
              validation={validateForm}
              action={ExamsAPI.createFinal}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}