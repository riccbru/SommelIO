import { useState } from "react";
import ExamsAPI from "@/src/services/exams";
import { Card, useTheme } from "react-native-paper";
import FormInput from "@/src/components/new/FormInput";
import NextButton from "@/src/components/new/NextButton";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from "react-native";

type VisualExam = {
    limpidity: string;
    color_family: string;
    color_shade: string;
    consistency: string;
    bubble_grain: string | null;
    bubble_number: string | null;
    bubble_persistence: string | null;
    notes: string;
};

export default function Visual() {

    const theme = useTheme();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState<VisualExam>({
        limpidity: '',
        color_family: '',
        color_shade: '',
        consistency: '',
        bubble_grain: null,
        bubble_number: null,
        bubble_persistence: null,
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

    const updateFormData = (field: keyof VisualExam, value: string) => {
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

        const limpidityOptions = ["velato", "abbastanza_limpido", "limpido", "cristallino", "brillante"];
        const colorFamilyOptions = ["giallo", "rosa", "rosso"];
        const colorShades: Record<string, string[]> = {
          giallo: ["verdolino", "paglierino", "dorato", "ambrato"],
          rosa: ["tenue", "cerasuolo", "chiaretto"],
          rosso: ["porpora", "rubino", "granato", "aranciato"],
        };
        const consistencyOptions = ["fluido", "poco_consistente", "abbastanza_consistente", "consistente", "viscoso"];
        const bubbleGrainOptions = ["grossolane", "abbastanza_fini", "fini"];
        const bubbleNumberOptions = ["scarse", "abbastanza_numerose", "numerose"];
        const bubblePersistenceOptions = ["evanescenti", "abbastanza_persistenti", "persistenti"];
    
        if (!limpidityOptions.includes(formData.limpidity)) {
          newErrors.limpidity = "Invalid limpidity value";
        }
    
        if (!colorFamilyOptions.includes(formData.color_family)) {
          newErrors.color_family = "Invalid color family";
        }
    
        const validShades = colorShades[formData.color_family] || [];
        if (!validShades.includes(formData.color_shade)) {
          newErrors.color_shade = `Invalid shade for color family ${formData.color_family}`;
        }
    
        if (!consistencyOptions.includes(formData.consistency)) {
          newErrors.consistency = "Invalid consistency value";
        }
    
        // if (!bubbleGrainOptions.includes(formData.bubble_grain)) {
        //   newErrors.bubble_grain = "Invalid bubble grain value";
        // }
    
        // if (!bubbleNumberOptions.includes(formData.bubble_number)) {
        //   newErrors.bubble_number = "Invalid bubble number value";
        // }
    
        // if (!bubblePersistenceOptions.includes(formData.bubble_persistence)) {
        //   newErrors.bubble_persistence = "Invalid bubble persistence value";
        // }
    
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
                            <Text style={styles.sectionTitle}>Visual Exam</Text>

                            <FormInput
                                label="Limpidity"
                                field="limpidity"
                                value={formData.limpidity}
                                error={errors.limpidity}
                                onChange={updateFormData}
                            />

                            <FormInput
                                label="Color family"
                                field="color_family"
                                value={formData.color_family}
                                error={errors.color_family}
                                onChange={updateFormData}
                            />

                            <FormInput
                                label="Color shade"
                                field="color_shade"
                                value={formData.color_shade}
                                error={errors.color_shade}
                                onChange={updateFormData}
                            />

                            <FormInput
                                label="Consistency"
                                field="consistency"
                                value={formData.consistency}
                                error={errors.consistency}
                                onChange={updateFormData}
                            />

                            <FormInput
                                label="Bubble grain"
                                field="bubble_grain"
                                value={formData.bubble_grain}
                                error={errors.bubble_grain}
                                onChange={updateFormData}
                            />

                            <FormInput
                                label="Bubble number"
                                field="bubble_number"
                                value={formData.bubble_number}
                                error={errors.bubble_number}
                                onChange={updateFormData}
                            />

                            <FormInput
                                label="Bubble persistence"
                                field="bubble_persistence"
                                value={formData.bubble_persistence}
                                error={errors.bubble_persistence}
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
                path="/new/olfactory"
                text="OLFACTORY EXAM"
                formData={formData}
                validation={validateForm}
                action={ExamsAPI.createVisual}
                requiresTid
            />
        </>
      );
}