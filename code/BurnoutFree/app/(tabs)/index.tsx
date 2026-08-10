import { Text, View, ScrollView, StyleSheet } from "react-native";
import { CheckupCard } from "../../components/ui/check-up-card";
import { colors } from '@/styles/colors';
import { SettingButtons } from '@/components/ui/settings/setting-buttons';
import { Toolkit } from '@/components/ui/toolkit/toolkit';
import { KnowledgeCard } from "@/components/ui/kennis/knowledge-card";

export default function Index() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={{paddingHorizontal: 20}}>
        
        <SettingButtons />

        <Text style={{fontSize: 24, fontWeight: 'bold', paddingBottom: 8}}>Hoi Britt!</Text>
        <Text style={{fontSize: 14, color: colors.mutedBlue, fontWeight: 'bold', marginBottom: 25}}>Fijn dat je even tijd maakt voor jezelf</Text>
        <CheckupCard />
      </View>

      {/* toolkit */}
      <Toolkit />

      {/* kennis sectie */}
      <View style={{ paddingHorizontal: 20 }}>
        <KnowledgeCard
          moduleTitle="Stress 101"
          module="1"
          lessonTitle={"De ene stress is de andere niet"}
        />
      </View>

      {/* quote sectie */}
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
