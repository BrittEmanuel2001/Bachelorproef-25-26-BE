import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { colors } from '@/styles/colors';

type ProfileProps = {
    visible: boolean;
    onClose: () => void;
};

export function Profile({ visible, onClose }: ProfileProps) {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
            transparent
            statusBarTranslucent
        >
            <View style={styles.modal}>
                {/* Header */}
                <Pressable
                    onPress={onClose}
                    style={styles.backButton}
                >
                    <IconSymbol
                        size={22}
                        name="arrow.left"
                        color={colors.darkBlue}
                    />
                </Pressable>

                <View style={styles.header}>
                    <Text style={styles.title}>Mijn profiel</Text>
                </View>

                {/* Profiel inhoud */}
                <View style={styles.content}>
                    <Text style={styles.text}>
                        Hier komt de inhoud van je profiel.
                    </Text>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: colors.white,
        padding: 20,
        paddingTop: 50,
        paddingBottom: 80,
        flex: 1,
    },

    backButton: {
        marginBottom: 20,
    },

    header: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    subtitle: {
        fontSize: 14,
        color: colors.mutedBlue,
        fontWeight: 'bold',
    },

    content: {
        flex: 1,
    },

    text: {
        fontSize: 16,
    },
});