import { ReactNode, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { colors } from '@/styles/colors';

type IconHeaderProps = {
    title: string;
    icon: string;
    infoText?: ReactNode;
};

export function IconHeader({ title, icon, infoText }: IconHeaderProps) {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <IconSymbol
                        size={22}
                        name={icon as any}
                        color={colors.black}
                    />
                    <Text style={styles.title}>{title}</Text>
                </View>

                {infoText && (
                    <Pressable onPress={() => setShowInfo(true)} hitSlop={8}>
                        <IconSymbol
                            size={20}
                            name="info.fill"
                            color={colors.darkBlue}
                        />
                    </Pressable>
                )}
            </View>

            {infoText && (
                <Modal
                    visible={showInfo}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setShowInfo(false)}
                >
                    <View style={styles.overlay}>
                        <View style={styles.infoCard}>
                            {/* Header */}
                            <View style={styles.infoHeader}>
                                <Text style={styles.infoTitle}>{title}</Text>

                                <Pressable
                                    onPress={() => setShowInfo(false)}
                                    hitSlop={10}
                                >
                                    <IconSymbol
                                        size={25}
                                        name="xmark"
                                        color={colors.darkBlue}
                                    />
                                </Pressable>
                            </View>

                            {/* Content */}
                            <View style={styles.infoContent}>
                                <Text style={styles.infoText}>{infoText}</Text>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
    },

    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flex: 1,
    },

    title: {
        color: colors.black,
        fontSize: 16,
        fontWeight: '600',
    },

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    infoCard: {
        width: '100%',
        maxWidth: 480,
        borderRadius: 22,
        overflow: 'hidden',
        backgroundColor: colors.white,

        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10,
    },

    infoHeader: {
        minHeight: 70,
        paddingHorizontal: 24,
        paddingVertical: 18,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    infoTitle: {
        color: colors.darkBlue,
        fontSize: 16,
        fontWeight: '700',
    },

    infoContent: {
        backgroundColor: colors.darkBlue,
        paddingHorizontal: 24,
        paddingVertical: 24,
    },

    infoText: {
        color: colors.white,
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '500',
    },
});
