import { StyleSheet, Text, View } from "react-native";
import { BadgeCircle } from "@/components/ui/badge";
import { colors } from "@/styles/colors";

type Achievement = {
    id: string;
    value: number;
    icon: string;
    text: string;
    color: string;
    direction: "column" | "row";
};

type AchievementsProps = {
    achievements: Achievement[];
};

export function Achievements({ achievements }: AchievementsProps) {
    const latestAchievements = achievements.slice(-4).reverse();

    return (
        <View style={styles.container}>
            {latestAchievements.map((achievement) => (
                <View key={achievement.id} style={styles.achievement}>
                    <BadgeCircle
                        icon={achievement.icon}
                        value={achievement.value}
                        color={achievement.color}
                        direction={achievement.direction}
                    />

                    <Text style={[styles.description, {color: achievement.color}]}>
                        {achievement.text}
                    </Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%",
    },

    achievement: {
        flex: 1,
        alignItems: "center",
    },

    description: {
        fontSize: 10,
        fontWeight: "500",
        color: colors.darkBlue,
        textAlign: "center",
        paddingHorizontal: 4,
        marginTop: 10,
    },
});