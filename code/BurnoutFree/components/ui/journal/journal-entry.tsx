import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { colors } from '@/styles/colors';
import { IconSymbol } from '../icon-symbol';
import { ReflectionData } from './reflection-modal';
import { OptionSelector } from './option-selector';
import {
    moodOptions,
    energyOptions,
    stressOptions,
} from '@/utils/reflection-options';
import { useTranslation } from '@/utils/i18n';

type JournalEntryProps = {
    visible: boolean;
    onClose: () => void;
    reflection: ReflectionData | null;
};

export function JournalEntry({
    visible,
    onClose,
    reflection,
}: JournalEntryProps) {
    const { t, locale } = useTranslation();

    if (!reflection) {
        return null;
    }

    const formattedDate = new Date(
        `${reflection.date}T00:00:00`,
    ).toLocaleDateString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

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
                    hitSlop={8}
                >
                    <IconSymbol
                        size={22}
                        name="arrow.left"
                        color={colors.darkBlue}
                    />
                </Pressable>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Titel */}
                    <View style={styles.header}>
                        <Text style={styles.title}>{t('journal.entry')}</Text>
                        <Text style={styles.subtitle}>{formattedDate}</Text>
                    </View>

                    {/* Stemming */}
                    <View style={styles.section}>
                        <Text style={[styles.label, { marginBottom: 0 }]}>
                            {t('journal.mood')}
                        </Text>
                        <OptionSelector
                            options={moodOptions}
                            selectedOption={reflection.mood}
                            disabled
                        />
                    </View>

                    {/* Energie niveau */}
                    <View style={styles.section}>
                        <Text style={[styles.label, { marginBottom: 0 }]}>
                            {t('journal.energy')}
                        </Text>
                        <OptionSelector
                            options={energyOptions}
                            selectedOption={reflection.energy}
                            disabled
                        />

                        <Text style={[styles.label, { marginTop: 30 }]}>
                            {t('journal.sleep')}
                        </Text>
                        {reflection.sleepHours !== null &&
                        reflection.sleepHours !== undefined ? (
                            <Text style={styles.sleepHours}>
                                {reflection.sleepHours}
                                <Text style={styles.sleepHoursUnit}>
                                    {' '}
                                    {t('journal.hour')}
                                </Text>
                            </Text>
                        ) : (
                            <Text style={styles.answer}>
                                {t('journal.noAnswer')}
                            </Text>
                        )}
                        {reflection.sleepNote && (
                            <View style={styles.noteSection}>
                                <Text style={styles.answer}>
                                    {reflection.sleepNote}
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* Stress */}
                    <View style={[styles.section, { borderBottomWidth: 0 }]}>
                        <Text style={styles.label}>{t('journal.stress')}</Text>
                        <OptionSelector
                            options={stressOptions}
                            selectedOption={reflection.stress}
                            disabled
                        />
                        {reflection.stressNote && (
                            <View style={styles.noteSection}>
                                <Text style={styles.answer}>
                                    {reflection.stressNote}
                                </Text>
                            </View>
                        )}
                        {reflection.balanceNote && (
                            <View>
                                <Text style={[styles.sublabel]}>
                                    {t('journal.balancedThought')}
                                </Text>
                                <View
                                    style={[
                                        styles.noteSection,
                                        { marginTop: 0 },
                                    ]}
                                >
                                    <Text style={styles.answer}>
                                        {reflection.balanceNote}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 50,
    },

    backButton: {
        marginBottom: 20,
    },

    header: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    subtitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.darkMutedBlue,
        marginBottom: 20,
    },

    date: {
        textAlign: 'center',
        color: colors.darkMutedBlue,
        fontSize: 13,
        marginBottom: 30,
    },

    answerCard: {
        backgroundColor: colors.gray,
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
    },

    question: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.darkBlue,
        marginBottom: 8,
    },

    answer: {
        fontSize: 13,
        color: colors.darkGray,
        lineHeight: 18,
        fontWeight: '600',
    },

    label: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.black,
        marginBottom: 20,
    },

    sublabel: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.black,
        marginVertical: 20,
    },

    subLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.black,
        marginTop: 5,
        marginBottom: 12,
    },

    section: {
        borderBottomWidth: 1,
        borderBottomColor: colors.gray,
        paddingBottom: 30,
        marginBottom: 40,
        width: '100%',
    },

    noteSection: {
        minHeight: 80,
        backgroundColor: colors.gray,
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 20,
        fontSize: 14,
        marginTop: 30,
        marginBottom: 20,
    },

    sleepHours: {
        fontSize: 40,
        fontWeight: '900',
        color: colors.darkBlue,
        textAlign: 'center',
    },

    sleepHoursUnit: {
        fontSize: 16,
        fontWeight: '600',
    },
});
