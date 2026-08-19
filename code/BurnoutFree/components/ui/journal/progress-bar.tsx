import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { colors } from '@/styles/colors';

type ProgressBarProps = {
    currentStep: number;
    totalSteps: number;
};

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
    return (
        <View style={styles.container}>
            {Array.from({ length: totalSteps }).map((_, index) => {
                const step = index + 1;

                return (
                    <AnimatedStep
                        key={step}
                        step={step}
                        currentStep={currentStep}
                        totalSteps={totalSteps}
                    />
                );
            })}
        </View>
    );
}

type AnimatedStepProps = {
    step: number;
    currentStep: number;
    totalSteps: number;
};

function AnimatedStep({ step, currentStep, totalSteps }: AnimatedStepProps) {
    const progress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(progress, {
            toValue: step < currentStep ? 1 : step === currentStep ? 0.5 : 0,
            duration: 350,
            useNativeDriver: false,
        }).start();
    }, [currentStep, step]);

    const backgroundColor = progress.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [colors.gray, colors.primary, colors.darkBlue],
    });

    return (
        <Animated.View
            style={[
                styles.step,
                { backgroundColor },
                step === 1 && styles.firstStep,
                step === totalSteps && styles.lastStep,
            ]}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: 12,
        borderRadius: 999,
        overflow: 'hidden',
        marginVertical: 10,
    },

    step: {
        flex: 1,
        height: '100%',
        borderRightWidth: 1,
        borderRightColor: colors.white,
    },

    firstStep: {
        borderTopLeftRadius: 999,
        borderBottomLeftRadius: 999,
    },

    lastStep: {
        borderRightWidth: 0,
        borderTopRightRadius: 999,
        borderBottomRightRadius: 999,
    },
});
