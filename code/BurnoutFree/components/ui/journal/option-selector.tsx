import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/styles/colors';
import { IconSymbol } from '@/components/ui/icon-symbol';

export type SelectorOption = {
    id: number;
    label: string;
    color: string;
    icon?: string;
    value?: string;
};

type OptionSelectorProps = {
    options: SelectorOption[];
    selectedOption: number | null;
    onSelect: (option: number) => void;
};

export function OptionSelector({
    options,
    selectedOption,
    onSelect,
}: OptionSelectorProps) {
    return (
        <View style={styles.container}>
            {options.map((option) => {
                const isSelected = selectedOption === option.id;

                return (
                    <View
                        key={option.id}
                        style={styles.optionItem}
                    >
                        <Pressable
                            onPress={() => onSelect(option.id)}
                            style={[
                                styles.circle,
                                isSelected && {
                                    backgroundColor: option.color,
                                },
                            ]}
                        >
                            {option.icon ? (
                                <IconSymbol
                                    size={22}
                                    name={option.icon as any}
                                    color={
                                        isSelected
                                            ? colors.white
                                            : colors.darkBlue
                                    }
                                />
                            ) : (
                                <Text
                                    style={[
                                        styles.number,
                                        {
                                            color: isSelected
                                                ? colors.white
                                                : colors.darkBlue,
                                        },
                                    ]}
                                >
                                    {option.id}
                                </Text>
                            )}
                        </Pressable>

                        {isSelected && (
                            <Text
                                style={[
                                    styles.label,
                                    { color: option.color },
                                ]}
                            >
                                {option.label}
                            </Text>
                        )}
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 30,
    },

    optionItem: {
        flex: 1,
        alignItems: 'center',
    },

    circle: {
        width: 58,
        height: 58,
        borderRadius: 58,
        backgroundColor: colors.gray,
        alignItems: 'center',
        justifyContent: 'center',
    },

    number: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    label: {
        marginTop: 8,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});