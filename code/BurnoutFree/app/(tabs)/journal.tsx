import { useState } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";

import { colors } from '@/styles/colors';
import { SettingButtons } from '@/components/ui/settings/setting-buttons';
import { Tabs } from "@/components/ui/tabs";
import { TodayContent } from "@/components/ui/journal/today-content";
import { HistoryContent } from "@/components/ui/journal/history-content";

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
                        <HistoryContent />
                    )}
                </View>
            </View>
        </ScrollView>
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
});