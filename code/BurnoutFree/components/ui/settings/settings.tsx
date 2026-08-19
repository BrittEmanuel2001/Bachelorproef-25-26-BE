import {
    Alert,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { colors } from '@/styles/colors';
import { IconHeader } from '../icon-header';
import { OptionSelector } from '../option-selector';
import { KnowledgeCard } from '../kennis/knowledge-card';
import { EmergencyContact } from './emergency-contact';
import { NotificationFunction } from './notification-function';

import { saveSupportLevel } from '@/utils/user-preferences';
import { cancelDemoNotification, scheduleDemoNotification, scheduleDemoNotifications } from '@/utils/notifications';

type SettingsProps = {
    visible: boolean;
    onClose: () => void;
};

function isValidPhoneNumber(value: string): boolean {
    if (!value || !value.trim()) {
        return false;
    }

    const cleanedValue = value.replace(/[\s().-]/g, '');
    return /^\+?[0-9]{8,15}$/.test(cleanedValue);
}

type NotificationTime = {
    hour: number;
    minute: number;
};

type NotificationProfile = {
    anonSupport: boolean;
    journal: NotificationTime[];
    breathing: NotificationTime[];
    meditation: NotificationTime[];
};

/*
 * Proof-of-concept personalisatie:
 *
 * De combinatie van het gewenste ondersteuningsniveau en
 * de behoefte aan reminders bepaalt welke notificaties
 * standaard worden aangeboden.
 *
 * In een productieomgeving zou deze logica bijvoorbeeld
 * vanuit een backend/personalisation service kunnen komen.
 */

const notificationProfiles: Record<string, NotificationProfile> = {
    // LOW SUPPORT
    // De gebruiker wil weinig begeleiding.
    // Reminderbehoefte bepaalt vooral de frequentie.

    low_low: {
        anonSupport: false,
        journal: [],
        breathing: [],
        meditation: [],
    },

    low_medium: {
        anonSupport: false,
        journal: [{ hour: 9, minute: 0 }],
        breathing: [{ hour: 14, minute: 0 }],
        meditation: [],
    },

    low_high: {
        anonSupport: true,
        journal: [{ hour: 9, minute: 0 }],
        breathing: [
            { hour: 9, minute: 0 },
            { hour: 14, minute: 0 },
            { hour: 19, minute: 0 },
        ],
        meditation: [],
    },

    // MEDIUM SUPPORT
    // Meer variatie in begeleiding, zonder meteen
    // een zeer hoge notificatiefrequentie.

    medium_low: {
        anonSupport: false,
        journal: [{ hour: 9, minute: 0 }],
        breathing: [{ hour: 14, minute: 0 }],
        meditation: [],
    },

    medium_medium: {
        anonSupport: true,
        journal: [{ hour: 9, minute: 0 }],
        breathing: [{ hour: 14, minute: 0 }],
        meditation: [{ hour: 19, minute: 0 }],
    },

    medium_high: {
        anonSupport: true,
        journal: [{ hour: 9, minute: 0 }],
        breathing: [
            { hour: 9, minute: 0 },
            { hour: 14, minute: 0 },
            { hour: 19, minute: 0 },
        ],
        meditation: [{ hour: 19, minute: 0 }],
    },

    // HIGH SUPPORT
    // Meer vormen van begeleiding worden aangeboden.
    // Bij hoge reminderbehoefte wordt ook de frequentie verhoogd.

    high_low: {
        anonSupport: true,
        journal: [{ hour: 9, minute: 0 }],
        breathing: [{ hour: 14, minute: 0 }],
        meditation: [{ hour: 19, minute: 0 }],
    },

    high_medium: {
        anonSupport: true,
        journal: [{ hour: 9, minute: 0 }],
        breathing: [
            { hour: 9, minute: 0 },
            { hour: 14, minute: 0 },
        ],
        meditation: [{ hour: 19, minute: 0 }],
    },

    high_high: {
        anonSupport: true,
        journal: [{ hour: 9, minute: 0 }],
        breathing: [
            { hour: 9, minute: 0 },
            { hour: 14, minute: 0 },
            { hour: 19, minute: 0 },
        ],
        meditation: [
            { hour: 9, minute: 0 },
            { hour: 19, minute: 0 },
        ],
    },
};

export function Settings({ visible, onClose }: SettingsProps) {
    const [supportLevel, setSupportLevel] = useState<'low' | 'medium' | 'high'>(
        'low',
    );
    const [reminderNeed, setReminderNeed] = useState<'low' | 'medium' | 'high'>(
        'low',
    );
    const emergencyContactPhoneNumber = '+32 123 456 789';
    const isEmergencyContactValid = isValidPhoneNumber(
        emergencyContactPhoneNumber,
    );

    async function handleSupportLevelChange(value: 'low' | 'medium' | 'high') {
        setSupportLevel(value);
        await saveSupportLevel(value);
    }

    const [anonSupportEnabled, setAnonSupportEnabled] = useState(false);
    const [journalEnabled, setJournalEnabled] = useState(true);
    const [breathingEnabled, setBreathingEnabled] = useState(true);
    const [meditationEnabled, setMeditationEnabled] = useState(true);

    const [journalTimes, setJournalTimes] = useState<NotificationTime[]>([
        { hour: 9, minute: 0 },
    ]);

    const [breathingTimes, setBreathingTimes] = useState<NotificationTime[]>([
        { hour: 9, minute: 0 },
        { hour: 14, minute: 0 },
        { hour: 19, minute: 0 },
    ]);

    const [meditationTimes, setMeditationTimes] = useState<NotificationTime[]>([
        { hour: 9, minute: 0 },
    ]);

    const profileKey = `${supportLevel}_${reminderNeed}`;
    const notificationProfile = notificationProfiles[profileKey];
    const previousProfileKey = useRef(profileKey);

    useEffect(() => {
        const profileChanged = previousProfileKey.current !== profileKey;
        previousProfileKey.current = profileKey;

        setAnonSupportEnabled(notificationProfile.anonSupport);

        setJournalEnabled(notificationProfile.journal.length > 0);
        setJournalTimes(notificationProfile.journal);

        setBreathingEnabled(notificationProfile.breathing.length > 0);
        setBreathingTimes(notificationProfile.breathing);

        setMeditationEnabled(notificationProfile.meditation.length > 0);
        setMeditationTimes(notificationProfile.meditation);

        if (!profileChanged) {
            return;
        }

        const profileNotifications = [
            notificationProfile.anonSupport
                ? { key: 'encouragements', name: 'Anonieme aanmoedigingen' }
                : null,
            notificationProfile.journal.length > 0
                ? { key: 'journal', name: 'Dagboek' }
                : null,
            notificationProfile.breathing.length > 0
                ? { key: 'breathing', name: 'Ademhalingspauze' }
                : null,
            notificationProfile.meditation.length > 0
                ? { key: 'meditation', name: 'Meditatie' }
                : null,
        ].filter((notification): notification is { key: string; name: string } =>
            notification !== null,
        );

        if (profileNotifications.length === 0) {
            return;
        }

        scheduleDemoNotifications(profileNotifications).then((scheduled) => {
            if (!scheduled) {

                setAnonSupportEnabled(false);
                setJournalEnabled(false);
                setBreathingEnabled(false);
                setMeditationEnabled(false);

                Alert.alert(
                    'Notificaties niet beschikbaar',
                    'Geef BurnoutFree toestemming in de instellingen van je gsm. Je kan de app verder blijven gebruiken zonder notificaties.',
                );
            }
        });
    }, [
        profileKey,
        notificationProfile.anonSupport,
        notificationProfile.breathing,
        notificationProfile.journal,
        notificationProfile.meditation,
    ]);

    function formatTime(time: NotificationTime): string {
        return `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`;
    }

    async function handleNotificationToggle(
        key: string,
        name: string,
        enabled: boolean,
        setEnabled: (value: boolean) => void,
    ) {
        if (enabled) {
            await cancelDemoNotification(key);
            setEnabled(false);
            return;
        }

        const scheduled = await scheduleDemoNotification(key, name);
        if (scheduled) {
            setEnabled(true);
            return;
        }

        Alert.alert(
            'Notificaties niet beschikbaar',
            'Geef BurnoutFree toestemming in de instellingen van je gsm. Je kan de app verder blijven gebruiken zonder notificaties.',
        );
    }

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
                <Pressable onPress={onClose} style={styles.backButton}>
                    <IconSymbol
                        size={22}
                        name="arrow.left"
                        color={colors.darkBlue}
                    />
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
                                        Met deze instelling geef je aan hoeveel
                                        begeleiding je graag krijgt.
                                    </Text>

                                    {'\n\n'}

                                    <Text>
                                        De app gebruikt dit samen met je
                                        behoefte aan reminders om oefeningen,
                                        cursussen en notificaties op jou af te
                                        stemmen.
                                    </Text>

                                    {'\n\n'}

                                    <Text style={{ color: colors.green }}>
                                        Heb je bijvoorbeeld gemiddeld behoefte
                                        aan ondersteuning en veel nood aan
                                        reminders? Dan kan je vaker een
                                        herinnering krijgen voor een
                                        ademhalingspauze.
                                    </Text>

                                    {'\n\n'}

                                    <Text>
                                        Bij een hogere begeleidingsintensiteit
                                        kan de app je daarnaast vaker een
                                        meditatie aanbevelen of een langere
                                        sessie voorstellen.
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
                                onChange={handleSupportLevelChange}
                            />
                        </View>

                        <View>
                            <Text style={styles.label}>Nood aan reminders</Text>

                            <OptionSelector
                                value={reminderNeed}
                                onChange={setReminderNeed}
                            />
                        </View>
                    </View>

                    {/* Notificaties */}
                    <View style={styles.settingBlock}>
                        <IconHeader title="Notificaties" icon="bell.fill" />

                        <NotificationFunction
                            name="Anonieme aanmoedigingen"
                            icon="hand.heart.fill"
                            enabled={anonSupportEnabled}
                            onToggle={() =>
                                handleNotificationToggle(
                                    'encouragements',
                                    'Anonieme aanmoedigingen',
                                    anonSupportEnabled,
                                    setAnonSupportEnabled,
                                )
                            }
                        />

                        <NotificationFunction
                            name="Dagboek"
                            icon="journal.fill"
                            times={journalTimes.map(formatTime)}
                            enabled={journalEnabled}
                            onToggle={() =>
                                handleNotificationToggle(
                                    'journal',
                                    'Dagboek',
                                    journalEnabled,
                                    setJournalEnabled,
                                )
                            }
                        />

                        <NotificationFunction
                            name="Ademhalingspauze"
                            icon="leaf.fill"
                            times={breathingTimes.map(formatTime)}
                            enabled={breathingEnabled}
                            onToggle={() =>
                                handleNotificationToggle(
                                    'breathing',
                                    'Ademhalingspauze',
                                    breathingEnabled,
                                    setBreathingEnabled,
                                )
                            }
                        />

                        <NotificationFunction
                            name="Meditatie"
                            icon="spa.fill"
                            times={meditationTimes.map(formatTime)}
                            enabled={meditationEnabled}
                            onToggle={() =>
                                handleNotificationToggle(
                                    'meditation',
                                    'Meditatie',
                                    meditationEnabled,
                                    setMeditationEnabled,
                                )
                            }
                        />
                    </View>

                    {/* Noodcontact */}
                    <View style={styles.settingBlock}>
                        <IconHeader
                            title="Noodcontact"
                            icon="phone.fill"
                            infoText={
                                <>
                                    <Text>
                                        Noodcontacten zijn mensen die je kan
                                        bereiken wanneer je iemand nodig hebt of
                                        wanneer het even moeilijk gaat.
                                    </Text>

                                    {'\n\n'}

                                    <Text style={{ color: colors.green }}>
                                        Je kan meerdere noodcontacten toevoegen,
                                        zoals een partner, familielid,
                                        vriend(in) of andere naaste.
                                    </Text>
                                </>
                            }
                        />

                        {isEmergencyContactValid ? (
                            <EmergencyContact
                                name="Jane Doe"
                                phoneNumber={emergencyContactPhoneNumber}
                            />
                        ) : (
                            <Text style={styles.errorText}>
                                Het noodcontact kan niet worden aangemaakt omdat
                                het telefoonnummer ongeldig is.
                            </Text>
                        )}

                        <Pressable
                            style={[styles.actionButton, { marginBottom: 10 }]}
                        >
                            <IconSymbol
                                size={22}
                                name="add"
                                color={colors.black}
                            />
                            <Text style={styles.buttonText}>
                                Nieuw contact toevoegen
                            </Text>
                        </Pressable>

                        <KnowledgeCard
                            moduleTitle="Soms helpt een gesprek met een naaste, maar soms is extra ondersteuning nodig."
                            lessonTitle={
                                'Bekijk hier betrouwbare hulpverleners en organisaties'
                            }
                            backgroundImage={require('@/assets/images/handsBackground.png')}
                        />
                    </View>

                    {/* Andere */}
                    <View>
                        <Text style={styles.subtitle}>Andere</Text>
                        <Pressable style={styles.actionButton}>
                            <IconSymbol
                                size={22}
                                name="database.fill"
                                color={colors.black}
                            />
                            <Text style={styles.buttonText}>Data</Text>
                        </Pressable>
                        <Pressable style={styles.actionButton}>
                            <IconSymbol
                                size={22}
                                name="shield.fill"
                                color={colors.black}
                            />
                            <Text style={styles.buttonText}>
                                Privacybeleid en gebruiksvoorwaarden
                            </Text>
                        </Pressable>
                        <Pressable
                            style={[styles.actionButton, { marginBottom: 60 }]}
                        >
                            <IconSymbol
                                size={22}
                                name="info.fill"
                                color={colors.black}
                            />
                            <Text style={styles.buttonText}>
                                Over de BurnoutFree app
                            </Text>
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
        marginTop: 40,
    },

    actionButton: {
        backgroundColor: colors.gray,
        padding: 20,
        paddingHorizontal: 25,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 10,
    },

    buttonText: {
        fontSize: 14,
        fontWeight: 600,
    },

    errorText: {
        marginBottom: 10,
        color: colors.red,
        fontSize: 13,
        fontWeight: '600',
    },
});
