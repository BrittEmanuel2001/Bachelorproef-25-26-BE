// Fallback for using MaterialIcons on Android and web.

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<string, ComponentProps<typeof FontAwesome6>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'house-chimney',
  'journal.fill': 'book',
  'plant.fill': 'seedling',
  'book.fill': 'book-open',
  'toolbox.fill': 'toolbox',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'pen.fill': 'pen',
  'leaf.fill': 'leaf',
  'spa.fill': 'spa',
  'glasses.fill': 'glasses',
  'lightning.fill': 'bolt-lightning',
  'note.fill': 'note-sticky',
  'arrow.left': 'arrow-left',
  'xmark': 'xmark',
  'circle.question': 'circle-question',
  'gear.fill': 'gear',
  'handshake.fill': 'handshake-angle',
  'info.fill': 'circle-info',
  'bell.fill': 'bell',
  'phone.fill': 'phone',
  'database.fill': 'database',
  'shield.fill': 'shield-halved',
  'add': 'add',
  'user.fill': 'user-large',
  'trash': 'trash',
  'clock': 'clock',
  'hand.heart.fill': 'hand-holding-heart',
  'face.really.unhappy': 'face-frown-open',
  'face.unhappy': 'face-frown',
  'face.neutral': 'face-meh',
  'face.happy': 'face-smile',
  'face.really.happy': 'face-grin-beam',
  'minus': 'minus',
  'plus': 'plus',
  'play': 'play',
  'mute.fill': 'volume-xmark',
  'rain.fill': 'cloud-rain',
  'ocean.fill': 'water',
  'tree.fill': 'tree',
  'music.fill': 'music',
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <FontAwesome6 name={MAPPING[name]} color={color} size={size} style={style} />;
}
