import { StyleSheet, Text, View } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { colors } from '@/styles/colors';

type BadgeCircleProps = {
    icon: string;
    value?: number;
    color: string;
    direction?: 'column' | 'row';
};

const lightColorMap: Record<string, string> = {
    [colors.primary]: colors.lightBlue,
    [colors.mutedBlue]: colors.lightMutedBlue,

    [colors.green]: colors.lightMutedGreen,
    [colors.mutedGreen]: colors.lightMutedGreen,

    [colors.purple]: colors.lightMutedPurple,
    [colors.mutedPurple]: colors.lightMutedPurple,
    [colors.brightPurple]: colors.lightMutedPurple,
};

export function BadgeCircle({
    icon,
    value,
    color,
    direction = 'column',
}: BadgeCircleProps) {
    const backgroundColor = lightColorMap[color] ?? colors.gray;

    return (
        <View
            style={[
                styles.circle,
                {
                    backgroundColor,
                    flexDirection:
                        direction === 'column' ? 'column-reverse' : 'row',
                },
            ]}
        >
            <IconSymbol size={22} name={icon as any} color={color} />

            {value !== undefined && (
                <Text
                    style={[
                        styles.value,
                        direction === 'row' && styles.valueRow,
                        { color: color },
                    ]}
                >
                    {value}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    circle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
    },

    value: {
        fontSize: 16,
        fontWeight: '700',
    },

    valueRow: {
        marginLeft: 2,
    },
});
