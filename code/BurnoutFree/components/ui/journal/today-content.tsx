import { useState, useEffect } from "react";
import { Image, Text, View, StyleSheet, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from '@/styles/colors';
import { ReflectionModal, ReflectionData } from "@/components/ui/journal/reflection-modal";

const JOURNAL_STORAGE_KEY = "today-journal";

export function TodayContent() {
    const [reflectionVisible, setReflectionVisible] = useState(false);
    const [reflectionStep, setReflectionStep] = useState(1);
    const [todayReflection, setTodayReflection] = useState<ReflectionData | null>(null);

    const hour = new Date().getHours();
    const isEvening = hour >= 18 || hour < 6;

    useEffect(() => {
        loadTodayReflection();
    }, []);

    async function loadTodayReflection() {
        try {
            const stored = await AsyncStorage.getItem(JOURNAL_STORAGE_KEY);

            if (!stored) {
                setTodayReflection(null);
                return;
            }

            const data: ReflectionData = JSON.parse(stored);
            const today = new Date().toISOString().split("T")[0];

            if (data.date === today) setTodayReflection(data);
            else setTodayReflection(null);
        } catch (error) {
            console.error("Kon journal niet laden:", error);
        }
    }

    function startReflection() {
        setReflectionStep(1);
        setReflectionVisible(true);
    }

    function nextReflectionStep() {
        setReflectionStep((currentStep) => currentStep + 1);
    }

    function previousReflectionStep() {
        setReflectionStep((currentStep) => Math.max(1, currentStep - 1));
    }

    function closeReflection() {
        setReflectionVisible(false);
        setReflectionStep(1);
    }

    async function handleReflectionComplete(data: ReflectionData) {
        try {
            await AsyncStorage.setItem(
                JOURNAL_STORAGE_KEY,
                JSON.stringify(data)
            );

            setTodayReflection(data);
            setReflectionVisible(false);
            setReflectionStep(1);
        } catch (error) {
            console.error("Kon journal niet opslaan:", error);
        }
    }

    {/* Voor test en demo purpose */}
    async function clearReflection() {
        await AsyncStorage.removeItem(JOURNAL_STORAGE_KEY);
        setTodayReflection(null);
    }

    return (
        <>
            <View style={styles.todayContent}>

                {!todayReflection ? (
                    <>
                        <Image
                            source={
                                isEvening
                                    ? require("@/assets/images/Maantje.png")
                                    : require("@/assets/images/Zonnetje.png")
                            }
                            style={styles.image}
                            resizeMode="contain"
                        />

                        <Text style={styles.todayTitle}>
                            {isEvening ? "Goedenavond!" : "Goede morgen!"}
                        </Text>

                        <Text style={styles.todaySubtitle}>
                            {isEvening
                                ? "Hoe was je dag vandaag? Neem rustig even de tijd om terug te kijken op wat je hebt meegemaakt."
                                : "Hoe gaat het vandaag met je?\nLaten we rustig even stilstaan bij\nhoe je je voelt."
                            }
                        </Text>

                        <Pressable
                            style={styles.button}
                            onPress={startReflection}
                            accessibilityRole="button"
                            accessibilityLabel="Start reflectie"
                            hitSlop={8}
                        >
                            <Text style={styles.buttonText}>
                                Reflecteer
                            </Text>
                        </Pressable>
                    </>
                ) : (
                    <>
                        <Text>
                            Je reflectie van vandaag
                        </Text>

                        <Text>
                            Dit heb je vandaag ingevuld.
                        </Text>

                        <Pressable onPress={clearReflection}>
                            <Text style={{color: colors.red}}>Leegmaken voor demo</Text>
                        </Pressable>
                    </>
                )}

            </View>

            <ReflectionModal
                visible={reflectionVisible}
                currentStep={reflectionStep}
                totalSteps={4}
                onClose={closeReflection}
                onNext={nextReflectionStep}
                onPrevious={previousReflectionStep}
                onComplete={handleReflectionComplete}
            />
        </>
    );
}

const styles = StyleSheet.create({
    todayContent: {
        alignItems: 'center',
    },

    image: {
        width: '100%',
        height: 130,
        marginTop: 10,
        marginBottom: 28,
    },

    todayTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
    },

    todaySubtitle: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.darkMutedBlue,
        lineHeight: 18,
        textAlign: 'center',
        maxWidth: 250,
        marginBottom: 30,
    },

    button: {
        backgroundColor: colors.darkBlue,
        paddingHorizontal: 25,
        paddingVertical: 13,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
});