import { useState } from "react";
import { Text, View, ScrollView, StyleSheet, Pressable } from "react-native";
import { colors } from '@/styles/colors';
import { SettingButtons } from '@/components/ui/settings/setting-buttons';
import { Tabs } from "@/components/ui/tabs";
import { useTranslation } from '@/utils/i18n';

export default function Index() {
    const { t } = useTranslation();

    const [activeTab, setActiveTab] = useState('all');

    const tabs = [
        {
            key: 'all',
            label: t('knowledge.all'),
        },
        {
            key: 'collection',
            label: t('knowledge.collection'),
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
                <Text style={{fontSize: 14, color: colors.darkMutedBlue, fontWeight: 'bold', marginTop: -25}}>{t('section.your')}</Text>
                <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 25}}>{t('knowledge.title')}</Text>

                {/* Tabs */}
                <Tabs
                    tabs={tabs}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                />

                <View style={styles.tabContent}>
                    {activeTab === 'all' ? (
                        <Text>{t('knowledge.allCourses')}</Text>
                    ) : (
                        <Text>{t('knowledge.myCourses')}</Text>
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