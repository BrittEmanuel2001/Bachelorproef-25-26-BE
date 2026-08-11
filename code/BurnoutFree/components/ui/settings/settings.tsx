import { Modal, Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useState } from 'react';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { colors } from '@/styles/colors';
import { IconHeader } from '../icon-header';
import { OptionSelector } from '../option-selector';
import { KnowledgeCard } from '../kennis/knowledge-card';
import { EmergencyContact } from './emergency-contact';
import { NotificationFunction } from './notification-function';

type SettingsProps = {
    visible: boolean;
    onClose: () => void;
};

export function Settings({ visible, onClose }: SettingsProps) {
    const [supportLevel, setSupportLevel] = useState<'low' | 'medium' | 'high'>('medium');
    const [reminderNeed, setReminderNeed] = useState<'low' | 'medium' | 'high'>('medium');

    const [anonSupportEnabled, setAnonSupportEnabled] = useState(false);
    const [journalEnabled, setJournalEnabled] = useState(true);
    const [breathingEnabled, setBreathingEnabled] = useState(true);
    const [meditationEnabled, setMeditationEnabled] = useState(true);

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
                    <IconSymbol size={22} name="arrow.left" color={colors.darkBlue} />
                </Pressable>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Titel */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Instellingen</Text>
                    </View>

                    {/* Begeleidingsintensiteit */}
                    <View style={styles.settingBlock}>
                        <IconHeader 
                            title="Begeleidingsintensiteit" 
                            icon="handshake.fill" 
                            infoText={
                                <>
                                    <Text>
                                        Met deze instelling geef je aan hoeveel begeleiding je graag krijgt.
                                    </Text>

                                    {'\n\n'}

                                    <Text>
                                        De app gebruikt dit samen met je behoefte aan reminders om oefeningen,
                                        cursussen en notificaties op jou af te stemmen.
                                    </Text>

                                    {'\n\n'}

                                    <Text style={{color: colors.green}}>
                                        Heb je bijvoorbeeld gemiddeld behoefte aan ondersteuning en veel nood
                                        aan reminders? Dan kan je vaker een herinnering krijgen voor een
                                        ademhalingspauze.
                                    </Text>

                                    {'\n\n'}

                                    <Text>
                                        Bij een hogere begeleidingsintensiteit kan de app je daarnaast vaker
                                        een meditatie aanbevelen of een langere sessie voorstellen.
                                    </Text>
                                </>
                            }
                        />

                        <View>
                            <Text style={styles.label}>
                                Gewenste ondersteuningsniveau
                            </Text>

                            <OptionSelector
                                value={supportLevel}
                                onChange={setSupportLevel}
                            />
                        </View>

                        <View>
                            <Text style={styles.label}>
                                Nood aan reminders
                            </Text>

                            <OptionSelector
                                value={reminderNeed}
                                onChange={setReminderNeed}
                            />
                        </View>
                    </View>

                    {/* Notificaties */}
                    <View style={styles.settingBlock}>
                        <IconHeader 
                            title="Notificaties" 
                            icon="bell.fill"
                        />

                        <NotificationFunction name="Anonieme aanmoedigingen" icon="hand.heart.fill"
                            enabled={anonSupportEnabled} onToggle={() => setAnonSupportEnabled(!anonSupportEnabled)} />

                        <NotificationFunction name="Dagboek" icon="journal.fill" 
                            times={['09:00']} enabled={journalEnabled} onToggle={() => setJournalEnabled(!journalEnabled)} />

                        <NotificationFunction name="Ademhalingspauze" icon="leaf.fill" 
                            times={['09:00','14:00','19:00']} enabled={breathingEnabled} onToggle={() => setBreathingEnabled(!breathingEnabled)} />

                        <NotificationFunction name="Meditatie" icon="spa.fill" 
                            times={['09:00']} enabled={meditationEnabled} onToggle={() => setMeditationEnabled(!meditationEnabled)} />
                    </View>

                    {/* Noodcontact */}
                    <View style={styles.settingBlock}>
                        <IconHeader 
                            title="Noodcontact" 
                            icon="phone.fill"
                            infoText={
                                <>
                                    <Text>
                                        Noodcontacten zijn mensen die je kan bereiken wanneer je iemand
                                        nodig hebt of wanneer het even moeilijk gaat.
                                    </Text>

                                    {'\n\n'}

                                    <Text style={{color: colors.green}}>
                                        Je kan meerdere noodcontacten toevoegen, zoals een partner,
                                        familielid, vriend(in) of andere naaste.
                                    </Text>
                                </>
                            }
                        />

                        <EmergencyContact name="Jane Doe" phoneNumber="+32 123 456 789" />

                        <Pressable style={[styles.actionButton, {marginBottom: 10}]}>
                            <IconSymbol size={22} name="add" color={colors.black} />
                            <Text style={styles.buttonText}>Nieuw contact toevoegen</Text>
                        </Pressable>

                        <KnowledgeCard
                            moduleTitle="Soms helpt een gesprek met een naaste, maar soms is extra ondersteuning nodig."
                            lessonTitle={"Bekijk hier betrouwbare hulpverleners en organisaties"}
                            backgroundImage={require("@/assets/images/handsBackground.png")}
                        />
                    </View>

                    {/* Andere */}
                    <View>
                        <Text style={styles.subtitle}>Andere</Text>
                        <Pressable style={styles.actionButton}>
                            <IconSymbol size={22} name="database.fill" color={colors.black} />
                            <Text style={styles.buttonText}>Data</Text>
                        </Pressable>
                        <Pressable style={styles.actionButton}>
                            <IconSymbol size={22} name="shield.fill" color={colors.black} />
                            <Text style={styles.buttonText}>Privacybeleid en gebruiksvoorwaarden</Text>
                        </Pressable>
                        <Pressable style={[styles.actionButton, {marginBottom: 60}]}>
                            <IconSymbol size={22} name="info.fill" color={colors.black} />
                            <Text style={styles.buttonText}>Over de BurnoutFree app</Text>
                        </Pressable>
                    </View>
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

    backButton: {
        marginBottom: 20,
    },

    header: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    subtitle: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 40,
        marginBottom: 15,
    },

    content: {
        flex: 1,
    },

    text: {
        fontSize: 16,
    },

    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.black,
        marginTop: 5,
        marginBottom: 12,
    },

    settingBlock: {
        borderBottomWidth: 1,
        borderBottomColor: colors.gray,
        paddingBottom: 30,
        marginTop: 40
    },

    actionButton: {
        backgroundColor: colors.gray,
        padding: 20,
        paddingHorizontal: 25, 
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 10
    },

    buttonText: {
        fontSize: 14,
        fontWeight: 600,
    }
});