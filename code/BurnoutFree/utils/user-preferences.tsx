import AsyncStorage from '@react-native-async-storage/async-storage';

export type SupportLevel = 'low' | 'medium' | 'high';

const SUPPORT_LEVEL_KEY = 'supportLevel';

export async function saveSupportLevel(level: SupportLevel) {
    await AsyncStorage.setItem(SUPPORT_LEVEL_KEY, level);
}

export async function getSupportLevel(): Promise<SupportLevel> {
    const value = await AsyncStorage.getItem(SUPPORT_LEVEL_KEY);

    if (value === 'low' || value === 'medium' || value === 'high') {
        return value;
    }

    return 'medium';
}