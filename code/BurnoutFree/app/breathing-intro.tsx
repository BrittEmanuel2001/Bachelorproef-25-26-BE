import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/styles/colors';

export default function BreathingIntro() {
    const scale = useRef(new Animated.Value(0.7)).current;
    const [isBreathingIn, setIsBreathingIn] = useState(true);

    useEffect(() => {
        Animated.timing(scale, {
            toValue: 1.4,
            duration: 4000,
            useNativeDriver: true,
        }).start(() => {
            setIsBreathingIn(false);

            Animated.timing(scale, {
                toValue: 0.9,
                duration: 4000,
                useNativeDriver: true,
            }).start(() => {
                router.replace('/');
            });
        });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.breathingContainer}>
                {/* Buitenste cirkel */}
                <Animated.View
                    style={[
                        styles.outerCircle,
                        {
                            transform: [{ scale }],
                        },
                    ]}
                />

                {/* Binnenste cirkel */}
                <Animated.View
                    style={[
                        styles.innerCircle,
                        {
                            transform: [{ scale }],
                        },
                    ]}
                />

                {/* Primary cirkel */}
                <Animated.View
                    style={[
                        styles.primaryCircle,
                        {
                            transform: [{ scale }],
                        },
                    ]}
                />

                {/* Tekst staat BOVEN de animatie */}
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        {isBreathingIn ? 'Adem rustig in' : 'Adem uit'}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    breathingContainer: {
        width: 300,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },

    outerCircle: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: colors.white,
        opacity: 0.2,
    },

    innerCircle: {
        position: 'absolute',
        width: 230,
        height: 230,
        borderRadius: 115,
        backgroundColor: colors.white,
        opacity: 0.2,
    },

    primaryCircle: {
        position: 'absolute',
        width: 170,
        height: 170,
        borderRadius: 85,
        backgroundColor: colors.primary,
    },

    textContainer: {
        position: 'absolute',
        width: 170,
        height: 170,
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        color: colors.darkBlue,
        fontSize: 14,
        fontWeight: '600',
    },
});
