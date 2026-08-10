import { Text, View } from "react-native";
import { CheckupCard } from "../../components/ui/check-up-card";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text style={{fontSize: 24, fontWeight: 'bold', paddingBottom: 8}}>Hoi Britt!</Text>
      <Text style={{fontSize: 14, color: '#5D8CB6', fontWeight: 'bold', marginBottom: 25}}>Fijn dat je even tijd maakt voor jezelf</Text>
      <CheckupCard />

      <Text>Jouw toolkit</Text>
      {/* tool buttons */}

      {/* Kennis card */}
      {/* Quote card */}
    </View>
  );
}
