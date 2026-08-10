import { Text, View } from "react-native";
import { CheckupCard } from "../../components/ui/check-up-card";
import { IconSymbol } from '@/components/ui/icon-symbol';
import { colors } from '@/styles/colors';
import { Toolkit } from '@/components/ui/toolkit/toolkit';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: colors.white,
      }}
    >
      <View style={{paddingHorizontal: 20}}>
        <Text style={{fontSize: 24, fontWeight: 'bold', paddingBottom: 8}}>Hoi Britt!</Text>
        <Text style={{fontSize: 14, color: colors.mutedBlue, fontWeight: 'bold', marginBottom: 25}}>Fijn dat je even tijd maakt voor jezelf</Text>
        <CheckupCard />
      </View>

      {/* toolkit */}
      <Toolkit />

      {/* kennis sectie */}

      {/* quote sectie */}
    </View>
  );
}
