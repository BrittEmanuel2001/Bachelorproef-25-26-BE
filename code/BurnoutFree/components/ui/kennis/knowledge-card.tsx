import { colors } from "@/styles/colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { IconSymbol } from "../icon-symbol";

export function KnowledgeCard({
  moduleTitle,
  module,
  lessonTitle,
}: {
  moduleTitle: string;
  module: string;
  lessonTitle: string;
}) {
  return (
    <Pressable onPress={() => router.push("/kennis")} style={styles.card}>
      <Image
        source={require("@/assets/images/bookBackground.png")}
        style={styles.backgroundImage}
        contentFit="cover"
      />
      <View style={styles.overlay} />

      <View style={styles.content}>
        <Text style={styles.module}>{`${moduleTitle} - Module ${module}`}</Text>
        <Text style={styles.title}>{lessonTitle}</Text>
      </View>

      <IconSymbol size={18} name="chevron.right" color={colors.white} style={styles.arrow} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 140,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 30,
    backgroundColor: colors.purple,
    position: 'relative',
  },

  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.brightPurple,
    opacity: 0.6,
  },

  content: {
    position: 'absolute',
    top: 10,
    left: 0,
    fontSize: 14,
    fontWeight: 'bold',
    width: '90%',
    paddingHorizontal: 30,
    paddingVertical: 15
  },

  module: {
    color: colors.white,
    fontWeight: '500',
    marginBottom: 10,
  },

  title: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 17,
    flexShrink: 1,
    marginBottom: 0,
    marginRight: 8,
  },

  arrow: {
    position: "absolute",
    right: 35,
    top: '50%',
    transform: [{ translateY: -9 }],
  },
});
