import { useState, useCallback } from 'react';
import { Modal, Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { useFocusEffect, router, useLocalSearchParams } from 'expo-router';

import { colors } from '@/styles/colors';
import {
    MeditationModal,
    MeditationData,
} from '@/components/ui/meditatie/meditation-modal';
import { MeditationExercise } from '@/components/ui/meditatie/meditation-exercise';
import { KnowledgeCard } from '@/components/ui/kennis/knowledge-card';

export default function MeditationScreen() {
    const params = useLocalSearchParams();
    const [meditationVisible, setMeditationVisible] = useState(false);
    const [meditationData, setMeditationData] = useState<MeditationData | null>(
        null,
    );
    const [showCompletion, setShowCompletion] = useState(false);

    // Alleen de instellingenmodal openen wanneer er nog geen
    // actieve meditatie is. Skip als er parameters zijn meegegeven.
    useFocusEffect(
        useCallback(() => {
            if (!meditationData && !showCompletion) {
                // Check voor preset instellingen (bv. van CheckupCard)
                if (params.duration && params.sound) {
                    const duration = parseInt(params.duration as string);
                    const sound = params.sound as MeditationData['soundType'];
                    setMeditationData({ duration, soundType: sound });
                } else {
                    setMeditationVisible(true);
                }
            }
        }, [meditationData, showCompletion, params]),
    );

    function closeMeditation() {
        setMeditationVisible(false);
        router.back();
    }

    function handleMeditationStart(data: MeditationData) {
        setMeditationData(data);
        setMeditationVisible(false);
    }

    function handleCompletionClose() {
        setShowCompletion(false);
        router.back();
    }

    const handleMeditationFinish = useCallback((completed: boolean) => {
        setMeditationData(null);
        setMeditationVisible(false);

        if (completed) setShowCompletion(true);
        else router.back();
    }, []);

    if (meditationData) {
        return (
            <MeditationExercise
                duration={meditationData.duration}
                soundType={meditationData.soundType}
                onFinish={handleMeditationFinish}
            />
        );
    }

    return (
        <>
            <MeditationModal
                visible={meditationVisible}
                onClose={closeMeditation}
                onStart={handleMeditationStart}
            />

            {/* Meditation completed */}
            <Modal
                visible={showCompletion}
                transparent
                animationType="fade"
                onRequestClose={handleCompletionClose}
            >
                <View style={styles.completionModal}>
                    <View style={styles.completionContent}>
                        <View style={styles.completionContent}>
                            <Image
                                source={require('@/assets/images/Coach_Bubbles_Variant4.png')}
                                style={styles.completionImage}
                                resizeMode="contain"
                            />

                            <Text style={styles.completionTitle}>
                                Helemaal klaar!
                            </Text>

                            <Text style={styles.completionText}>
                                Je gaf je gedachten even ruimte, mooi gedaan!
                            </Text>

                            <KnowledgeCard
                                moduleTitle="Wist je dat?"
                                lessonTitle={
                                    'Je niet altijd meteen een effect hoeft te voelen? Elke sessie is een moment waarop je even tijd voor jezelf neemt.'
                                }
                                backgroundImage={require('@/assets/images/mountains.png')}
                                overlayColor={colors.brightPurple}
                            />
                        </View>

                        <Pressable
                            style={styles.completionButton}
                            onPress={handleCompletionClose}
                        >
                            <Text style={styles.completionButtonText}>
                                Sluiten
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    completionModal: {
        flex: 1,
        backgroundColor: colors.white,
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
        marginBottom: 50,
        marginTop: 20,
    },

    completionTitle: {
        color: colors.black,
        fontSize: 26,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 16,
        paddingHorizontal: 20,
    },

    completionText: {
        color: colors.darkMutedBlue,
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 20,
        textAlign: 'center',
        maxWidth: 250,
        paddingHorizontal: 20,
        marginBottom: 25,
    },

    completionButton: {
        alignSelf: 'center',
        backgroundColor: colors.darkBlue,
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
        width: 180,
        height: 180,
        marginBottom: -5,
    },
});
