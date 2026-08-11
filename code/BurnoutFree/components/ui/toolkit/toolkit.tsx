import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View,} from 'react-native';

import { colors } from '@/styles/colors';
import { IconSymbol } from '../icon-symbol';
import { ToolkitCard, ToolkitItem } from './toolkit-card';
import { ToolCard } from './tools-card';

/* Selected toolkit items */
const STORAGE_KEY = '@toolkit_items';
const DEFAULT_ITEMS = ['breathing','meditate','focus','sos'];
const AVAILABLE_ITEMS: ToolkitItem[] = [
    {
        id: 'breathing',
        title: 'Ademhaling',
        icon: 'leaf.fill',
        route: '#',
    },
    {
        id: 'meditate',
        title: 'Meditatie',
        icon: 'spa.fill',
        route: '#',
    },
    {
        id: 'focus',
        title: 'Focus modus',
        icon: 'glasses.fill',
        route: '#',
    },
    {
        id: 'sos',
        title: 'SOS',
        icon: 'lightning.fill',
        route: '#',
    },
    {
        id: 'coping-cards',
        title: 'Coping cards',
        icon: 'note.fill',
        route: '#',
    },
    {
        id: 'pro-example',
        title: 'Pro functie',
        icon: 'circle.question',
        route: '#',
    }
];

export function Toolkit() {
    const [selectedItems, setSelectedItems] = useState<string[]>(DEFAULT_ITEMS);
    const [editingItems, setEditingItems] = useState<string[]>(DEFAULT_ITEMS);
    const [editMode, setEditMode] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    {/* Laad logica */}
    const loadToolkit = useCallback(async () => {
        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEY);
            if (stored) setSelectedItems(JSON.parse(stored));
        } catch (error) {
            console.error('Kan de toolkit momenteel niet laden. Probeer later opnieuw.', error);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadToolkit();
        }, [loadToolkit])
    );

    {/* Save logica */}
    async function saveToolkit(items: string[]) {
        try {
            await AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(items));
        } catch (error) {
            console.error('Kan de toolkit momenteel niet opslaan.', error);
        }
    }

    {/* Edit logica */}
    function toggleItem(id: string) {
        setEditingItems((current) => {
            const exists = current.includes(id);

            return exists
                ? current.filter((itemId) => itemId !== id)
                : [...current, id];
        });
    }

    const selectedToolkitItems = AVAILABLE_ITEMS.filter((item) =>
        selectedItems.includes(item.id)
    );

    const editingToolkitItems = AVAILABLE_ITEMS.filter((item) =>
        editingItems.includes(item.id)
    );

    return (
        <>
            {/* Toolkit display */}
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.heading}>Jouw toolkit</Text>
                    <Pressable 
                        onPress={() => { 
                            setEditingItems(selectedItems);
                            setEditMode(true); 
                            setModalVisible(true);
                        }}>
                        <IconSymbol size={15} name="pen.fill" color={colors.darkBlue} />
                    </Pressable>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.grid}
                >
                    {selectedToolkitItems.map((item) => (
                        <ToolkitCard
                            key={item.id}
                            item={item}
                        />
                    ))}
                </ScrollView>
            </View>

            {/* Toolkit edit */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent
                statusBarTranslucent
                onRequestClose={() => {
                    setModalVisible(false);
                    setEditMode(false);
                }}
            >
                <View style={styles.modal}>
                    
                    {/* Header */}
                    <Pressable
                        onPress={() => {
                            setEditingItems(selectedItems);
                            setModalVisible(false);
                            setEditMode(false);
                        }}
                        style={{marginBottom: 20}}
                    >
                        <IconSymbol size={22} name="arrow.left" color={colors.darkBlue}/>
                    </Pressable>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Toolkit aanpassen</Text>
                        <Text style={styles.modalSubTitle}>Jouw toolkit</Text>
                    </View>

                    {/* Huidige toolkit */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.selectedScroll}
                        contentContainerStyle={styles.selectedGrid}
                    >
                        {editingToolkitItems.map((item) => (
                            <View key={item.id} style={styles.selectedCard}>
                                <ToolkitCard
                                    key={item.id}
                                    item={item}
                                    onPress={() => toggleItem(item.id)}
                                />
                                <View style={styles.closeIcon}>
                                    <IconSymbol size={10} name="xmark" color={colors.white} />
                                </View>
                            </View>
                        ))}
                    </ScrollView>

                    {/* Tools */}
                    <Text style={styles.heading}>Voeg toe aan je toolkit</Text>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{paddingTop: 20}}
                    >
                        <View style={styles.twoColGrid}>
                            {AVAILABLE_ITEMS
                                .filter((item) => !editingItems.includes(item.id))
                                .map((item) => {
                                    const buttonColors = [
                                        colors.primary,
                                        colors.green,
                                        colors.purple,
                                    ];
                                    const nonSosItems = AVAILABLE_ITEMS.filter(
                                        (availableItem) => !editingItems.includes(availableItem.id) && availableItem.id !== 'sos'
                                    );
                                    const colorIndex = nonSosItems.findIndex(
                                        (availableItem) => availableItem.id === item.id
                                    );

                                    const color = item.id === 'sos'
                                    ? colors.red : item.id === 'pro-example' 
                                    ? colors.gray : buttonColors[colorIndex % buttonColors.length];

                                    return (
                                        <ToolCard
                                            key={item.id}
                                            item={item}
                                            onPress={() => toggleItem(item.id)}
                                            color={color}
                                        />
                                    )
                                })
                            }
                        </View>
                    </ScrollView>

                    {/* Confirm button */}
                    <Pressable
                        style={styles.doneButton}
                        onPress={async () => {
                            setSelectedItems(editingItems);
                            await saveToolkit(editingItems);
                            setModalVisible(false);
                            setEditMode(false);
                        }}
                    >
                        <Text style={styles.doneButtonText}>
                            Klaar
                        </Text>
                    </Pressable>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
        paddingLeft: 20,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 15,
    },

    heading: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },

    modal: {
        backgroundColor: colors.white,
        padding: 20,
        paddingTop: 50,
        paddingBottom: 80,
        flex: 1,
    },

    modalHeader: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },

    modalTitle: {
        fontSize: 24, 
        fontWeight: 'bold',
        marginBottom: 10
    },

    modalSubTitle: {
        fontSize: 14, 
        color: colors.mutedBlue, 
        fontWeight: 'bold',
        marginBottom: 20
    },

    selectedGrid: {
        flexDirection: 'row',
        gap: 10,
    },

    selectedScroll: {
        flexGrow: 0,
        height: 120,
    },

    doneButton: {
        alignSelf: 'flex-end',
        backgroundColor: colors.darkBlue,
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 20,
        alignItems: 'center',
    },

    doneButtonText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 15,
    },

    selectedCard: {
        position: 'relative',
    },

    closeIcon: {
        position: 'absolute',
        top: 0,
        right: -5,
        width: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.red,
        borderWidth: 2,
        borderColor: colors.white,
    }, 

    twoColGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 10,
    },
});