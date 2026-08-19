import { colors } from '@/styles/colors';
import { StyleSheet, Text, View } from 'react-native';

type QuoteCardProps = {
    quote: string;
    fontSize?: number;
    fontWeight?: '400' | '500' | '600' | '700' | '800' | '900';
};

export function QuoteCard({
    quote,
    fontSize = 15,
    fontWeight = '700',
}: QuoteCardProps) {
    return (
        <View style={styles.card}>
            <Text style={styles.quoteMarkLeft}>“</Text>

            <Text
                style={[
                    styles.quote,
                    {
                        fontSize,
                        fontWeight,
                        lineHeight: fontSize * 1.45,
                    },
                ]}
            >
                {quote}
            </Text>

            <Text style={styles.quoteMarkRight}>”</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        minHeight: 140,
        borderRadius: 20,
        marginBottom: 30,
        backgroundColor: colors.green,
        position: 'relative',
        paddingHorizontal: 40,
        paddingVertical: 35,
    },

    quote: {
        color: colors.white,
    },

    quoteMarkLeft: {
        position: 'absolute',
        top: 8,
        left: 20,
        fontSize: 35,
        fontWeight: '700',
        color: colors.white,
        opacity: 0.9,
    },

    quoteMarkRight: {
        position: 'absolute',
        bottom: -2,
        right: 20,
        fontSize: 35,
        fontWeight: '700',
        color: colors.white,
        opacity: 0.9,
    },
});
