import { useState } from "react";
import { Text, View, ScrollView, StyleSheet, Pressable } from "react-native";
import { colors } from '@/styles/colors';
import { SettingButtons } from '@/components/ui/settings/setting-buttons';
import { Tabs } from "@/components/ui/tabs";

export default function Index() {

    const [activeTab, setActiveTab] = useState('my-moments');

    const tabs = [
        {
            key: 'my-moments',
            label: 'Mijn momenten',
        },
        {
            key: 'together',
            label: 'Samen op pad',
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
                <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 25}}>Ontwikkeling</Text>

                {/* Tabs */}
                <Tabs
                    tabs={tabs}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                />

                <View style={styles.tabContent}>
                    {activeTab === 'my-moments' ? (
                        <Text>Content van mijn momenten</Text>
                    ) : (
                        <Text>Content van samen op pad</Text>
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