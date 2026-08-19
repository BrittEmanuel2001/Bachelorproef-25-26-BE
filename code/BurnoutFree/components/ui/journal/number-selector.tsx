import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/styles/colors';
import { IconSymbol } from '@/components/ui/icon-symbol';

type NumberSelectorProps = {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
};

export function NumberSelector({
    value,
    onChange,
    min = 0,
    max = 24,
}: NumberSelectorProps) {
    return (
        <View style={styles.container}>
            <Pressable
                style={styles.button}
                onPress={() => onChange(Math.max(min, value - 1))}
            >
                <IconSymbol size={16} name="minus" color={colors.darkBlue} />
            </Pressable>

            <View style={styles.valueContainer}>
                <Text style={styles.value}>{value}</Text>
                <Text style={styles.unit}>uur</Text>
            </View>

            <Pressable
                style={styles.button}
                onPress={() => onChange(Math.min(max, value + 1))}
            >
                <IconSymbol size={16} name="plus" color={colors.darkBlue} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 30,
    },

    button: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: colors.gray,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
    },

    valueContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 5,
        minWidth: 70,
        justifyContent: 'center',
    },

    value: {
        fontSize: 50,
        fontWeight: 'bold',
        color: colors.darkBlue,
    },

    unit: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.darkBlue,
    },
});
