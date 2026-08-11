import { Text, View, ScrollView, StyleSheet } from "react-native";
import { colors } from '@/styles/colors';
import { SettingButtons } from '@/components/ui/settings/setting-buttons';
import { Toolkit } from '@/components/ui/toolkit/toolkit';
import { ToolkitItem } from "@/components/ui/toolkit/toolkit-card";
import { ToolCard } from "@/components/ui/toolkit/tools-card";

const AVAILABLE_ITEMS: ToolkitItem[] = [
    {
        id: 'breathing',
        title: 'Ademhaling',
        icon: 'leaf.fill',
        route: '#',
    },
    {
        id: 'meditate',
        title: 'Meditatie',
        icon: 'spa.fill',
        route: '#',
    },
    {
        id: 'focus',
        title: 'Focus modus',
        icon: 'glasses.fill',
        route: '#',
    },
    {
        id: 'sos',
        title: 'SOS',
        icon: 'lightning.fill',
        route: '#',
    },
    {
        id: 'coping-cards',
        title: 'Coping cards',
        icon: 'note.fill',
        route: '#',
    },
    {
        id: 'pro-example',
        title: 'Pro functie',
        icon: 'circle.question',
        route: '#',
    }
];

export default function Index() {
  return (
    <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
    >
      <View style={{paddingHorizontal: 20}}>
        <SettingButtons />
        <Text style={{fontSize: 24, fontWeight: 'bold', paddingBottom: 30}}>Tools</Text>
      </View>

      {/* toolkit */}
      <Toolkit />

      {/* aanbod */}
      <View style={{paddingHorizontal: 20, paddingTop: 10, paddingBottom: 30}}>
        <Text style={styles.heading}>Ons aanbod</Text>
        <View style={styles.twoColGrid}>
          {AVAILABLE_ITEMS
              .map((item) => {
                  const buttonColors = [
                      colors.primary,
                      colors.green,
                      colors.purple,
                  ];

                  const nonSpecialItems = AVAILABLE_ITEMS.filter(
                    (item) => item.id !== "sos" && item.id !== "pro-example"
                  );

                  const colorIndex = nonSpecialItems.findIndex(
                    (availableItem) => availableItem.id === item.id
                  );

                  const color = item.id === "sos" 
                  ? colors.red : item.id === "pro-example"
                  ? colors.gray : buttonColors[colorIndex % buttonColors.length];

                  return (
                      <ToolCard
                          key={item.id}
                          item={item}
                          color={color}
                      />
                  )
              })
          }
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
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15
    },

    twoColGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 10,
    },
});