import { useState } from "react";
import ExamsAPI from "@/src/services/exams";
import { Card, useTheme } from "react-native-paper";
import FormInput from "@/src/components/new/FormInput";
import NextButton from "@/src/components/new/NextButton";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import CancelButton from "@/src/components/new/CancelButton";
import FormSelect from "@/src/components/new/FormSelect";

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

const defaultFormData = {
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
}

export default function Taste() {

  const theme = useTheme();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<TasteExam>(defaultFormData);

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
          keyboardVerticalOffset={140}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, backgroundColor: theme.colors.background }}
        >
            <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
    
                <Card>
                  <Card.Content>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "space-between" }}>
                      <Text style={styles.sectionTitle}>Taste-Olfactory Exam</Text>
                      <CancelButton setFormData={setFormData} defaultFormData={defaultFormData} />
                    </View>

                    <FormSelect
                      label="Sugars"
                      field="sugars"
                      value={formData.sugars}
                      error={errors.sugars}
                      onChange={updateFormData}
                      options={["secco", "amabile", "abboccato", "dolce", "stucchevole"]}
                    />

                    <FormSelect
                      label="Alcohols"
                      field="alcohols"
                      value={formData.alcohols}
                      error={errors.alcohols}
                      onChange={updateFormData}
                      options={["leggero", "poco_caldo", "abbastanza_caldo", "caldo", "alcolico"]}
                    />

                    <FormSelect
                      label="Polyalcohols"
                      field="polyalcohols"
                      value={formData.polyalcohols}
                      error={errors.polyalcohols}
                      onChange={updateFormData}
                      options={["spigoloso", "poco_morbido", "abbastanza_morbido", "morbido", "pastoso"]}
                    />

                    <FormSelect
                      label="Acids"
                      field="acids"
                      value={formData.acids}
                      error={errors.acids}
                      onChange={updateFormData}
                      options={["piatto", "poco_fresco", "abbastanza_fresco", "fresco", "acidulo"]}
                    />

                    <FormSelect
                      label="Tannins"
                      field="tannins"
                      value={formData.tannins}
                      error={errors.tannins}
                      onChange={updateFormData}
                      options={["molle", "poco_tannico", "abbastanza_tannico", "tannico", "astringente"]}
                    />

                    <FormSelect
                      label="Minerals"
                      field="minerals"
                      value={formData.minerals}
                      error={errors.minerals}
                      onChange={updateFormData}
                      options={["scipito", "poco_sapido", "abbastanza_sapido", "sapido", "salato"]}
                    />

                    <FormSelect
                      label="Balance"
                      field="balance"
                      value={formData.balance}
                      error={errors.balance}
                      onChange={updateFormData}
                      options={["poco_equilibrato", "abbastanza_equilibrato", "equilibrato"]}
                    />

                    <FormSelect
                      label="Intensity"
                      field="intensity"
                      value={formData.intensity}
                      error={errors.intensity}
                      onChange={updateFormData}
                      options={["carente", "poco_intenso", "abbastanza_intenso", "intenso", "molto_intenso"]}
                    />

                    <FormSelect
                      label="Persistence"
                      field="persistence"
                      value={formData.persistence}
                      error={errors.persistence}
                      onChange={updateFormData}
                      options={["corto", "poco_persistente", "abbastanza_persistente", "persistente", "molto_persistente"]}
                    />

                    <FormSelect
                      label="Quality"
                      field="quality"
                      value={formData.quality}
                      error={errors.quality}
                      onChange={updateFormData}
                      options={["comune", "poco_fine", "abbastanza_fine", "fine", "eccellente"]}
                    />

                    <FormSelect
                      label="Structure"
                      field="structure"
                      value={formData.structure}
                      error={errors.structure}
                      onChange={updateFormData}
                      options={["magro", "debole", "di_corpo", "robusto", "pesante"]}
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