import { Modal, Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';

import { colors } from '@/styles/colors';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { getSupportLevel, SupportLevel } from '@/utils/user-preferences';
import { useTranslation } from '@/utils/i18n';

export const MEDITATION_DURATIONS = [
    {
        value: 1,
        label: 'Snelle pauze',
        chipColor: colors.green,
    },
    {
        value: 3,
        label: 'Mini sessie',
        chipColor: colors.purple,
    },
    {
        value: 5,
        label: 'Medium sessie',
        chipColor: colors.primary,
    },
    {
        value: 10,
        label: 'Hele sessie',
        chipColor: colors.darkMutedBlue,
    },
];

const RECOMMENDED_MEDITATION_DURATION: Record<SupportLevel, number> = {
    low: 3,
    medium: 5,
    high: 10,
};

export type MeditationSoundType = 'quiet' | 'rain' | 'ocean' | 'forest';
export const MEDITATION_SOUNDS: {
    value: MeditationSoundType;
    label: string;
    icon: string;
    color: string;
    bgcolor?: string;
}[] = [
    {
        value: 'quiet',
        label: 'Stilte',
        icon: 'mute.fill',
        color: colors.darkGray,
    },
    {
        value: 'rain',
        label: 'Regen',
        icon: 'rain.fill',
        color: colors.mutedPurple,
        bgcolor: colors.lightMutedPurple
    },
    {
        value: 'ocean',
        label: 'Oceaan',
        icon: 'ocean.fill',
        color: colors.mutedBlue,
        bgcolor: colors.lightMutedBlue
    },
    {
        value: 'forest',
        label: 'Bos',
        icon: 'tree.fill',
        color: colors.mutedGreen,
        bgcolor: colors.lightMutedGreen
    },
];

export type MeditationData = {
    duration: number;
    soundType: MeditationSoundType;
};

type MeditationModalProps = {
    visible: boolean;
    onClose: () => void;
    onStart: (data: MeditationData) => void;
};

export function MeditationModal({ visible, onClose, onStart }: MeditationModalProps) {
    const { t } = useTranslation();

    const [currentStep, setCurrentStep] = useState(1);
    const [supportLevel, setSupportLevel] = useState<SupportLevel>('medium');
    const [duration, setDuration] = useState<number | null>(null);
    const [soundType, setSoundType] = useState<MeditationSoundType | null>(null);

    useEffect(() => {
        if (!visible) return;
        getSupportLevel().then(setSupportLevel);
    }, [visible]);

    const recommendedDuration = RECOMMENDED_MEDITATION_DURATION[supportLevel];
    const [showExerciseModal, setShowExerciseModal] = useState(false);

    function handleClose() {
        setShowExerciseModal(false);
        setCurrentStep(1);
        setDuration(null);
        setSoundType(null);
        onClose();
    }

    function handleNext() {
        if (currentStep === 1 && duration !== null) setCurrentStep(2);
    }

    function handlePrevious() {
        if (currentStep === 2) setCurrentStep(1);
    }

    function handleStart() {
        if (duration === null || soundType === null) return;
        onStart({duration, soundType});
    }

    return (
        <>
            <Modal
                visible={visible}
                animationType="slide"
                transparent
                statusBarTranslucent
            >
                <View style={styles.modal}>

                    {/* Top bar */}
                    <View style={styles.topBar}>
                        <Pressable
                            onPress={ handleClose }
                            style={styles.backButton}
                            hitSlop={8}
                        >
                            <IconSymbol size={22} name="arrow.left" color={colors.darkBlue}/>
                        </Pressable>

                        <Pressable
                            onPress={() => router.push('/kennis')}
                            hitSlop={8}
                            style={styles.infoButton}
                        >
                            <IconSymbol
                                size={20}
                                name="info.fill"
                                color={colors.darkBlue}
                            />
                        </Pressable>
                    </View>

                    {/* Header */}
                    <View style={styles.header}>
                        <View style={{backgroundColor: colors.lightBlue, padding: 20, borderRadius:10}}>
                            <IconSymbol size={40} name="spa.fill" color={colors.darkBlue}/>
                        </View>
                        <View>
                            <Text style={styles.title}>{t('meditation.title')}</Text>
                            <Text style={styles.subtitle}>{t('meditation.subtitle')}</Text>
                        </View>
                    </View>

                    {/* Stap content */}
                    <View style={styles.content}>
                        {currentStep === 1 && (
                            <View>
                                <View>
                                    <Text style={styles.contentSubTitle}>{t('meditation.duration')}</Text>
                                </View>

                                <View style={styles.options}>
                                    {MEDITATION_DURATIONS.map((durationOption) => {
                                        const isRecommended = durationOption.value === recommendedDuration;

                                        return (
                                            <View key={durationOption.value} style={styles.optionWrapper}>
                                                {isRecommended && (
                                                    <View style={styles.recommendedLabel}>
                                                        <Text style={styles.recommendedLabelText}>
                                                            {t('meditation.recommended')}
                                                        </Text>
                                                        <Image
                                                            source={require('@/assets/images/Coach_Bubbles_Variant3.png')}
                                                            style={styles.recommendedCoach}
                                                            resizeMode="contain"
                                                        />
                                                    </View>
                                                )}

                                                <Pressable
                                                    key={durationOption.value}
                                                    onPress={() => {
                                                        setDuration(durationOption.value);
                                                        setCurrentStep(2);
                                                    }}
                                                    style={[
                                                        styles.optionButton,
                                                        duration === durationOption.value &&
                                                            styles.optionButtonSelected,
                                                    ]}
                                                >
                                                    {/* Chip */}
                                                    <View style={[styles.durationChip, {backgroundColor: durationOption.chipColor}]}>
                                                        <Text style={styles.durationChipText}>
                                                            {t(`meditation.${durationOption.value === 1 ? 'quick' : durationOption.value === 3 ? 'mini' : durationOption.value === 5 ? 'medium' : 'full'}`)}
                                                        </Text>
                                                    </View>

                                                    {/* Duration */}
                                                    <View style={styles.durationValue}>
                                                        <Text
                                                            style={[
                                                                styles.optionNumber,
                                                                duration === durationOption.value &&
                                                                    styles.optionNumberSelected,
                                                            ]}
                                                        >
                                                            {durationOption.value}
                                                        </Text>

                                                        <Text
                                                            style={[
                                                                styles.optionUnit,
                                                                duration === durationOption.value &&
                                                                    styles.optionUnitSelected,
                                                            ]}
                                                        >
                                                            min
                                                        </Text>
                                                    </View>
                                                </Pressable>
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>
                        )}

                        {currentStep === 2 && (
                            <View>
                                <View>
                                    <Text style={styles.contentSubTitle}>{t('meditation.sound')}</Text>
                                </View>
                                <View style={styles.options}>
                                    {MEDITATION_SOUNDS.map((option) => (
                                        <Pressable
                                            key={option.value}
                                            onPress={() => setSoundType(option.value)}
                                            style={[styles.soundOptionButton,soundType === option.value && styles.optionButtonSelected]}
                                        >
                                            <View style={[styles.soundIcon, {backgroundColor: option.bgcolor ?? colors.white}]}>
                                                <IconSymbol size={28} name={option.icon} color={option.color} />
                                            </View>
                                            <Text style={[styles.optionText,soundType === option.value && styles.optionTextSelected]}>
                                                {t(`meditation.${option.value === 'quiet' ? 'silence' : option.value}`)}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>
                        )}
                    </View>

                    {/* Navigatie */}
                    <View style={styles.navigation}>
                        {currentStep === 1 && duration !== null && (
                            <>
                                <Pressable
                                    style={styles.previousButton}
                                    onPress={handleNext}
                                >
                                    <Text style={styles.previousButtonText}>{t('common.next')}</Text>
                                </Pressable>
                            </>
                        )}
                        {currentStep === 2 && (
                            <>
                                <Pressable
                                    style={styles.previousButton}
                                    onPress={handlePrevious}
                                >
                                    <Text style={styles.previousButtonText}>{t('meditation.changeDuration')}</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.nextButton, soundType === null && styles.nextButtonDisabled]}
                                    disabled={soundType === null}
                                    onPress={handleStart}
                                >
                                    <IconSymbol size={20} name="play" color={colors.white} />
                                    <Text style={styles.nextButtonText}>{t('meditation.start')}</Text>
                                </Pressable>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </>
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

    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    backButton: {
        alignSelf: 'flex-start',
    },

    infoButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        marginTop: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    subtitle: {
        fontSize: 14,
        color: colors.darkMutedBlue,
        fontWeight: 'bold',
    },

    content: {
        flex: 1,
        paddingTop: 20,
    },

    contentSubTitle: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '600',
        color: colors.white,
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 10
    },

    options: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        gap: 12,
        marginTop: 25,
    },

    optionWrapper: {
        width: '48%',
    },

    optionButton: {
        width: '100%',
        padding: 16,
        borderRadius: 12,
        backgroundColor: colors.white,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        gap: 5,
        position: 'relative',
    },

    soundOptionButton: {
        width: '48%',
        padding: 16,
        borderRadius: 12,
        backgroundColor: colors.white,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        gap: 5,
        position: 'relative',
    },

    optionButtonSelected: {
        backgroundColor: colors.darkBlue,
    },

    optionNumber: {
        fontSize: 36,
        fontWeight: '700',
        color: colors.darkBlue,
        marginTop: 10,
    },

    optionNumberSelected: {
        color: colors.white,
    },

    optionUnit: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.darkBlue,
        marginBottom: 5,
    },

    optionUnitSelected: {
        color: colors.white,
    },

    durationValue: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 5,
        width: '100%'
    },

    durationChip: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: colors.lightBlue,
        borderRadius: 20,
        paddingHorizontal: 9,
        paddingVertical: 5,
    },

    durationChipText: {
        fontSize: 10,
        fontWeight: '600',
        color: colors.white,
    },

    optionText: {
        color: colors.darkBlue,
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 5,
    },

    optionTextSelected: {
        color: colors.white,
    },

    navigation: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 10,
        marginBottom: 30,
        marginTop: 20,
    },

    previousButton: {
        backgroundColor: colors.gray,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 13,
    },

    previousButtonText: {
        color: colors.darkBlue,
        fontSize: 14,
        fontWeight: 'bold',
    },

    nextButton: {
        backgroundColor: colors.green,
        borderRadius: 10,
        paddingLeft: 22,
        paddingRight: 25,
        paddingVertical: 13,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
    },

    nextButtonDisabled: {
        backgroundColor: colors.mutedGreen,
    },

    nextButtonText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: 'bold',
    },

    soundIcon: {
        width: 70,
        height: 70,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },

    recommendedLabel: {
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 4,
        paddingRight: 4,
        marginTop: 10
    },

    recommendedLabelText: {
        color: colors.darkMutedBlue,
        fontSize: 12,
        fontWeight: '700',
        textAlign: 'right',
        width: '40%',
    },

    recommendedCoach: {
        width: 75,
        height: 75,
    },
});