import { useState } from "react";
import { CaretDownIcon, CaretUpIcon } from "phosphor-react-native";
import { HelperText, Text, Card, useTheme } from "react-native-paper";
import { View, TouchableOpacity, Modal, FlatList, StyleSheet } from "react-native";
import { formatOption } from "@/src/utils/utils";

type Props<T> = {
    label: string;
    field: keyof T;
    value: string;
    error?: string;
    options: string[];
    onChange: (field: keyof T, value: string) => void;
};

export default function FormSelect<T>({
    label,
    field,
    value,
    error,
    options,
    onChange,
}: Props<T>) {
    const theme = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const hasValue = value && value.trim() !== '';
    const shouldFloatLabel = hasValue || isFocused;

    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    setIsOpen(true);
                    setIsFocused(true);
                }}
                onBlur={() => setIsFocused(false)}
                style={[
                    styles.container,
                    {
                        borderColor: error
                            ? theme.colors.red
                            : (isFocused || isOpen)
                                ? theme.colors.primary
                                : theme.colors.gray,
                        borderWidth: error ? 2 : 1,
                        backgroundColor: theme.colors.surface,
                    }
                ]}
            >
                {/* Floating Label */}
                <Text
                    style={[
                        styles.label,
                        {
                            color: error
                                ? theme.colors.red
                                : (isFocused || isOpen)
                                    ? theme.colors.primary
                                    : theme.colors.gray,
                            top: shouldFloatLabel ? -8 : 16,
                            fontSize: shouldFloatLabel ? 12 : 16,
                            backgroundColor: shouldFloatLabel ? theme.colors.surface : 'transparent',
                            paddingHorizontal: shouldFloatLabel ? 4 : 0,
                        }
                    ]}
                >
                    {label}
                </Text>

                {/* Selected Value */}
                {hasValue && (
                    <Text style={[styles.selectedText, { color: theme.colors.text }]}>
                        {formatOption(value)}
                    </Text>
                )}

                {/* Dropdown Arrow */}
                <View style={styles.arrow}>
                    {isOpen ? (
                        <CaretUpIcon
                        size={16}
                        color={error ? theme.colors.red : theme.colors.gray}
                        />
                    ) : (
                        <CaretDownIcon
                        size={16}
                        color={error ? theme.colors.red : theme.colors.gray}
                        />
                    )}
                </View>

            </TouchableOpacity>

            {/* Dropdown Modal */}
            <Modal
                visible={isOpen}
                transparent
                animationType="fade"
                onRequestClose={() => {
                    setIsOpen(false);
                    setIsFocused(false);
                }}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => {
                        setIsOpen(false);
                        setIsFocused(false);
                    }}
                >
                    <View style={styles.modalContent}>
                        <Card style={[styles.dropdownCard, { backgroundColor: theme.colors.surface }]}>
                            <FlatList
                                data={options}
                                keyExtractor={(item) => item}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity
                                        style={[
                                            styles.option,
                                            { borderBottomColor: theme.colors.pearl },
                                            index === options.length - 1 && styles.lastOption,
                                            value === item && { backgroundColor: theme.colors.pearl }
                                        ]}
                                        onPress={() => {
                                            onChange(field, item);
                                            setIsOpen(false);
                                            setIsFocused(false);
                                        }}
                                    >
                                        <Text style={[
                                            styles.optionText,
                                            { color: theme.colors.text },
                                            value === item && { fontWeight: '600' }
                                        ]}>
                                            {formatOption(item)}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </Card>
                    </View>
                </TouchableOpacity>
            </Modal>

            <HelperText type="error" visible={!!error}>
                {error}
            </HelperText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        borderRadius: 4,
        paddingHorizontal: 14,
        justifyContent: 'center',
        position: 'relative',
    },
    label: {
        position: 'absolute',
        left: 14,
        fontWeight: '400',
    },
    selectedText: {
        fontSize: 16,
        paddingTop: 8,
    },
    arrow: {
        position: 'absolute',
        right: 14,
        fontSize: 12,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        maxWidth: 300,
    },
    dropdownCard: {
        maxHeight: 250,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
    },
    option: {
        padding: 16,
        borderBottomWidth: 1,
    },
    lastOption: {
        borderBottomWidth: 0,
    },
    optionText: {
        fontSize: 16,
    },
});