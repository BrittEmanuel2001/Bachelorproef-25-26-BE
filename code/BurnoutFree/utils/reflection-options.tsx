import { colors } from '@/styles/colors';
import { SelectorOption } from '@/components/ui/journal/option-selector';

export const moodOptions: SelectorOption[] = [
    {
        id: 1,
        label: 'Lastig',
        color: colors.darkBlue,
        icon: 'face.really.unhappy',
    },
    {
        id: 2,
        label: 'Beetje minder',
        color: colors.purple,
        icon: 'face.unhappy',
    },
    {
        id: 3,
        label: 'Oké',
        color: colors.darkGray,
        icon: 'face.neutral',
    },
    {
        id: 4,
        label: 'Goed',
        color: colors.green,
        icon: 'face.happy',
    },
    {
        id: 5,
        label: 'Heel goed',
        color: colors.darkGreen,
        icon: 'face.really.happy',
    },
];

export const energyOptions: SelectorOption[] = [
    {
        id: 1,
        label: 'Uitgeput',
        color: colors.darkBlue,
    },
    {
        id: 2,
        label: 'Moe',
        color: colors.purple,
    },
    {
        id: 3,
        label: 'Gemiddeld',
        color: colors.darkGray,
    },
    {
        id: 4,
        label: 'Energiek',
        color: colors.green,
    },
    {
        id: 5,
        label: 'Vol energie',
        color: colors.darkGreen,
    },
];

export const stressOptions: SelectorOption[] = [
    {
        id: 1,
        label: 'Helemaal ontspannen',
        color: colors.darkGreen,
    },
    {
        id: 2,
        label: 'Rustig',
        color: colors.green,
    },
    {
        id: 3,
        label: 'Gemiddeld',
        color: colors.darkGray,
    },
    {
        id: 4,
        label: 'Gespannen',
        color: colors.purple,
    },
    {
        id: 5,
        label: 'Helemaal gespannen',
        color: colors.darkBlue,
    },
];