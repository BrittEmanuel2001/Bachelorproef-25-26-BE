import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    Image,
} from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

import { colors } from '@/styles/colors';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ProgressBar } from '@/components/ui/journal/progress-bar';
import { OptionSelector, SelectorOption } from './option-selector';
import { NumberSelector } from './number-selector';
import { KnowledgeCard } from '@/components/ui/kennis/knowledge-card';

import {
    moodOptions,
    energyOptions,
    stressOptions,
} from '@/utils/reflection-options';

type ReflectionModalProps = {
    visible: boolean;
    currentStep: number;
    totalSteps: number;
    onClose: () => void;
    onNext: () => void;
    onPrevious: () => void;
    onComplete: (data: ReflectionData) => void;
};

export type ReflectionData = {
    date: string;
    mood: number | null;
    energy: number | null;
    sleepHours: number;
    sleepNote: string;
    stress: number | null;
    stressNote: string;
    balanceNote: string;
};

export function ReflectionModal({
    visible,
    currentStep,
    totalSteps,
    onClose,
    onNext,
    onPrevious,
    onComplete,
}: ReflectionModalProps) {
    const [showExitConfirmation, setShowExitConfirmation] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [showCompletionModal, setShowCompletionModal] = useState(false);

    const [sleepNote, setSleepNote] = useState('');
    const [stressNote, setStressNote] = useState('');
    const [balanceNote, setBalanceNote] = useState('');
    const [sleepHours, setSleepHours] = useState(7);

    const [selectedOptions, setSelectedOptions] = useState<
        Record<number, number | null>
    >({
        1: null,
        2: null,
        3: null,
    });

    function isStepComplete() {
        switch (currentStep) {
            case 1:
                // Stemming verplicht
                return selectedOptions[1] !== null;

            case 2:
                // Energie + aantal uur slaap verplicht
                return selectedOptions[2] !== null && sleepHours >= 0;

            case 3:
                // Stressniveau + tekst verplicht
                return (
                    selectedOptions[3] !== null && stressNote.trim().length > 0
                );

            case 4:
                // Balanceer je gedachte verplicht
                return balanceNote.trim().length > 0;

            default:
                return false;
        }
    }

    function handleClose() {
        setShowExitConfirmation(false);

        setSleepNote('');
        setStressNote('');
        setBalanceNote('');
        setSleepHours(7);

        setSelectedOptions({
            1: null,
            2: null,
            3: null,
        });

        onClose();
    }

    function handleFinish() {
        const reflectionData: ReflectionData = {
            date: new Date().toISOString().split('T')[0],
            mood: selectedOptions[1],
            energy: selectedOptions[2],
            sleepHours,
            sleepNote,
            stress: selectedOptions[3],
            stressNote,
            balanceNote,
        };

        onComplete(reflectionData);
        setShowCompletionModal(false);
        handleClose();
    }

    function selectOption(value: number) {
        setSelectedOptions((current) => ({
            ...current,
            [currentStep]: value,
        }));
    }

    return (
        <>
            <Modal
                visible={visible}
                animationType="slide"
                transparent
                statusBarTranslucent
                onRequestClose={() => setShowExitConfirmation(true)}
            >
                <View style={styles.modal}>
                    {/* Terug */}
                    <View style={styles.topBar}>
                        <Pressable
                            onPress={() => setShowExitConfirmation(true)}
                            style={styles.backButton}
                            hitSlop={8}
                        >
                            <IconSymbol
                                size={22}
                                name="arrow.left"
                                color={colors.darkBlue}
                            />
                        </Pressable>

                        {currentStep === 4 && (
                            <Pressable
                                onPress={() => setShowInfo(true)}
                                hitSlop={8}
                                style={styles.infoButton}
                            >
                                <IconSymbol
                                    size={20}
                                    name="info.fill"
                                    color={colors.darkBlue}
                                />
                            </Pressable>
                        )}
                    </View>

                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            {currentStep === 1 && 'Stemming'}
                            {currentStep === 2 && 'Energie check-up'}
                            {currentStep === 3 && 'Stressniveau'}
                            {currentStep === 4 && 'Mindset shift'}
                        </Text>
                        <Text style={styles.subtitle}>Reflectie</Text>
                    </View>

                    {/* Progress */}
                    <ProgressBar
                        currentStep={currentStep}
                        totalSteps={totalSteps}
                    />

                    {/* Stap content */}
                    <View style={styles.content}>
                        {currentStep === 1 && (
                            <View>
                                <Text style={styles.contentSubTitle}>
                                    Stemming
                                </Text>
                                <OptionSelector
                                    options={moodOptions}
                                    selectedOption={selectedOptions[1]}
                                    onSelect={selectOption}
                                />
                            </View>
                        )}

                        {currentStep === 2 && (
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.stepScrollContent}
                            >
                                <View style={styles.settingBlock}>
                                    <Text style={styles.contentSubTitle}>
                                        Energie niveau
                                    </Text>
                                    <OptionSelector
                                        options={energyOptions}
                                        selectedOption={selectedOptions[2]}
                                        onSelect={selectOption}
                                    />
                                </View>
                                <Text
                                    style={[
                                        styles.contentSubTitle,
                                        { marginTop: 30, marginBottom: 20 },
                                    ]}
                                >
                                    Hoe heb je geslapen?
                                </Text>

                                <NumberSelector
                                    value={sleepHours}
                                    onChange={setSleepHours}
                                    min={0}
                                    max={24}
                                />

                                <TextInput
                                    value={sleepNote}
                                    onChangeText={setSleepNote}
                                    placeholder="..."
                                    placeholderTextColor={colors.darkGray}
                                    multiline
                                    textAlignVertical="top"
                                    style={styles.textInput}
                                />
                            </ScrollView>
                        )}

                        {currentStep === 3 && (
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.stepScrollContent}
                            >
                                <View style={styles.settingBlock}>
                                    <Text style={styles.contentSubTitle}>
                                        Stressniveau
                                    </Text>
                                    <OptionSelector
                                        options={stressOptions}
                                        selectedOption={selectedOptions[3]}
                                        onSelect={selectOption}
                                    />
                                </View>
                                <Text
                                    style={[
                                        styles.contentSubTitle,
                                        { marginTop: 30, marginBottom: 20 },
                                    ]}
                                >
                                    Wat houdt je op dit moment bezig?
                                </Text>
                                <TextInput
                                    value={stressNote}
                                    onChangeText={setStressNote}
                                    placeholder="..."
                                    placeholderTextColor={colors.darkGray}
                                    multiline
                                    textAlignVertical="top"
                                    style={styles.textInput}
                                />
                            </ScrollView>
                        )}

                        {currentStep === 4 && (
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.stepScrollContent}
                            >
                                <Text style={styles.infoText}>
                                    Soms voelt een gedachte zwaarder dan hij is.
                                    Door er even met wat meer afstand naar te
                                    kijken, ontstaat er ruimte voor een andere
                                    kijk.
                                </Text>
                                <Text
                                    style={[
                                        styles.contentSubTitle,
                                        { marginTop: 30, marginBottom: 20 },
                                    ]}
                                >
                                    Balanceer je gedachte
                                </Text>
                                <TextInput
                                    value={balanceNote}
                                    onChangeText={setBalanceNote}
                                    placeholder="..."
                                    placeholderTextColor={colors.darkGray}
                                    multiline
                                    textAlignVertical="top"
                                    style={styles.textInput}
                                />
                            </ScrollView>
                        )}
                    </View>

                    {/* Navigatie */}
                    <View style={styles.navigation}>
                        {currentStep > 1 && (
                            <Pressable
                                style={styles.previousButton}
                                onPress={onPrevious}
                                hitSlop={8}
                            >
                                <IconSymbol
                                    size={18}
                                    name="arrow.left"
                                    color={colors.darkBlue}
                                />
                            </Pressable>
                        )}

                        <Pressable
                            style={[
                                styles.nextButton,
                                !isStepComplete() && styles.nextButtonDisabled,
                            ]}
                            onPress={() => {
                                if (!isStepComplete()) return;
                                if (currentStep === totalSteps) {
                                    const stressLevel = selectedOptions[3];
                                    if (
                                        stressLevel !== null &&
                                        stressLevel >= 3
                                    )
                                        setShowCompletionModal(true);
                                    else {
                                        handleFinish();
                                        router.replace('/journal');
                                    }
                                } else {
                                    onNext();
                                }
                            }}
                            disabled={!isStepComplete()}
                        >
                            <Text
                                style={[
                                    styles.nextButtonText,
                                    !isStepComplete() &&
                                        styles.nextButtonTextDisabled,
                                ]}
                            >
                                {currentStep === totalSteps
                                    ? 'Opslaan'
                                    : 'Volgende'}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Exit confirmation */}
            <Modal
                visible={showExitConfirmation}
                transparent
                animationType="fade"
                onRequestClose={() => setShowExitConfirmation(false)}
            >
                <View style={styles.overlay}>
                    <View style={styles.confirmationCard}>
                        {/* Header */}
                        <View style={styles.confirmationHeader}>
                            <Text style={styles.confirmationTitle}>
                                Even checken voordat je gaat
                            </Text>
                        </View>

                        {/* Content */}
                        <View style={styles.confirmationContent}>
                            <Text style={styles.confirmationText}>
                                Je dagboek bevat nog niet-opgeslagen
                                wijzigingen. Wil je de pagina verlaten zonder
                                deze op te slaan?
                            </Text>
                        </View>

                        {/* Buttons */}
                        <View style={styles.confirmationButtons}>
                            <Pressable
                                style={styles.yesButton}
                                onPress={handleClose}
                            >
                                <Text style={styles.yesButtonText}>Ja</Text>
                            </Pressable>
                            <Pressable
                                style={styles.noButton}
                                onPress={() => setShowExitConfirmation(false)}
                            >
                                <Text style={styles.noButtonText}>Nee</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Info modal */}
            <Modal
                visible={showInfo}
                transparent
                animationType="fade"
                onRequestClose={() => setShowInfo(false)}
            >
                <View style={styles.infoOverlay}>
                    <View style={styles.infoCard}>
                        {/* Header */}
                        <View style={styles.infoHeader}>
                            <Text style={styles.infoTitle}>Mindset shift</Text>

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
                            <Text style={[styles.modalText, { marginTop: 0 }]}>
                                Soms helpt het om even vanuit een ander
                                perspectief naar een zorg te kijken. Niet om je
                                gevoel te veranderen, maar om er wat meer ruimte
                                omheen te creëren.
                            </Text>

                            <Text style={styles.modalText}>
                                Gedachte:{' '}
                                <Text style={styles.quoteText}>
                                    “Ik heb nog zoveel werk voor deze deadline.
                                    Ik ga dit nooit op tijd af krijgen.”
                                </Text>
                            </Text>

                            <Text style={styles.modalText}>
                                Shift:{' '}
                                <Text style={styles.quoteText}>
                                    “Ik heb nog veel te doen en dat voelt
                                    overweldigend. Dat betekent niet dat de
                                    deadline onhaalbaar is. Door te kijken naar
                                    wat eerst nodig is, kan er weer wat
                                    overzicht ontstaan.”
                                </Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Completion modal when stressed */}
            <Modal
                visible={showCompletionModal}
                animationType="slide"
                transparent={false}
                statusBarTranslucent
                onRequestClose={() => setShowCompletionModal(false)}
            >
                <View style={styles.completionModal}>
                    <View style={styles.completionContent}>
                        <Image
                            source={require('@/assets/images/Coach_Bubbles_Variant3.png')}
                            style={styles.completionImage}
                            resizeMode="contain"
                        />

                        <Text style={styles.completionTitle}>
                            Even ruimte maken
                        </Text>

                        <Text style={styles.completionText}>
                            Je stress lijkt momenteel hoog. Een korte oefening
                            kan helpen om je lichaam wat rustiger te laten
                            voelen.
                        </Text>

                        <KnowledgeCard
                            moduleTitle="Ademhalingsoefening"
                            lessonTitle={'Boxbreathing'}
                            backgroundImage={require('@/assets/images/ocean.png')}
                            overlayColor={colors.primary}
                            moduleIcon="leaf.fill"
                            onPress={() => {
                                handleFinish();
                                router.replace('/#');
                            }}
                        />
                    </View>

                    <Pressable
                        style={styles.completionButton}
                        onPress={() => {
                            handleFinish();
                            router.replace('/journal');
                        }}
                    >
                        <Text style={styles.completionButtonText}>Sluiten</Text>
                    </Pressable>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 20,
        paddingTop: 50,
        paddingBottom: 40,
    },

    header: {
        alignItems: 'center',
        marginBottom: 25,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 14,
        color: colors.darkMutedBlue,
        fontWeight: 'bold',
    },

    infoText: {
        fontSize: 14,
        color: colors.darkMutedBlue,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    content: {
        flex: 1,
        paddingTop: 30,
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
        width: 46,
        height: 46,
        backgroundColor: colors.gray,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    nextButton: {
        backgroundColor: colors.darkBlue,
        borderRadius: 10,
        paddingHorizontal: 25,
        paddingVertical: 13,
        alignItems: 'center',
        justifyContent: 'center',
    },

    nextButtonText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: 'bold',
    },

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    confirmationCard: {
        width: '100%',
        maxWidth: 480,
        borderRadius: 22,
        overflow: 'hidden',
        backgroundColor: colors.white,
    },

    confirmationHeader: {
        backgroundColor: colors.primary,
        alignItems: 'center',
        paddingVertical: 20,
    },

    confirmationTitle: {
        color: colors.white,
        fontSize: 17,
        fontWeight: '600',
    },

    confirmationContent: {
        backgroundColor: colors.white,
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 25,
    },

    confirmationText: {
        color: colors.darkBlue,
        fontSize: 14,
        lineHeight: 20,
        maxWidth: 260,
        textAlign: 'center',
        fontWeight: '600',
    },

    confirmationButtons: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },

    yesButton: {
        width: '50%',
        backgroundColor: colors.gray,
        borderRadius: 10,
        paddingHorizontal: 22,
        paddingVertical: 13,
    },

    yesButtonText: {
        color: colors.darkBlue,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    noButton: {
        width: '50%',
        backgroundColor: colors.darkBlue,
        borderRadius: 10,
        paddingHorizontal: 22,
        paddingVertical: 13,
    },

    noButtonText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    contentSubTitle: {
        fontSize: 18,
        fontWeight: 600,
    },

    settingBlock: {
        borderBottomWidth: 1,
        borderBottomColor: colors.gray,
        paddingBottom: 30,
        width: '100%',
    },

    textInput: {
        minHeight: 120,
        backgroundColor: colors.gray,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 14,
        color: colors.darkBlue,
    },

    stepScrollContent: {
        paddingBottom: 30,
        marginBottom: 30,
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

    infoOverlay: {
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

    modalText: {
        color: colors.white,
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '500',
        marginTop: 20,
    },

    quoteText: {
        color: colors.green,
    },

    nextButtonDisabled: {
        backgroundColor: colors.gray,
    },

    nextButtonTextDisabled: {
        color: colors.darkGray,
    },

    completionModal: {
        flex: 1,
        backgroundColor: colors.darkBlue,
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },

    completionContent: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },

    completionTitle: {
        color: colors.white,
        fontSize: 26,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 16,
        paddingHorizontal: 20,
    },

    completionText: {
        color: colors.lightBlue,
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 22,
        textAlign: 'center',
        maxWidth: 320,
        paddingHorizontal: 20,
        marginBottom: 20,
    },

    completionButton: {
        alignSelf: 'center',
        backgroundColor: colors.primary,
        borderRadius: 10,
        paddingHorizontal: 25,
        paddingVertical: 13,
        alignItems: 'center',
        justifyContent: 'center',
    },

    completionButtonText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: 'bold',
    },

    completionImage: {
        width: 160,
        height: 160,
    },
});
