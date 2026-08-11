import { StyleSheet, View, Text, Pressable } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { colors } from '@/styles/colors';

type NotificationFunctionProps = {
    name: string;
    icon: string;
    times?: string[];
    enabled: boolean;
    onToggle: () => void;
};

export function NotificationFunction({
    name,
    icon,
    times,
    enabled,
    onToggle,
}: NotificationFunctionProps) {
    return (
        <>
            <View style={styles.contactContainer}>
                <View style={styles.iconSquare}>
                    <IconSymbol size={22} name={icon} color={colors.darkBlue} />
                </View>
                <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{name}</Text>

                    {enabled && times && times.length > 0 && (
                        <View style={styles.times}>
                            <View style={styles.timeBadge}>
                                <IconSymbol
                                    size={12}
                                    name="clock"
                                    color={colors.white}
                                />

                                <Text style={styles.time}>
                                    {times.map((time, index) => (
                                        <Text key={time}>
                                            {index > 0 && (
                                                <Text style={styles.timeSeparator}> | </Text>
                                            )}
                                            {time}
                                        </Text>
                                    ))}
                                </Text>
                            </View>

                            <IconSymbol
                                size={15}
                                name="pen.fill"
                                color={colors.darkBlue}
                            />
                        </View>
                    )}
                </View>

                <Pressable
                    onPress={onToggle}
                    style={[
                        styles.toggle,
                        enabled && styles.toggleEnabled,
                    ]}
                >
                    <View
                        style={[
                            styles.toggleKnob,
                            enabled && styles.toggleKnobEnabled,
                        ]}
                    />
                </Pressable>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10
    },

    iconSquare: {
        width: 65,
        aspectRatio: 1,
        backgroundColor: colors.lightBlue,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },

    contactInfo: {
        marginLeft: 12,
    },

    deleteIcon: {
        marginLeft: 'auto',
        paddingRight: 10
    },

    contactName: {
        fontSize: 14,
        fontWeight: 600,
        marginBottom: 2
    },

    contactNumber: {
        fontSize: 14,
        color: colors.darkMutedBlue,
        fontWeight: 600
    },

    times: {
        marginTop: 5,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8
    },

    timeBadge: {
        alignSelf: 'flex-start',
        backgroundColor: colors.green,
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        paddingRight: 12,
        gap: 5
    },

    time: {
        color: colors.white,
        fontSize: 12
    },

    timeSeparator: {
        color: colors.darkGreen,
    },

    toggle: {
        marginLeft: 'auto',
        width: 38,
        height: 20,
        borderRadius: 20,
        backgroundColor: colors.darkBlue,
        justifyContent: 'center',
        paddingHorizontal: 3,
    },

    toggleEnabled: {
        backgroundColor: colors.primary,
    },

    toggleKnob: {
        width: 15,
        height: 15,
        borderRadius: 11,
        backgroundColor: colors.white,
    },

    toggleKnobEnabled: {
        alignSelf: 'flex-end',
    },
});
