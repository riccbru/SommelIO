import { useState } from "react";
import ExamsAPI from "@/src/services/exams";
import { Card, useTheme } from "react-native-paper";
import FormInput from "@/src/components/new/FormInput";
import NextButton from "@/src/components/new/NextButton";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import CancelButton from "@/src/components/new/CancelButton";
import FormSelect from "@/src/components/new/FormSelect";
import ExitButton from "@/src/components/new/ExitButton";

type VisualExam = {
    limpidity: string;
    color_family: string;
    color_shade: string;
    consistency: string;
    bubble_size: string;
    bubble_number: string;
    bubble_persistence: string;
    notes: string;
};

const defaultFormData = {
    limpidity: '',
    color_family: '',
    color_shade: '',
    consistency: '',
    bubble_size: '',
    bubble_number: '',
    bubble_persistence: '',
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

    const colorFamilyOptions = ["yellow", "red", "rosé"];
    const colorShadesOptions: Record<string, string[]> = {
        yellow: ["greenish_yellow", "straw_yellow", "golden_yellow", "amber"],
        red: ["purple_red", "ruby_red", "garnet", "orange_red"],
        rosé: ["soft_rosé", "cherry_red", "dark_rosé"]
    };

    const limpidityOptions = ["veiled", "quite_limpid", "limpid", "crystal_clear", "brilliant"];
    const consistencyOptions = ["flowing", "scarcely_consistent", "quite_consistent", "consistent", "oily"];
    const bubblesizeOptions = ["", "large", "quite_fine", "fine"];
    const bubbleNumberOptions = ["", "very_few", "quite_numerous", "numerous"];
    const bubblePersistenceOptions = ["", "fading", "quite_persistent", "persistent"];

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};


        if (!limpidityOptions.includes(formData.limpidity)) {
            newErrors.limpidity = "Invalid limpidity value";
        }

        if (!colorFamilyOptions.includes(formData.color_family)) {
            newErrors.color_family = "Invalid color family";
        }

        const validShades = colorShadesOptions[formData.color_family] || [];
        if (!validShades.includes(formData.color_shade)) {
            newErrors.color_shade = `Invalid shade for color family ${formData.color_family}`;
        }

        if (!consistencyOptions.includes(formData.consistency)) {
            newErrors.consistency = "Invalid consistency value";
        }

        if (!bubblesizeOptions.includes(formData.bubble_size)) {
            newErrors.bubble_size = "Invalid bubble size value";
        }

        if (!bubbleNumberOptions.includes(formData.bubble_number)) {
            newErrors.bubble_number = "Invalid bubble number value";
        }

        if (!bubblePersistenceOptions.includes(formData.bubble_persistence)) {
            newErrors.bubble_persistence = "Invalid bubble persistence value";
        }

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
                                <CancelButton
                                    setErrors={setErrors}
                                    setFormData={setFormData}
                                    defaultFormData={defaultFormData}
                                />
                            </View>

                            <FormSelect
                                label="Limpidity"
                                field="limpidity"
                                value={formData.limpidity}
                                error={errors.limpidity}
                                onChange={updateFormData}
                                options={limpidityOptions}
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
                                options={colorFamilyOptions}
                            />

                            <FormSelect
                                label="Color shade"
                                field="color_shade"
                                value={formData.color_shade}
                                error={errors.color_shade}
                                onChange={updateFormData}
                                options={colorShadesOptions[formData.color_family]}
                            />

                            <FormSelect
                                label="Consistency"
                                field="consistency"
                                value={formData.consistency}
                                error={errors.consistency}
                                onChange={updateFormData}
                                options={consistencyOptions}
                            />

                            <FormSelect
                                label="Bubble size"
                                field="bubble_size"
                                value={formData.bubble_size}
                                error={errors.bubble_size}
                                onChange={updateFormData}
                                options={bubblesizeOptions}
                            />

                            <FormSelect
                                label="Bubble number"
                                field="bubble_number"
                                value={formData.bubble_number}
                                error={errors.bubble_number}
                                onChange={updateFormData}
                                options={bubbleNumberOptions}
                            />

                            <FormSelect
                                label="Bubble persistence"
                                field="bubble_persistence"
                                value={formData.bubble_persistence}
                                error={errors.bubble_persistence}
                                onChange={updateFormData}
                                options={bubblePersistenceOptions}
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

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginLeft: 15, marginTop: 20, marginRight: 15 }}>
                        <ExitButton
                            setErrors={setErrors}
                            setFormData={setFormData}
                            defaultFormData={defaultFormData}
                        />
                        <NextButton
                            requiresTid
                            path="/new/olfactory"
                            text="OLFACTORY"
                            formData={formData}
                            validation={validateForm}
                            action={ExamsAPI.createVisual}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

        </>
    );
}