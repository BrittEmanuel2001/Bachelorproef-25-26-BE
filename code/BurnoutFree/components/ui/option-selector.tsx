import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/styles/colors';

type Option = {
    value: 'low' | 'medium' | 'high';
    label: string;
};

type OptionSelectorProps = {
    value: 'low' | 'medium' | 'high';
    onChange: (value: 'low' | 'medium' | 'high') => void;
};

const options: Option[] = [
    { value: 'low', label: 'Laag' },
    { value: 'medium', label: 'Gemiddeld' },
    { value: 'high', label: 'Hoog' },
];

const optionColors = {
    low: {
        background: colors.lightMutedPurple,
        selectedBackground: colors.mutedPurple,
        text: colors.mutedPurple,
    },
    medium: {
        background: colors.lightMutedBlue,
        selectedBackground: colors.mutedBlue,
        text: colors.mutedBlue,
    },
    high: {
        background: colors.lightMutedGreen,
        selectedBackground: colors.mutedGreen,
        text: colors.mutedGreen,
    },
};

export function OptionSelector({ value, onChange }: OptionSelectorProps) {
    return (
        <View style={styles.options}>
            {options.map((option) => {
                const selected = value === option.value;
                const colorsForOption = optionColors[option.value];

                return (
                    <Pressable
                        key={option.value}
                        style={[
                            styles.option,
                            {
                                backgroundColor: selected
                                    ? colorsForOption.selectedBackground
                                    : colorsForOption.background,
                                opacity: selected ? 1 : 0.6,
                            },
                        ]}
                        onPress={() => onChange(option.value)}
                    >
                        <Text
                            style={[
                                styles.optionText,
                                {
                                    color: selected
                                        ? colors.white
                                        : colorsForOption.text,
                                },
                            ]}
                        >
                            {option.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    options: {
        flexDirection: 'row',
        gap: 16,
    },

    option: {
        flex: 1,
        height: 58,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },

    optionText: {
        fontSize: 14,
        fontWeight: '600',
    },
});
