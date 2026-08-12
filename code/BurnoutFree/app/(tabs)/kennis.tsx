import { useState } from "react";
import { Text, View, ScrollView, StyleSheet, Pressable } from "react-native";
import { colors } from '@/styles/colors';
import { SettingButtons } from '@/components/ui/settings/setting-buttons';
import { Tabs } from "@/components/ui/tabs";

export default function Index() {

    const [activeTab, setActiveTab] = useState('all');

    const tabs = [
        {
            key: 'all',
            label: 'Alles',
        },
        {
            key: 'collection',
            label: 'Mijn verzameling',
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
                <Text style={{fontSize: 14, color: colors.darkMutedBlue, fontWeight: 'bold'}}>Jouw</Text>
                <Text style={{fontSize: 24, fontWeight: 'bold', paddingBottom: 8, marginBottom: 20}}>Kennishoek</Text>

                {/* Tabs */}
                <Tabs
                    tabs={tabs}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                />

                <View style={styles.tabContent}>
                    {activeTab === 'all' ? (
                        <Text>Alle cursussen</Text>
                    ) : (
                        <Text>Mijn cursussen</Text>
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