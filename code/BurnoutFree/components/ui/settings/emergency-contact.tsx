import { StyleSheet, View, Text } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { colors } from '@/styles/colors';

type EmergencyContactProps = {
    name: string;
    phoneNumber: string;
};

export function EmergencyContact({ name, phoneNumber }: EmergencyContactProps) {
    return (
        <>
            <View style={styles.contactContainer}>
                <View style={styles.iconSquare}>
                    <IconSymbol
                        size={22}
                        name={'user.fill'}
                        color={colors.mutedPurple}
                    />
                </View>
                <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{name}</Text>
                    <Text style={styles.contactNumber}>{phoneNumber}</Text>
                </View>
                <IconSymbol
                    size={16}
                    name={'trash'}
                    color={colors.red}
                    style={styles.deleteIcon}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },

    iconSquare: {
        width: 65,
        aspectRatio: 1,
        backgroundColor: colors.lightMutedPurple,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },

    contactInfo: {
        marginLeft: 12,
    },

    deleteIcon: {
        marginLeft: 'auto',
        paddingRight: 10,
    },

    contactName: {
        fontSize: 14,
        fontWeight: 600,
        marginBottom: 2,
    },

    contactNumber: {
        fontSize: 14,
        color: colors.darkMutedBlue,
        fontWeight: 600,
    },
});
