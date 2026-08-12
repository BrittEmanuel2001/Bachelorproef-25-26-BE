import { colors } from "@/styles/colors";
import { Image, ImageSource } from "expo-image";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { IconSymbol } from "../icon-symbol";

export function KnowledgeCard({
  moduleTitle,
  module,
  lessonTitle,
  backgroundImage,
  onPress,
  moduleIcon,
  overlayColor
}: {
  moduleTitle: string;
  module?: string;
  lessonTitle: string;
  backgroundImage: ImageSource;
  onPress?: () => void;
  moduleIcon?: string;
  overlayColor?: string;
}) {
  return (
    <Pressable onPress={onPress ?? (() => router.push("/kennis"))} style={styles.card}>
      <Image
        source={backgroundImage}
        style={styles.backgroundImage}
        contentFit="cover"
      />
      <View style={[styles.overlay, { backgroundColor: overlayColor ?? colors.brightPurple }]}
/>

      <View style={styles.content}>
        <View style={styles.moduleRow}>
          {moduleIcon && (<IconSymbol size={18} name={moduleIcon} color={colors.darkBlue} />)}
          <Text style={styles.module}>
            {module
              ? `${moduleTitle} - Module ${module}`
              : moduleTitle}
          </Text>
        </View>
        <Text style={styles.title}>{lessonTitle}</Text>
      </View>

      <IconSymbol size={18} name="chevron.right" color={colors.white} style={styles.arrow} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 125,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 15,
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
    fontSize: 12,
  },

  moduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },

  title: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 15,
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
