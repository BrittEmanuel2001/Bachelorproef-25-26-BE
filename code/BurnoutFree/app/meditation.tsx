import { useState, useCallback } from 'react';
import { useFocusEffect, router } from 'expo-router';

import { MeditationModal, MeditationData } from '@/components/ui/meditatie/meditation-modal';
import { MeditationExercise } from '@/components/ui/meditatie/meditation-exercise';

export default function MeditationScreen() {
    const [meditationVisible, setMeditationVisible] = useState(false);
    const [meditationData, setMeditationData] = useState<MeditationData | null>(null);

    // Alleen de instellingenmodal openen wanneer er nog geen 
    // actieve meditatie is.
    useFocusEffect(
        useCallback(() => {
            if (!meditationData) setMeditationVisible(true);
        }, [meditationData])
    );

    function closeMeditation() {
        setMeditationVisible(false);
        router.back();
    }

    function handleMeditationStart(data: MeditationData) {
        setMeditationData(data);
        setMeditationVisible(false);
    }

    function handleMeditationFinish() {
        setMeditationData(null);
        setMeditationVisible(false);
        router.replace('/');
    }

    if (meditationData) {
        return (
            <MeditationExercise
                duration={meditationData.duration}
                soundType={meditationData.soundType}
                onFinish={handleMeditationFinish}
            />
        );
    }

    return (
        <MeditationModal
            visible={meditationVisible}
            onClose={closeMeditation}
            onStart={handleMeditationStart}
        />
    );
}
