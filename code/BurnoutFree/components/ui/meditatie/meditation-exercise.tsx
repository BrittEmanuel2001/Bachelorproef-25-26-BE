import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/styles/colors';

import { MeditationSoundType } from './meditation-modal';

type MeditationExerciseProps = {
    duration: number;
    soundType: MeditationSoundType;
    onFinish: () => void;
};

export function MeditationExercise({
    duration,
    soundType,
    onFinish,
}: MeditationExerciseProps) {
    const [remainingSeconds, setRemainingSeconds] =
        useState(duration * 60);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingSeconds((current) => {
                if (current <= 1) {
                    clearInterval(interval);
                    onFinish();
                    return 0;
                }

                return current - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [onFinish]);

    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Meditatie
            </Text>
            <Text style={styles.sound}>
                Geluid: {soundType}
            </Text>

            <Text style={styles.timer}>
                {minutes}:{seconds.toString().padStart(2, '0')}
            </Text>

            <Text style={styles.instruction}>
                Adem rustig in en uit.
                Laat je gedachten komen en weer gaan.
            </Text>

            <Pressable
                style={styles.button}
                onPress={onFinish}
            >
                <Text style={styles.buttonText}>
                    Afronden
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkBlue,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },

    title: {
        color: colors.white,
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 30,
    },

    timer: {
        color: colors.white,
        fontSize: 64,
        fontWeight: '300',
    },

    sound: {
        color: colors.lightBlue,
        fontSize: 14,
        marginTop: 20,
    },

    instruction: {
        color: colors.white,
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 24,
        maxWidth: 300,
        marginTop: 40,
    },

    button: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        paddingHorizontal: 25,
        paddingVertical: 13,
        marginTop: 40,
    },

    buttonText: {
        color: colors.white,
        fontWeight: 'bold',
    },
});