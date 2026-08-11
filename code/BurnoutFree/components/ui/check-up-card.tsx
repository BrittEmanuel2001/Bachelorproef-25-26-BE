import { Image, StyleSheet, Text, View, Pressable } from 'react-native';
import { colors } from '@/styles/colors';
import { router } from 'expo-router';

export function CheckupCard() {
    return (
        <View style={styles.card}>
            <View style={styles.content}> 
                <Text style={styles.title}>Hoe voel je je vandaag?</Text> 
                <Pressable 
                    onPress={() => router.push('/journal')}
                    style={styles.button}
                > 
                    <Text style={styles.buttonText}>Even reflecteren</Text> 
                </Pressable> 
            </View>
            <Image
                source={require('@/assets/images/Coach_Bubbles.png')}
                style={styles.backgroundImage}
            />
        </View>
    );
}

const styles = StyleSheet.create({ 
    card: { 
        height: 140,
        borderRadius: 20, 
        overflow: 'hidden', 
        marginBottom: 30, 
        backgroundColor: colors.primary,
        position: 'relative'
    },
    backgroundImage: {
        position: 'absolute',
        top: -30,
        right: -50,
        height: 220,
        width: 220,
        resizeMode: 'contain',
    },
    content: { 
        position: 'absolute',
        left: 0,
        bottom: 0,
        fontSize: 14,
        fontWeight: 'bold',
        width: '60%', 
        padding: 15
    }, 
    title: { 
        color: colors.white,
        fontWeight: '500',
        marginBottom: 10
    },
    button: { 
        alignSelf: 'flex-start', 
        paddingHorizontal: 15, 
        paddingVertical: 10, 
        borderRadius: 10, 
        backgroundColor: colors.darkBlue 
    }, 
    buttonText: { 
        color: colors.white, 
        fontWeight: '500', 
    }, 
});