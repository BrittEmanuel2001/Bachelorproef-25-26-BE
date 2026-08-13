import { colors } from "@/styles/colors";
import { Image, ImageSource } from "expo-image";
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
    <Pressable onPress={onPress} style={styles.card}>
      <Image
        source={backgroundImage}
        style={styles.backgroundImage}
        contentFit="cover"
      />
      <View style={[styles.overlay, { backgroundColor: overlayColor ?? colors.brightPurple }]}
/>

      <View style={[styles.content, !onPress && {width:'100%'}]}>
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

      {onPress && (
        <IconSymbol size={18} name="chevron.right" color={colors.white} style={styles.arrow} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: 125,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 15,
    backgroundColor: colors.purple,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 25,
    zIndex: 1,
    height: '100%',
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
  },

  arrow: {
    paddingRight: 20,
    zIndex: 1,
  },
});
