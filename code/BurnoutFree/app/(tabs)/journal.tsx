import { useState } from "react";
import { Image, Text, View, ScrollView, StyleSheet, Pressable } from "react-native";
import { colors } from '@/styles/colors';
import { SettingButtons } from '@/components/ui/settings/setting-buttons';
import { Tabs } from "@/components/ui/tabs";

export default function Index() {

    const [activeTab, setActiveTab] = useState('today');

    const tabs = [
        {
            key: 'today',
            label: 'Vandaag',
        },
        {
            key: 'history',
            label: 'Geschiedenis',
        },
    ];

    return (
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            <View style={{paddingHorizontal: 20}}>
                {/* Titel */}
                <SettingButtons />
                <Text style={{fontSize: 14, color: colors.darkMutedBlue, fontWeight: 'bold', marginTop: -25}}>Jouw</Text>
                <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 25}}>Dagboek</Text>

                {/* Tabs */}
                <Tabs
                    tabs={tabs}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                />

                <View style={styles.tabContent}>
                    {activeTab === 'today' ? (
                        <TodayContent />
                    ) : (
                        <Text>Je dagboekgeschiedenis</Text>
                    )}
                </View>
            </View>
        </ScrollView>
    );
}

function TodayContent() {
    const hour = new Date().getHours();
    const isEvening = hour >= 18 || hour < 6;

    return (
        <View style={styles.todayContent}>
            <Image
                source={
                    isEvening
                        ? require('@/assets/images/Maantje.png')
                        : require('@/assets/images/Zonnetje.png')
                }
                style={styles.image}
                resizeMode="contain"
            />

            <Text style={styles.todayTitle}>
                {isEvening ? 'Goedenavond!' : 'Goede morgen!'}
            </Text>

            <Text style={styles.todaySubtitle}>
                {isEvening
                    ? 'Hoe was je dag vandaag? Neem rustig even de tijd om terug te kijken op wat je hebt meegemaakt.'
                    : 'Hoe gaat het vandaag met je?\nLaten we rustig even stilstaan bij\nhoe je je voelt.'
                }
            </Text>

            <Pressable 
                style={styles.button}
                onPress={() => {}}
                accessibilityRole="button"
                accessibilityLabel="Start reflectie"
                hitSlop={8}
            >
                <Text style={styles.buttonText}>
                    Reflecteer
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
    },
    content: {
        flexGrow: 1,
        paddingTop: 50,
    },
    wrapper: {
        paddingHorizontal: 20,
    },
    tabContent: {
        paddingTop: 24,
    },
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
        fontWeight: 600,
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