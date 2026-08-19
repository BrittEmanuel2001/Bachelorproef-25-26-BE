import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '@/styles/colors';
import { IconSymbol } from '../icon-symbol';
import { JournalEntry } from './journal-entry';
import { ReflectionData } from './reflection-modal';
import { mockJournalEntries } from '@/data/mock-journal-entries';
import { moodOptions } from '@/utils/reflection-options';

const JOURNAL_ENTRIES_KEY = 'journal-entries';

function getMonthLabel(dateString: string): string {
    const date = new Date(dateString);
    const months = [
        'januari',
        'februari',
        'maart',
        'april',
        'mei',
        'juni',
        'juli',
        'augustus',
        'september',
        'oktober',
        'november',
        'december',
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

function groupByMonth(
    entries: ReflectionData[],
): Record<string, ReflectionData[]> {
    const grouped: Record<string, ReflectionData[]> = {};

    entries.forEach((entry) => {
        const monthKey = entry.date.substring(0, 7); // YYYY-MM
        if (!grouped[monthKey]) {
            grouped[monthKey] = [];
        }
        grouped[monthKey].push(entry);
    });

    return grouped;
}

async function getJournalEntries(limit = 10): Promise<ReflectionData[]> {
    try {
        const stored = await AsyncStorage.getItem(JOURNAL_ENTRIES_KEY);
        const storedEntries = stored ? JSON.parse(stored) : [];
        const allEntries = [...mockJournalEntries, ...storedEntries];

        return Array.from(allEntries.values())
            .sort(
                (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime(),
            )
            .slice(0, limit);
    } catch (error) {
        console.error('Kon journal entries niet laden:', error);
        return [];
    }
}

function getMoodOption(moodId: number | string | null) {
    const id = typeof moodId === 'string' ? parseInt(moodId) : moodId;
    return moodOptions.find((opt) => opt.id === id);
}

export function HistoryContent() {
    const [entries, setEntries] = useState<ReflectionData[]>([]);
    const [selectedEntry, setSelectedEntry] = useState<ReflectionData | null>(
        null,
    );
    const [entryModalVisible, setEntryModalVisible] = useState(false);
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

    const loadEntries = useCallback(async () => {
        const data = await getJournalEntries(10);
        setEntries(data);
    }, []);

    useEffect(() => {
        loadEntries();
    }, [loadEntries]);

    useFocusEffect(
        useCallback(() => {
            loadEntries();
        }, [loadEntries]),
    );

    const grouped = groupByMonth(entries);
    const sortedMonths = Object.keys(grouped).sort().reverse();

    function handleEntryPress(entry: ReflectionData) {
        setSelectedEntry(entry);
        setEntryModalVisible(true);
    }

    return (
        <>
            <View style={styles.toolbar}>
                <Pressable style={styles.iconButton}>
                    <IconSymbol
                        size={20}
                        name="search"
                        color={colors.darkBlue}
                    />
                </Pressable>
                <Pressable
                    onPress={() => setViewMode('list')}
                    style={[
                        styles.iconButton,
                        viewMode === 'list' && styles.selectedIconButton,
                    ]}
                >
                    <IconSymbol
                        size={20}
                        name="list"
                        color={
                            viewMode === 'list' ? colors.white : colors.darkBlue
                        }
                    />
                </Pressable>

                <Pressable
                    disabled
                    onPress={() => setViewMode('calendar')}
                    style={[
                        styles.iconButton,
                        viewMode === 'calendar' && styles.selectedIconButton,
                    ]}
                >
                    <IconSymbol
                        size={20}
                        name="calendar"
                        color={
                            viewMode === 'calendar'
                                ? colors.white
                                : colors.darkBlue
                        }
                    />
                </Pressable>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}
            >
                {sortedMonths.map((monthKey, index) => (
                    <View
                        key={monthKey}
                        style={[
                            styles.monthSection,
                            index === sortedMonths.length - 1 && {
                                marginBottom: 0,
                            },
                        ]}
                    >
                        {/* Maand */}
                        <Text style={styles.monthTitle}>
                            {getMonthLabel(monthKey)}
                        </Text>

                        {/* Entries van die maand */}
                        <View style={styles.entriesList}>
                            {grouped[monthKey]
                                .sort(
                                    (a, b) =>
                                        new Date(b.date).getTime() -
                                        new Date(a.date).getTime(),
                                )
                                .map((entry) => {
                                    const date = new Date(entry.date);
                                    const day = date.getDate();
                                    const dayName = [
                                        'Zo',
                                        'Ma',
                                        'Di',
                                        'Wo',
                                        'Do',
                                        'Vr',
                                        'Za',
                                    ][date.getDay()];

                                    return (
                                        <Pressable
                                            key={entry.date}
                                            onPress={() =>
                                                handleEntryPress(entry)
                                            }
                                            style={styles.entryRow}
                                        >
                                            {/* Dag info */}
                                            <View style={styles.dayInfo}>
                                                <Text style={styles.dayName}>
                                                    {dayName}
                                                </Text>
                                                <Text style={styles.dayNumber}>
                                                    {day}
                                                </Text>
                                            </View>

                                            {/* Card met details */}
                                            <View style={styles.entryCard}>
                                                <View
                                                    style={styles.cardContent}
                                                >
                                                    {(() => {
                                                        const moodOpt =
                                                            getMoodOption(
                                                                entry.mood,
                                                            );
                                                        return moodOpt ? (
                                                            <View
                                                                style={[
                                                                    styles.moodChip,
                                                                    {
                                                                        backgroundColor:
                                                                            moodOpt.color,
                                                                    },
                                                                ]}
                                                            >
                                                                <IconSymbol
                                                                    size={16}
                                                                    name={
                                                                        moodOpt.icon!
                                                                    }
                                                                    color={
                                                                        colors.white
                                                                    }
                                                                />
                                                                <Text
                                                                    style={
                                                                        styles.moodChipText
                                                                    }
                                                                >
                                                                    {
                                                                        moodOpt.label
                                                                    }
                                                                </Text>
                                                            </View>
                                                        ) : null;
                                                    })()}

                                                    <Text
                                                        style={
                                                            styles.stressPreview
                                                        }
                                                        numberOfLines={2}
                                                    >
                                                        {entry.balanceNote ||
                                                            '-'}
                                                    </Text>
                                                </View>

                                                <IconSymbol
                                                    size={20}
                                                    name="chevron.right"
                                                    color={colors.darkBlue}
                                                />
                                            </View>
                                        </Pressable>
                                    );
                                })}
                        </View>
                    </View>
                ))}
            </ScrollView>

            <JournalEntry
                visible={entryModalVisible}
                onClose={() => {
                    setEntryModalVisible(false);
                    setSelectedEntry(null);
                }}
                reflection={selectedEntry}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
    },

    monthSection: {
        marginBottom: 40,
    },

    monthTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.black,
        marginBottom: 20,
        textTransform: 'capitalize',
    },

    entriesList: {
        gap: 10,
    },

    entryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },

    dayInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 60,
    },

    dayName: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.darkBlue,
    },

    dayNumber: {
        fontSize: 30,
        fontWeight: '700',
        color: colors.darkBlue,
        lineHeight: 32,
    },

    entryCard: {
        flex: 1,
        minHeight: 80,
        backgroundColor: colors.gray,
        borderRadius: 10,
        paddingVertical: 15,
        paddingLeft: 15,
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
    },

    cardContent: {
        flex: 1,
    },

    moodChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingLeft: 7,
        paddingRight: 10,
        paddingVertical: 5,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },

    moodChipText: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.white,
    },

    stressPreview: {
        fontSize: 13,
        fontWeight: '500',
        color: colors.darkGray,
        lineHeight: 18,
    },

    toolbar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 8,
    },

    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.gray,
    },

    selectedIconButton: {
        backgroundColor: colors.darkBlue,
    },
});
