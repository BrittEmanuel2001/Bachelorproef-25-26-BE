import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/styles/colors';
import { IconSymbol } from '../icon-symbol';
import { router } from 'expo-router';

export type ToolkitItem = {
    id: string;
    title: string;
    icon: string;
    route: string;
    color?: string;
};

type ToolkitCardProps = {
    item: ToolkitItem;
    onPress?: () => void;
};

export function ToolkitCard({ item, onPress }: ToolkitCardProps) {
    const isSOS = item.id === 'sos';

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
            style={[
                styles.card,
                { backgroundColor: isSOS ? colors.red : colors.lightBlue },
            ]}
        >
            <IconSymbol
                size={25}
                name={item.icon as any}
                color={isSOS ? colors.white : colors.darkBlue}
            />
            <Text
                style={[
                    styles.title,
                    { color: isSOS ? colors.white : colors.darkBlue },
                ]}
            >
                {item.title}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        paddingTop: 3,
        aspectRatio: 1,
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderRadius: 20,
    },

    title: {
        fontSize: 11,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
