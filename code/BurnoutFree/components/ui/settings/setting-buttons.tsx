import { Image, Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { colors } from '@/styles/colors';

export function SettingButtons() {

	return (
		<View style={styles.settings}>
			<Pressable
				onPress={() => router.push('/journal')}
				accessibilityRole="button"
				accessibilityLabel="Instellingen openen"
				hitSlop={8}
			>
				<IconSymbol size={25} name="gear.fill" color={colors.darkBlue} />
			</Pressable>
			<Pressable
				onPress={() => router.push('/journal')}
				accessibilityRole="button"
				accessibilityLabel="Profiel openen"
				hitSlop={8}
			>
				<Image
					source={require('@/assets/images/burnoutFreeLogo.png')}
					style={styles.logo}
				/>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	settings: {
		alignItems: 'flex-end',
	},
	logo: {
		width: 50,
		height: 50,
		borderRadius: 30,
		borderWidth: 2,
		borderColor: colors.mutedBlue,
		marginRight: 20,
	},
});
