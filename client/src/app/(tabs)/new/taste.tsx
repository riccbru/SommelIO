import { useState } from "react";
import ExamsAPI from "@/src/services/exams";
import { Card, useTheme } from "react-native-paper";
import FormInput from "@/src/components/new/FormInput";
import NextButton from "@/src/components/new/NextButton";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import CancelButton from "@/src/components/new/CancelButton";
import FormSelect from "@/src/components/new/FormSelect";
import ExitButton from "@/src/components/new/ExitButton";

type TasteExam = {
  sweetness: string;
  alcohols: string;
  softness: string;
  acidity: string;
  tannicity: string;
  saltiness: string;
  balance: string;
  intensity: string;
  persistence: string;
  quality: string;
  structure: string;
  notes: string;
}

const defaultFormData = {
  sweetness: '',
  alcohols: '',
  softness: '',
  acidity: '',
  tannicity: '',
  saltiness: '',
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

  const sweetnessOptions = ["dry", "medium_dry", "medium_sweet", "sweet", "excessively_sweet"];
  const alcoholsOptions = ["light", "lightly_warm", "medium_warm", "warm", "alcoholic"];
  const softnessOptions = ["sharp", "scarcely_soft", "quite_soft", "soft", "velvety"];
  const acidityOptions = ["flat", "scarcely_fresh", "quite_fresh", "fresh", "acidulous"];
  const tannicityOptions = ["flabby", "scarcely_tannic", "quite_tannic", "tannic", "astringent"];
  const saltinessOptions = ["tasteless", "scarcely_tasty", "quite_tasty", "tasty", "salty"];
  const balanceOptions = ["unbalanced", "quite_balanced", "balanced"];
  const intensityOptions = ["lacking", "scarcely_intense", "quite_intense", "intense", "very_intense"];
  const persistenceOptions = ["short", "scarcely_persistent", "quite_persistent", "persistent", "very_persistent"];
  const qualityOptions = ["coarse", "scarcely_fine", "quite_fine", "fine", "excellent"];
  const structureOptions = ["thin", "weak", "full", "vigorous", "heavy"];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!sweetnessOptions.includes(formData.sweetness)) {
      newErrors.sweetness = "Invalid sweetness value";
    }

    if (!alcoholsOptions.includes(formData.alcohols)) {
      newErrors.alcohols = "Invalid alcohols value";
    }

    if (!softnessOptions.includes(formData.softness)) {
      newErrors.softness = "Invalid softness value";
    }

    if (!acidityOptions.includes(formData.acidity)) {
      newErrors.acidity = "Invalid acidity value";
    }

    if (!tannicityOptions.includes(formData.tannicity)) {
      newErrors.tannicity = "Invalid tannicity value";
    }

    if (!saltinessOptions.includes(formData.saltiness)) {
      newErrors.saltiness = "Invalid saltiness value";
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
                <CancelButton
                  setErrors={setErrors}
                  setFormData={setFormData}
                  defaultFormData={defaultFormData}
                />
              </View>

              <FormSelect
                label="Sweetness"
                field="sweetness"
                value={formData.sweetness}
                error={errors.sweetness}
                onChange={updateFormData}
                options={sweetnessOptions}
              />

              <FormSelect
                label="Alcohols"
                field="alcohols"
                value={formData.alcohols}
                error={errors.alcohols}
                onChange={updateFormData}
                options={alcoholsOptions}
              />

              <FormSelect
                label="Softness"
                field="softness"
                value={formData.softness}
                error={errors.softness}
                onChange={updateFormData}
                options={softnessOptions}
              />

              <FormSelect
                label="Acidity"
                field="acidity"
                value={formData.acidity}
                error={errors.acidity}
                onChange={updateFormData}
                options={acidityOptions}
              />

              <FormSelect
                label="Tannicity"
                field="tannicity"
                value={formData.tannicity}
                error={errors.tannicity}
                onChange={updateFormData}
                options={tannicityOptions}
              />

              <FormSelect
                label="Saltiness"
                field="saltiness"
                value={formData.saltiness}
                error={errors.saltiness}
                onChange={updateFormData}
                options={saltinessOptions}
              />

              <FormSelect
                label="Balance"
                field="balance"
                value={formData.balance}
                error={errors.balance}
                onChange={updateFormData}
                options={balanceOptions}
              />

              <FormSelect
                label="Intensity"
                field="intensity"
                value={formData.intensity}
                error={errors.intensity}
                onChange={updateFormData}
                options={intensityOptions}
              />

              <FormSelect
                label="Persistence"
                field="persistence"
                value={formData.persistence}
                error={errors.persistence}
                onChange={updateFormData}
                options={persistenceOptions}
              />

              <FormSelect
                label="Quality"
                field="quality"
                value={formData.quality}
                error={errors.quality}
                onChange={updateFormData}
                options={qualityOptions}
              />

              <FormSelect
                label="Structure"
                field="structure"
                value={formData.structure}
                error={errors.structure}
                onChange={updateFormData}
                options={structureOptions}
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

          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginLeft: 15, marginRight: 15 }}>
            <ExitButton
              setErrors={setErrors}
              setFormData={setFormData}
              defaultFormData={defaultFormData}
            />
            <NextButton
              requiresTid
              path="/new/final"
              text="FINAL"
              formData={formData}
              validation={validateForm}
              action={ExamsAPI.createTaste}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}