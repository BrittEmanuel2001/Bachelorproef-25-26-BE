import { useState } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";

import { colors } from '@/styles/colors';
import { SettingButtons } from '@/components/ui/settings/setting-buttons';
import { Tabs } from "@/components/ui/tabs";
import { TodayContent } from "@/components/ui/journal/today-content";
import { HistoryContent } from "@/components/ui/journal/history-content";
import { useTranslation } from '@/utils/i18n';

export default function Index() {
    const { t } = useTranslation();

    const [activeTab, setActiveTab] = useState('today');

    const tabs = [
        {
            key: 'today',
            label: t('journal.today'),
        },
        {
            key: 'history',
            label: t('journal.history'),
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {/* Titel */}
                <SettingButtons />
                <Text style={{fontSize: 14, color: colors.darkMutedBlue, fontWeight: 'bold', marginTop: -25}}>{t('section.your')}</Text>
                <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 25}}>{t('tab.journal')}</Text>

                {/* Tabs */}
                <Tabs
                    tabs={tabs}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                />

                <View style={styles.tabContent}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.tabScrollContent}
                    >
                        {activeTab === 'today' ? (
                            <TodayContent />
                        ) : (
                            <HistoryContent />
                        )}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },

    content: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
    },

    tabContent: {
        flex: 1,
        paddingTop: 24,
    },

    tabScrollContent: {
        paddingBottom: 50,
    },
});