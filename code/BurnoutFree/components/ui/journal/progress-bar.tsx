import { View, StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

type ProgressBarProps = {
    currentStep: number;
    totalSteps: number;
}

export function ProgressBar({currentStep, totalSteps}: ProgressBarProps) {
    return (
        <View style={styles.container}>
            {Array.from({ length: totalSteps }).map((_, index) => {
                const step = index + 1;

                let backgroundColor = colors.gray;

                if (step < currentStep) {
                    backgroundColor = colors.darkBlue;
                } else if (step === currentStep) {
                    backgroundColor = colors.primary;
                }

                return (
                    <View
                        key={step}
                        style={[
                            styles.step,
                            { backgroundColor },
                            step === 1 && styles.firstStep,
                            step === totalSteps && styles.lastStep,
                        ]}
                    />
                );
            })}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: 12,
        borderRadius: 999,
        overflow: 'hidden',
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