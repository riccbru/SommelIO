import { useState } from "react";
import ExamsAPI from "@/src/services/exams";
import { Card, useTheme } from "react-native-paper";
import FormInput from "@/src/components/new/FormInput";
import NextButton from "@/src/components/new/NextButton";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import CancelButton from "@/src/components/new/CancelButton";
import FormSelect from "@/src/components/new/FormSelect";

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

const defaultFormData = {
    limpidity: '',
    color_family: '',
    color_shade: '',
    consistency: '',
    bubble_grain: null,
    bubble_number: null,
    bubble_persistence: null,
    notes: ''
}

export default function Visual() {

    const theme = useTheme();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState<VisualExam>(defaultFormData);

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

    const colorFamilyOptions = ["giallo", "rosa", "rosso"];
    const colorShades: Record<string, string[]> = {
      giallo: ["verdolino", "paglierino", "dorato", "ambrato"],
      rosa: ["tenue", "cerasuolo", "chiaretto"],
      rosso: ["porpora", "rubino", "granato", "aranciato"],
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        const limpidityOptions = ["velato", "abbastanza_limpido", "limpido", "cristallino", "brillante"];
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
                keyboardVerticalOffset={140}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1, backgroundColor: theme.colors.background }}
            >
                <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">

                    <Card>
                        <Card.Content>
                            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "space-between" }}>
                                <Text style={styles.sectionTitle}>Visual Exam</Text>
                                <CancelButton setFormData={setFormData} defaultFormData={defaultFormData} />
                            </View>

                            <FormSelect
                                label="Limpidity"
                                field="limpidity"
                                value={formData.limpidity}
                                error={errors.limpidity}
                                onChange={updateFormData}
                                options={["velato", "abbastanza_limpido", "limpido", "cristallino", "brillante"]}
                            />

                            <FormSelect
                                label="Color family"
                                field="color_family"
                                value={formData.color_family}
                                error={errors.color_family}
                                onChange={
                                    (field, value) => {
                                        updateFormData(field, value);
                                        updateFormData("color_shade", "");
                                    }
                                }
                                options={["giallo", "rosa", "rosso"]}
                            />

                            <FormSelect
                                label="Color shade"
                                field="color_shade"
                                value={formData.color_shade}
                                error={errors.color_shade}
                                onChange={updateFormData}
                                options={colorShades[formData.color_family]}
                            />

                            <FormSelect
                                label="Consistency"
                                field="consistency"
                                value={formData.consistency}
                                error={errors.consistency}
                                onChange={updateFormData}
                                options={["fluido", "poco_consistente", "abbastanza_consistente", "consistente", "viscoso"]}
                            />

                            {/* <FormSelect
                                label="Bubble grain"
                                field="bubble_grain"
                                value={formData.bubble_grain}
                                error={errors.bubble_grain}
                                onChange={updateFormData}
                                options={["grossolane", "abbastanza_fini", "fini"]}
                            />

                            <FormSelect
                                label="Bubble number"
                                field="bubble_number"
                                value={formData.bubble_number}
                                error={errors.bubble_number}
                                onChange={updateFormData}
                                options={["scarse", "abbastanza_numerose", "numerose"]}
                            />

                            <FormSelect
                                label="Bubble persistence"
                                field="bubble_persistence"
                                value={formData.bubble_persistence}
                                error={errors.bubble_persistence}
                                onChange={updateFormData}
                                options={["evanescenti", "abbastanza_persistenti", "persistenti"]}
                            /> */}

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