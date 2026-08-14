import { Image, StyleSheet, Text, View, Pressable, ImageSourcePropType } from 'react-native';
import { colors } from '@/styles/colors';
import { IconSymbol } from '@/components/ui/icon-symbol';

type CheckupCardProps = {
    title: string;
    subtitle?: string;
    image: ImageSourcePropType;
    button: {
        text: string;
        icon?: string;
        onPress?: () => void;
    };
}

export function CheckupCard({title, subtitle, image, button}: CheckupCardProps) {
    return (
        <View style={styles.card}>
            <View style={styles.content}> 
                <Text style={styles.subtitle}>{subtitle}</Text>
                <Text style={styles.title}>{title}</Text> 
                <Pressable 
                    onPress={button.onPress}
                    style={styles.button}
                > 
                    {button.icon && (<IconSymbol size={20} name={button.icon} color={colors.primary}/>)}
                    <Text style={styles.buttonText}>{button.text}</Text> 
                </Pressable> 
            </View>
            <Image
                source={image}
                style={styles.backgroundImage}
            />
        </View>
    );
}

const styles = StyleSheet.create({ 
    card: { 
        minHeight: 140,
        borderRadius: 20, 
        overflow: 'hidden', 
        marginBottom: 30, 
        backgroundColor: colors.primary,
        position: 'relative',
        padding: 25,
    },
    backgroundImage: {
        position: 'absolute',
        top: -30,
        right: -50,
        height: 200,
        width: 200,
        resizeMode: 'contain',
    },
    content: { 
        width: '70%',
        zIndex: 1,
    }, 
    subtitle: {
        color: colors.white,
        fontSize: 11,
        fontWeight: '600',
        marginBottom: 25,
    },
    title: {
        color: colors.white,
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '600',
        marginBottom: 20,
    },
    button: { 
        alignSelf: 'flex-start', 
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15, 
        paddingVertical: 10, 
        borderRadius: 10, 
        gap: 8,
        backgroundColor: colors.darkBlue 
    },
    buttonText: { 
        color: colors.white, 
        fontWeight: '500', 
    }, 
});