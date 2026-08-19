import { useState } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { SettingButtons } from '@/components/ui/settings/setting-buttons';
import { Tabs } from '@/components/ui/tabs';
import { useTranslation } from '@/utils/i18n';

export default function Index() {
    const { t } = useTranslation();

    const [activeTab, setActiveTab] = useState('my-moments');

    const tabs = [
        {
            key: 'my-moments',
            label: t('development.myMoments'),
        },
        {
            key: 'together',
            label: t('development.together'),
        },
    ];

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            <View style={{ paddingHorizontal: 20 }}>
                {/* Titel */}
                <SettingButtons />
                <Text
                    style={{
                        fontSize: 14,
                        color: colors.darkMutedBlue,
                        fontWeight: 'bold',
                        marginTop: -25,
                    }}
                >
                    {t('section.your')}
                </Text>
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        marginBottom: 25,
                    }}
                >
                    {t('tab.development')}
                </Text>

                {/* Tabs */}
                <Tabs
                    tabs={tabs}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                />

                <View style={styles.tabContent}>
                    {activeTab === 'my-moments' ? (
                        <Text>{t('development.myMomentsContent')}</Text>
                    ) : (
                        <Text>{t('development.togetherContent')}</Text>
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
