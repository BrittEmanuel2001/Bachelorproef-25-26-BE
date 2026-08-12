import { Pressable, Text, View, StyleSheet } from "react-native";
import { colors } from '@/styles/colors';

type Tab = {
    key: string;
    label: string;
};

type TabsProps = {
    tabs: Tab[];
    activeTab: string;
    onChange: (tab: string) => void;
};

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
    return (
        <View style={styles.tabs}>
            {tabs.map((tab, index) => {
                const isActive = activeTab === tab.key;
                const isFirst = index === 0;
                const isLast = index === tabs.length - 1;

                return (
                    <Pressable
                        key={tab.key}
                        onPress={() => onChange(tab.key)}
                        style={[
                            styles.tab,
                            isActive
                                ? styles.activeTab
                                : styles.inactiveTab,
                            isFirst && styles.firstTab,
                            isLast && styles.lastTab,
                        ]}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                isActive
                                    ? styles.activeText
                                    : styles.inactiveText,
                            ]}
                        >
                            {tab.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        width: '100%',
    },
    tab: {
        flex: 1,
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeTab: {
        backgroundColor: colors.darkBlue,
    },
    inactiveTab: {
        backgroundColor: colors.gray,
    },
    firstTab: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    lastTab: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    tabText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    activeText: {
        color: colors.white,
    },
    inactiveText: {
        color: colors.darkBlue,
    },
});