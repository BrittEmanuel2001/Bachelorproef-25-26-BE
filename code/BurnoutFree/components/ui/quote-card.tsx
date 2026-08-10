import { colors } from "@/styles/colors";
import { StyleSheet, Text, View } from "react-native";

export function QuoteCard({ quote }: { quote: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.quoteMarkLeft}>“</Text>
      <View style={styles.content}>
        <Text style={styles.quote}>{quote}</Text>
      </View>
      <Text style={styles.quoteMarkRight}>”</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 140,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 30,
    backgroundColor: colors.green,
    position: "relative",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  quote: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  quoteMarkLeft: {
    position: "absolute",
    top: 12,
    left: 25,
    fontSize: 35,
    fontWeight: "700",
    color: "white",
    opacity: 0.9,
  },
  quoteMarkRight: {
    position: "absolute",
    bottom: 0,
    right: 25,
    fontSize: 35,
    fontWeight: "700",
    color: "white",
    opacity: 0.9,
  },
});