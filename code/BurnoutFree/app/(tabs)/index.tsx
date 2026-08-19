import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { CheckupCard } from '../../components/ui/check-up-card';
import { colors } from '@/styles/colors';
import { SettingButtons } from '@/components/ui/settings/setting-buttons';
import { Toolkit } from '@/components/ui/toolkit/toolkit';
import { KnowledgeCard } from '@/components/ui/kennis/knowledge-card';
import { QuoteCard } from '@/components/ui/quote-card';
import { useTranslation } from '@/utils/i18n';

export default function Index() {
    const { t } = useTranslation();
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <View style={{ paddingHorizontal: 20 }}>
                <SettingButtons />

                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        paddingBottom: 8,
                        marginTop: -6,
                    }}
                >
                    {t('home.greeting')}
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        color: colors.darkMutedBlue,
                        fontWeight: 'bold',
                        marginBottom: 25,
                    }}
                >
                    {t('home.subtitle')}
                </Text>
                <CheckupCard
                    title={t('home.checkup')}
                    image={require('@/assets/images/Coach_Bubbles.png')}
                    button={{
                        text: t('home.reflect'),
                        onPress: () => router.push('/journal'),
                    }}
                />
            </View>

            {/* toolkit */}
            <Toolkit />

            <View style={{ paddingHorizontal: 20 }}>
                {/* kennis sectie */}
                <KnowledgeCard
                    moduleTitle={t('home.stress101')}
                    module="1"
                    lessonTitle={t('home.stressLesson')}
                    backgroundImage={require('@/assets/images/bookBackground.png')}
                    onPress={() => {
                        router.replace('/kennis');
                    }}
                />

                {/* quote sectie */}
                <QuoteCard quote={t('home.quote')} />
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
});
