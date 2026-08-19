import { getLocales } from 'expo-localization';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type Language = 'nl' | 'en';
type TranslationValue = string | ((params: Record<string, string | number>) => string);

type TranslationDictionary = Record<string, TranslationValue>;

const translations: Record<Language, TranslationDictionary> = {
    nl: {
        'tab.home': 'Home',
        'tab.journal': 'Dagboek',
        'tab.development': 'Ontwikkeling',
        'tab.knowledge': 'Kennis',
        'tab.tools': 'Tools',
        'home.greeting': 'Hoi Britt!',
        'home.subtitle': 'Fijn dat je even tijd maakt voor jezelf',
        'home.checkup': 'Hoe voel je je vandaag?',
        'home.reflect': 'Even reflecteren',
        'home.stress101': 'Stress 101',
        'home.stressLesson': 'De ene stress is de andere niet',
        'home.quote': 'Rust is geen beloning voor hard werken. Het is een basis om goed te kunnen leven.',
        'section.your': 'Jouw',
        'development.myMoments': 'Mijn momenten',
        'development.together': 'Samen op pad',
        'development.myMomentsContent': 'Content van mijn momenten',
        'development.togetherContent': 'Content van samen op pad',
        'knowledge.title': 'Kennishoek',
        'knowledge.all': 'Alles',
        'knowledge.collection': 'Mijn verzameling',
        'knowledge.allCourses': 'Alle cursussen',
        'knowledge.myCourses': 'Mijn cursussen',
        'tools.title': 'Tools',
        'tools.offer': 'Ons aanbod',
        'tool.breathing': 'Ademhaling',
        'tool.meditation': 'Meditatie',
        'tool.focus': 'Focus modus',
        'tool.sos': 'SOS',
        'tool.copingCards': 'Coping cards',
        'tool.pro': 'Pro functie',
        'toolkit.title': 'Jouw toolkit',
        'journal.today': 'Vandaag',
        'journal.history': 'Geschiedenis',
        'journal.entry': 'Dagboeknotitie',
        'journal.mood': 'Stemming',
        'journal.energy': 'Energie niveau',
        'journal.sleep': 'Slaap',
        'journal.hour': 'uur',
        'journal.noAnswer': 'Geen antwoord ingevuld',
        'journal.stress': 'Stress',
        'journal.balancedThought': 'Gebalanceerde gedachte',
        'journal.morning': 'Goede morgen!',
        'journal.evening': 'Goedenavond!',
        'journal.eveningText': 'Hoe was je dag vandaag? Neem rustig even de tijd om terug te kijken op wat je hebt meegemaakt.',
        'journal.morningText': 'Hoe gaat het vandaag met je?\nLaten we rustig even stilstaan bij\nhoe je je voelt.',
        'today.stressSubtitle': 'Verhoogd stressniveau',
        'today.stressText': 'Je antwoorden wijzen op verhoogde spanning. Een korte ademhalingsoefening kan helpen om even die rust terug te vinden.',
        'today.startExercise': 'Start oefening',
        'today.myAnswers': 'Naar mijn antwoorden',
        'journal.search': 'Zoeken',
        'journal.dayNames': 'Zo,Ma,Di,Wo,Do,Vr,Za',
        'reflection.mood': 'Stemming',
        'reflection.energyCheck': 'Energie check-up',
        'reflection.stressLevel': 'Stressniveau',
        'reflection.mindset': 'Mindset shift',
        'reflection.title': 'Reflectie',
        'settings.title': 'Instellingen',
        'settings.support': 'Begeleidingsintensiteit',
        'settings.supportLevel': 'Gewenste ondersteuningsniveau',
        'settings.reminders': 'Nood aan reminders',
        'settings.notifications': 'Notificaties',
        'settings.encouragements': 'Anonieme aanmoedigingen',
        'settings.emergency': 'Noodcontact',
        'profile.title': 'Mijn profiel',
        'profile.growth': 'Jouw groeimomenten',
        'profile.goal': 'Jouw doel',
        'level.low': 'Laag',
        'level.medium': 'Gemiddeld',
        'level.high': 'Hoog',
        'meditation.title': 'Meditatie',
        'meditation.subtitle': 'Laat je gedachten tot stilte komen',
        'meditation.duration': 'Hoe lang wil je mediteren?',
        'meditation.quick': 'Snelle pauze',
        'meditation.mini': 'Mini sessie',
        'meditation.medium': 'Medium sessie',
        'meditation.full': 'Hele sessie',
        'meditation.silence': 'Stilte',
        'meditation.rain': 'Regen',
        'meditation.ocean': 'Oceaan',
        'meditation.forest': 'Bos',
        'meditation.recommended': 'Mijn aanrader',
        'meditation.sound': 'Welk geluid maakt je rustig?',
        'meditation.changeDuration': 'Wijzig duur',
        'meditation.start': 'Start mijn sessie',
        'common.next': 'Volgende',
        'common.close': 'Sluiten',
    },
    en: {
        'tab.home': 'Home',
        'tab.journal': 'Journal',
        'tab.development': 'Development',
        'tab.knowledge': 'Knowledge',
        'tab.tools': 'Tools',
        'home.greeting': 'Hi Britt!',
        'home.subtitle': 'Nice that you are taking a moment for yourself',
        'home.checkup': 'How are you feeling today?',
        'home.reflect': 'Take a moment to reflect',
        'home.stress101': 'Stress 101',
        'home.stressLesson': 'Not all stress is the same',
        'home.quote': 'Rest is not a reward for hard work. It is a foundation for living well.',
        'section.your': 'Your',
        'development.myMoments': 'My moments',
        'development.together': 'Together on the way',
        'development.myMomentsContent': 'Content from my moments',
        'development.togetherContent': 'Content from together on the way',
        'knowledge.title': 'Knowledge corner',
        'knowledge.all': 'All',
        'knowledge.collection': 'My collection',
        'knowledge.allCourses': 'All courses',
        'knowledge.myCourses': 'My courses',
        'tools.title': 'Tools',
        'tools.offer': 'What we offer',
        'tool.breathing': 'Breathing',
        'tool.meditation': 'Meditation',
        'tool.focus': 'Focus mode',
        'tool.sos': 'SOS',
        'tool.copingCards': 'Coping cards',
        'tool.pro': 'Pro feature',
        'toolkit.title': 'Your toolkit',
        'journal.today': 'Today',
        'journal.history': 'History',
        'journal.entry': 'Journal entry',
        'journal.mood': 'Mood',
        'journal.energy': 'Energy level',
        'journal.sleep': 'Sleep',
        'journal.hour': 'hours',
        'journal.noAnswer': 'No answer entered',
        'journal.stress': 'Stress',
        'journal.balancedThought': 'Balanced thought',
        'journal.morning': 'Good morning!',
        'journal.evening': 'Good evening!',
        'journal.eveningText': 'How was your day? Take a moment to look back at what you experienced.',
        'journal.morningText': 'How are you doing today?\nLet us take a moment to notice\nhow you feel.',
        'today.stressSubtitle': 'Elevated stress level',
        'today.stressText': 'Your answers suggest increased tension. A short breathing exercise may help you find some calm again.',
        'today.startExercise': 'Start exercise',
        'today.myAnswers': 'View my answers',
        'journal.search': 'Search',
        'journal.dayNames': 'Su,Mo,Tu,We,Th,Fr,Sa',
        'reflection.mood': 'Mood',
        'reflection.energyCheck': 'Energy check-in',
        'reflection.stressLevel': 'Stress level',
        'reflection.mindset': 'Mindset shift',
        'reflection.title': 'Reflection',
        'settings.title': 'Settings',
        'settings.support': 'Support intensity',
        'settings.supportLevel': 'Preferred support level',
        'settings.reminders': 'Need for reminders',
        'settings.notifications': 'Notifications',
        'settings.encouragements': 'Anonymous encouragements',
        'settings.emergency': 'Emergency contact',
        'profile.title': 'My profile',
        'profile.growth': 'Your growth moments',
        'profile.goal': 'Your goal',
        'level.low': 'Low',
        'level.medium': 'Medium',
        'level.high': 'High',
        'meditation.title': 'Meditation',
        'meditation.subtitle': 'Let your thoughts become still',
        'meditation.duration': 'How long would you like to meditate?',
        'meditation.quick': 'Quick break',
        'meditation.mini': 'Mini session',
        'meditation.medium': 'Medium session',
        'meditation.full': 'Full session',
        'meditation.silence': 'Silence',
        'meditation.rain': 'Rain',
        'meditation.ocean': 'Ocean',
        'meditation.forest': 'Forest',
        'meditation.recommended': 'Recommended for you',
        'meditation.sound': 'Which sound helps you relax?',
        'meditation.changeDuration': 'Change duration',
        'meditation.start': 'Start my session',
        'common.next': 'Next',
        'common.close': 'Close',
    },
};

type TranslationContextValue = {
    language: Language;
    t: (key: string) => string;
    locale: string;
};

const TranslationContext = createContext<TranslationContextValue | null>(null);

function getSystemLanguage(): Language {
    return getLocales()[0]?.languageCode === 'en' ? 'en' : 'nl';
}

export function TranslationProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>(getSystemLanguage);

    useEffect(() => {
        setLanguage(getSystemLanguage());
    }, []);

    const value = useMemo(() => {
        const locale = language === 'en' ? 'en-US' : 'nl-BE';
        return {
            language,
            locale,
            t: (key: string) => {
                const translation = translations[language][key] ?? translations.nl[key] ?? key;
                return typeof translation === 'function'
                    ? translation({})
                    : translation;
            },
        };
    }, [language]);

    return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
}

export function useTranslation() {
    const context = useContext(TranslationContext);
    if (!context) {
        throw new Error('useTranslation must be used inside TranslationProvider');
    }
    return context;
}
