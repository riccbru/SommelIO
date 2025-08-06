import { useState } from "react";
import ExamsAPI from "@/src/services/exams";
import { Card, useTheme } from "react-native-paper";
import FormInput from "@/src/components/new/FormInput";
import NextButton from "@/src/components/new/NextButton";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from "react-native";

type TasteExam = {
  sugars: string;
  alcohols: string;
  polyalcohols: string;
  acids: string;
  tannins: string;
  minerals: string;
  balance: string;
  intensity: string;
  persistence: string;
  quality: string;
  structure: string;
  notes: string;
}

export default function Taste() {

  const theme = useTheme();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<TasteExam>({
    sugars: '',
    alcohols: '',
    polyalcohols: '',
    acids: '',
    tannins: '',
    minerals: '',
    balance: '',
    intensity: '',
    persistence: '',
    quality: '',
    structure: '',
    notes: ''
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

  const updateFormData = (field: keyof TasteExam, value: string) => {
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

    const sugarsOptions = ["secco", "amabile", "abboccato", "dolce", "stucchevole"];
    const alcoholsOptions = ["leggero", "poco_caldo", "abbastanza_caldo", "caldo", "alcolico"];
    const polyalcoholsOptions = ["spigoloso", "poco_morbido", "abbastanza_morbido", "morbido", "pastoso"];
    const acidsOptions = ["piatto", "poco_fresco", "abbastanza_fresco", "fresco", "acidulo"];
    const tanninsOptions = ["molle", "poco_tannico", "abbastanza_tannico", "tannico", "astringente"];
    const mineralsOptions = ["scipito", "poco_sapido", "abbastanza_sapido", "sapido", "salato"];
    const balanceOptions = ["poco_equilibrato", "abbastanza_equilibrato", "equilibrato"];
    const intensityOptions = ["carente", "poco_intenso", "abbastanza_intenso", "intenso", "molto_intenso"];
    const persistenceOptions = ["corto", "poco_persistente", "abbastanza_persistente", "persistente", "molto_persistente"];
    const qualityOptions = ["comune", "poco_fine", "abbastanza_fine", "fine", "eccellente"];
    const structureOptions = ["magro", "debole", "di_corpo", "robusto", "pesante"];

    if (!sugarsOptions.includes(formData.sugars)) {
      newErrors.sugars = "Invalid sugars value";
    }

    if (!alcoholsOptions.includes(formData.alcohols)) {
      newErrors.alcohols = "Invalid alcohols value";
    }

    if (!polyalcoholsOptions.includes(formData.polyalcohols)) {
      newErrors.polyalcohols = "Invalid polyalcohols value";
    }

    if (!acidsOptions.includes(formData.acids)) {
      newErrors.acids = "Invalid acids value";
    }

    if (!tanninsOptions.includes(formData.tannins)) {
      newErrors.tannins = "Invalid tannins value";
    }

    if (!mineralsOptions.includes(formData.minerals)) {
      newErrors.minerals = "Invalid minerals value";
    }

    if (!balanceOptions.includes(formData.balance)) {
      newErrors.balance = "Invalid balance value";
    }

    if (!intensityOptions.includes(formData.intensity)) {
      newErrors.intensity = "Invalid intensity value";
    }

    if (!persistenceOptions.includes(formData.persistence)) {
      newErrors.persistence = "Invalid persistence value";
    }

    if (!qualityOptions.includes(formData.quality)) {
      newErrors.quality = "Invalid quality value";
    }

    if (!structureOptions.includes(formData.structure)) {
      newErrors.structure = "Invalid structure value";
    }

    // Notes is optional — no validation

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
      <>
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: theme.colors.background }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
    
                <Card>
                  <Card.Content>
                    <Text style={styles.sectionTitle}>Taste-Olfactory Exam</Text>

                    <FormInput
                      label="Sugars"
                      field="sugars"
                      value={formData.sugars}
                      error={errors.sugars}
                      onChange={updateFormData}
                    />

                    <FormInput
                      label="Alcohols"
                      field="alcohols"
                      value={formData.alcohols}
                      error={errors.alcohols}
                      onChange={updateFormData}
                    />

                    <FormInput
                      label="Polyalcohols"
                      field="polyalcohols"
                      value={formData.polyalcohols}
                      error={errors.polyalcohols}
                      onChange={updateFormData}
                    />

                    <FormInput
                      label="Acids"
                      field="acids"
                      value={formData.acids}
                      error={errors.acids}
                      onChange={updateFormData}
                    />

                    <FormInput
                      label="Tannins"
                      field="tannins"
                      value={formData.tannins}
                      error={errors.tannins}
                      onChange={updateFormData}
                    />

                    <FormInput
                      label="Minerals"
                      field="minerals"
                      value={formData.minerals}
                      error={errors.minerals}
                      onChange={updateFormData}
                    />

                    <FormInput
                      label="Balance"
                      field="balance"
                      value={formData.balance}
                      error={errors.balance}
                      onChange={updateFormData}
                    />

                    <FormInput
                      label="Intensity"
                      field="intensity"
                      value={formData.intensity}
                      error={errors.intensity}
                      onChange={updateFormData}
                    />

                    <FormInput
                      label="Persistence"
                      field="persistence"
                      value={formData.persistence}
                      error={errors.persistence}
                      onChange={updateFormData}
                    />

                    <FormInput
                      label="Quality"
                      field="quality"
                      value={formData.quality}
                      error={errors.quality}
                      onChange={updateFormData}
                    />

                    <FormInput
                      label="Structure"
                      field="structure"
                      value={formData.structure}
                      error={errors.structure}
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
          text="FINAL EXAM"
          formData={formData}
          validation={validateForm}
          action={ExamsAPI.createTaste}
          requiresTid
        />
      </>
    );
}