import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/styles/colors';
import { IconSymbol } from '../icon-symbol';
import { router } from 'expo-router';
import { ToolkitItem } from './toolkit-card';

type ToolCardProps = {
    item: ToolkitItem;
    onPress?: () => void;
    color?: string;
}

export function ToolCard({ item, onPress, color = colors.primary }: ToolCardProps) {
    function handlePress() {
        if (onPress) {
            onPress();
            return;
        }
        router.push(item.route as any);
    }

    return (
        <Pressable
            onPress={handlePress}
            style={[styles.card, {backgroundColor: color}]}
        >
            <IconSymbol size={25} name={item.icon as any} color={colors.white}/>
            <Text style={[styles.title, { color: colors.white }]}>
                {item.title}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        paddingTop: 3,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderRadius: 20,
        width: '48%',
    },

    title: {
        fontSize: 11,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});