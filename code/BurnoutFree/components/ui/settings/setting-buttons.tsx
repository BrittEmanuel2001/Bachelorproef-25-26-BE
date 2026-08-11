import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useState } from 'react';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { colors } from '@/styles/colors';
import { Profile } from './profile';
import { Settings } from './settings';

export function SettingButtons() {
	const [profileVisible, setProfileVisible] = useState(false);
	const [settingsVisible, setSettingsVisible] = useState(false);

	return (
		<>
			<View style={styles.settings}>
				<Pressable
					onPress={() => setSettingsVisible(true)}
					accessibilityRole="button"
					accessibilityLabel="Instellingen openen"
					hitSlop={8}
				>
					<IconSymbol size={25} name="gear.fill" color={colors.darkBlue} />
				</Pressable>
				<Pressable
					onPress={() => setProfileVisible(true)}
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
			<Profile visible={profileVisible} onClose={() => setProfileVisible(false)} />
			<Settings visible={settingsVisible} onClose={() => setSettingsVisible(false)} />
		</>
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
		borderColor: colors.darkMutedBlue,
		marginRight: 20,
	},
});
