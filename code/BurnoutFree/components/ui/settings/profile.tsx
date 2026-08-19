import { Modal, Pressable, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { QuoteCard } from '../quote-card';
import { Achievements } from './achievements';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { colors } from '@/styles/colors';
import { useTranslation } from '@/utils/i18n';

type ProfileProps = {
    visible: boolean;
    onClose: () => void;
};

const achievements = [
  {
    id: "1",
    value: 3,
    text: "3 dagen actief met mijn dagboek",
    icon: "journal.fill",
    color: colors.mutedPurple,
    direction: "column" as const,
  },
  {
    id: "2",
    value: 1,
    text: "Eerste ademhalingsoefening gedaan",
    icon: "leaf.fill",
    color: colors.mutedGreen,
    direction: "column" as const,
  },
  {
    id: "3",
    value: 1,
    text: "Eerste module doorgenomen",
    icon: "book.fill",
    color: colors.mutedBlue,
    direction: "column" as const,
  },
  {
    id: "4",
    value: 10,
    text: "10 ademhalingsoefeningen gedaan",
    icon: "leaf.fill",
    color: colors.mutedPurple,
    direction: "row" as const,
  },
  {
    id: "5",
    value: 10,
    text: "10 dagen actief met mijn dagboek",
    icon: "journal.fill",
    color: colors.mutedGreen,
    direction: "row" as const,
  },
];

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
                {/* Buttons */}
                <View style={styles.actionButtons}>
                    <Pressable onPress={onClose}>
                        <IconSymbol size={22} name="arrow.left" color={colors.darkBlue} />
                    </Pressable>

                    <Pressable onPress={() => {}}>
                        <IconSymbol size={22} name="gear.fill" color={colors.darkBlue} />
                    </Pressable>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Titel */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Mijn profiel</Text>
                    </View>

                    {/* Profiel card */}
                    <View style={styles.profileCard}>
                        <View style={styles.profileCardText}>
                            <Text style={styles.profileCardName}>Britt</Text>
                            <Text style={styles.profileCardUsername}>Greenleaf88</Text>
                        </View>

                        <Image
                            source={require('@/assets/images/Coach_Bubbles_Variant2.png')}
                            style={styles.backgroundImage}
                        />
                    </View>

                    {/* Jouw groeimomenten */}
                    <View style={styles.groeimomentenSectie}>
                        <Text style={[styles.heading, { marginBottom: 20 }]}>
                            🌱 Jouw groeimomenten
                        </Text>

                        <Achievements achievements={achievements} />
                    </View>

                    {/* Jouw doel */}
                    <View style={styles.doelSectie}>
                        <Text style={styles.heading}>Jouw doel</Text>

                        <Pressable onPress={() => {}}>
                            <IconSymbol
                                size={15}
                                name="pen.fill"
                                color={colors.darkBlue}
                            />
                        </Pressable>
                    </View>

                    <QuoteCard
                        quote="Mijn doel is om beter te leren relativeren en om mijn emoties een plaatsje te kunnen geven. Ik zou ook wat van mijn people-pleasing willen af geraken, omdat dit mij geregeld wel eens kan terughouden."
                        fontSize={13}
                        fontWeight="500"
                    />
                </ScrollView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: colors.white,
        padding: 20,
        paddingTop: 50,
        paddingBottom: 45,
        flex: 1,
    },

    scrollContent: {
        paddingBottom: 10,
    },

    actionButtons: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        width: '100%',
        marginBottom: 20,
    },

    header: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },

    heading: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    subtitle: {
        fontSize: 14,
        color: colors.darkMutedBlue,
        fontWeight: 'bold',
    },

    profileCard: {
        backgroundColor: colors.primary,
        height: 140,
        borderRadius: 20,
        overflow: 'hidden', 
        padding: 20,
        position: 'relative',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginBottom: 35
    },

    profileCardText: {
        width: '50%',
    },

    profileCardName: {
        color: colors.white,
        fontSize: 17,
        fontWeight: 'bold',
    },

    profileCardUsername: {
        color: colors.darkBlue,
        fontSize: 14,
        fontWeight: 600,
    },

    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 180,
        width: 180,
        resizeMode: 'contain',
    },

    groeimomentenSectie: {
        marginBottom: 35,
    },

    doelSectie: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
        gap: 10
    },
});