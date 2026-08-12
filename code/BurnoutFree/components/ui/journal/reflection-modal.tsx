import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { colors } from '@/styles/colors';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ProgressBar } from '@/components/ui/journal/progress-bar';
import { OptionSelector, SelectorOption } from './option-selector';

type ReflectionModalProps = {
    visible: boolean;
    currentStep: number;
    totalSteps: number;
    onClose: () => void;
    onNext: () => void;
    onPrevious: () => void;
};

const moodOptions: SelectorOption[] = [
    {
        id: 1,
        label: 'Lastig',
        color: colors.red,
        icon: 'face.really.unhappy',
    },
    {
        id: 2,
        label: 'Beetje minder',
        color: colors.purple,
        icon: 'face.unhappy',
    },
    {
        id: 3,
        label: 'Oké',
        color: colors.darkGray,
        icon: 'face.neutral',
    },
    {
        id: 4,
        label: 'Goed',
        color: colors.green,
        icon: 'face.happy',
    },
    {
        id: 5,
        label: 'Heel goed',
        color: colors.darkGreen,
        icon: 'face.really.happy',
    },
];

const energyOptions: SelectorOption[] = [
    {
        id: 1,
        label: 'Uitgeput',
        color: colors.darkBlue,
    },
    {
        id: 2,
        label: 'Moe',
        color: colors.purple,
    },
    {
        id: 3,
        label: 'Gemiddeld',
        color: colors.darkGray,
    },
    {
        id: 4,
        label: 'Energiek',
        color: colors.green,
    },
    {
        id: 5,
        label: 'Vol energie',
        color: colors.darkGreen,
    },
];

const stressOptions: SelectorOption[] = [
    {
        id: 1,
        label: 'Helemaal gespannen',
        color: colors.red,
    },
    {
        id: 2,
        label: 'Gespannen',
        color: colors.purple,
    },
    {
        id: 3,
        label: 'Gemiddeld',
        color: colors.darkGray,
    },
    {
        id: 4,
        label: 'Rustig',
        color: colors.green,
    },
    {
        id: 5,
        label: 'Helemaal ontspannen',
        color: colors.darkGreen,
    },
];

export function ReflectionModal({ visible, currentStep, totalSteps, onClose, onNext, onPrevious }: ReflectionModalProps) {

    const [showExitConfirmation, setShowExitConfirmation] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<Record<number, number | null>>({
        1: null,
        2: null,
        3: null,
        4: null,
    });

    function handleClose() {
        setShowExitConfirmation(false);
        onClose();
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

                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            {currentStep === 1 && ('Stemming')}
                            {currentStep === 2 && ('Energie check-up')}
                            {currentStep === 3 && ('Stressniveau')}
                            {currentStep === 4 && ('Mindset shift')}
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
                                <Text style={styles.contentSubTitle}>Stemming</Text>
                                <OptionSelector
                                    options={moodOptions}
                                    selectedOption={selectedOptions[1]}
                                    onSelect={selectOption}
                                />
                            </View>
                        )}

                        {currentStep === 2 && (
                            <View>
                                <Text style={styles.contentSubTitle}> Energie niveau</Text>
                                <OptionSelector
                                    options={energyOptions}
                                    selectedOption={selectedOptions[2]}
                                    onSelect={selectOption}
                                />
                            </View>
                        )}

                        {currentStep === 3 && (
                            <View>
                                <Text style={styles.contentSubTitle}>Stress niveau </Text>
                                <OptionSelector
                                    options={stressOptions}
                                    selectedOption={selectedOptions[3]}
                                    onSelect={selectOption}
                                />
                            </View>
                        )}

                        {currentStep === 4 && (
                            <Text>Stap 4: Wat neem je mee uit vandaag?</Text>
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
                            style={styles.nextButton}
                            onPress={onNext}
                        >
                            <Text style={styles.nextButtonText}>
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
                                wijzigingen. Wil je de pagina verlaten
                                zonder deze op te slaan?
                            </Text>
                        </View>

                        {/* Buttons */}
                        <View style={styles.confirmationButtons}>
                            <Pressable style={styles.yesButton} onPress={handleClose}>
                                <Text style={styles.yesButtonText}> Ja </Text>
                            </Pressable>
                            <Pressable style={styles.noButton} onPress={() => setShowExitConfirmation(false)}>
                                <Text style={styles.noButtonText}> Nee </Text>
                            </Pressable>
                        </View>

                    </View>
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

    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
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

    content: {
        flex: 1,
        paddingTop: 30,
    },

    navigation: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 10,
        marginBottom: 30
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
    }
});