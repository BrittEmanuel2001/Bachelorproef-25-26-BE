import { useEffect, useState, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View, Image } from 'react-native';

import { colors } from '@/styles/colors';
import { MeditationSoundType, MEDITATION_SOUNDS } from './meditation-modal';
import { IconSymbol } from '../icon-symbol';

type MeditationExerciseProps = {
    duration: number;
    soundType: MeditationSoundType;
    onFinish: (completed: boolean) => void;
};

export function MeditationExercise({duration, soundType, onFinish}: MeditationExerciseProps) {

    const [remainingSeconds, setRemainingSeconds] = useState(duration * 60);
    const scale = useRef(new Animated.Value(0.7)).current;
    const sound = MEDITATION_SOUNDS.find((item) => item.value === soundType);
    const [isBreathingIn, setIsBreathingIn] = useState(true);

    // Timer
    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingSeconds((current) => {
                if (current <= 1) {
                    clearInterval(interval);
                    return 0;
                }

                return current - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [onFinish]);

    useEffect(() => {
        if (remainingSeconds === 0) onFinish(true);
    }, [remainingSeconds, onFinish]);

    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    // Ademhaling
    useEffect(() => {

        let cancelled = false;

        const breathe = () => {

            if (cancelled) return;
            // Inademen
            setIsBreathingIn(true);

            Animated.timing(scale, {
                toValue: 1.2, 
                duration: 5000, 
                useNativeDriver: true,
            }).start(({ finished }) => {

                if (!finished || cancelled) return;
                // Uitademen
                setIsBreathingIn(false);

                Animated.timing(scale, {
                    toValue: 1, 
                    duration: 5000, 
                    useNativeDriver: true
                }).start(({ finished }) => {
                    if (!finished || cancelled) return;
                    breathe();
                });
            });
        };

        breathe();

        return () => { 
            cancelled = true; 
            scale.stopAnimation(); 
        };
    }, [scale]);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Meditatie</Text>
                {sound && (
                    <View style={styles.soundChip}>
                        <IconSymbol name={soundType === 'quiet' ? 'mute.fill' : 'music.fill'} size={12} color={colors.darkBlue} />
                        <Text style={styles.soundText}>{sound.label}</Text>
                    </View>
                )}
            </View>
            
            {/* Breathing circle */}
            <View style={styles.breathingContainer}>

                <Animated.View style={[styles.outerCircle, {transform: [{ scale }]}]}/>
                <Animated.View style={[styles.innerCircle, {transform: [{ scale }]}]}/>
                <Animated.View style={[styles.primaryCircle, {transform: [{ scale }]}]}/>

                <Image
                    source={isBreathingIn
                            ? require('@/assets/images/Coach_Bubbles_BreathingIn.png')
                            : require('@/assets/images/Coach_Bubbles_BreathingOut.png')
                    }
                    style={styles.breathingCoach}
                    resizeMode="contain"
                />

                {/* Content in cirkel */}
                <View style={styles.circleContent}>
                    <Text style={styles.timer}>{formattedTime}</Text>
                    <Text style={styles.breathingText}>Adem rustig</Text>
                </View>
            </View>

            <Pressable style={styles.button} onPress={() => onFinish(false)}>
                <Text style={styles.buttonText}>Afronden</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkBlue,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 80,
        paddingHorizontal: 20,
    },

    title: {
        color: colors.white,
        fontSize: 26,
        fontWeight: '700',
        marginTop: 10,
        marginBottom: 20,
    },

    soundChip: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        gap: 8,
        paddingHorizontal: 20,
        paddingVertical: 7,
        borderRadius: 20,
        marginBottom: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },

    soundText: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.darkBlue,
        paddingBottom: 2,
    },

    breathingContainer: {
        width: 320,
        height: 320,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
    },

    outerCircle: {
        position: 'absolute',
        width: 320,
        height: 320,
        borderRadius: 160,
        backgroundColor: '#19536D',
    },

    innerCircle: {
        position: 'absolute',
        width: 245,
        height: 245,
        borderRadius: 122.5,
        backgroundColor: '#30647B',
    },

    primaryCircle: {
        position: 'absolute',
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: colors.darkBlue,
    },

    breathingCoach: {
        position: 'absolute',
        width: 88,
        height: 88,
        right: 20,
        bottom: -10,
        zIndex: 10,
    },

    circleContent: {
        width: 180,
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
    },

    timer: {
        color: colors.white,
        fontSize: 50,
        fontWeight: '700',
    },

    breathingText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: '600',
        marginTop: 8,
        textAlign: 'center',
    },

    instruction: {
        color: colors.lightBlue,
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 21,
        maxWidth: 280,
        marginTop: 30,
    },

    button: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        paddingHorizontal: 25,
        paddingVertical: 13,
        marginTop: 80,
        marginBottom: 20,
    },

    buttonText: {
        color: colors.white,
        fontWeight: 'bold',
    },
});