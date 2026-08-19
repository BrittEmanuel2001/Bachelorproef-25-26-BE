import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const CHANNEL_ID = 'burnoutfree-reminders';
const scheduledDemoNotifications = new Map<string, string>();

type DemoNotification = {
    key: string;
    name: string;
};

if (Platform.OS !== 'web') {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: false,
            shouldSetBadge: false,
            shouldShowBanner: true,
            shouldShowList: true,
        }),
    });
}

async function requestNotificationPermission(): Promise<boolean> {
    if (Platform.OS === 'web') {
        return false;
    }

    try {
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
                name: 'BurnoutFree reminders',
                importance: Notifications.AndroidImportance.DEFAULT,
            });
        }

        const currentPermissions = await Notifications.getPermissionsAsync();
        const permissions = currentPermissions.granted
            ? currentPermissions
            : await Notifications.requestPermissionsAsync();

        return (
            permissions.granted ||
            permissions.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
        );
    } catch (error) {
        console.warn('Notificaties zijn niet beschikbaar.', error);
        return false;
    }
}

export async function scheduleDemoNotification(
    key: string,
    name: string,
): Promise<boolean> {
    const hasPermission = await requestNotificationPermission();

    if (!hasPermission) {
        return false;
    }

    try {
        const existingNotification = scheduledDemoNotifications.get(key);
        if (existingNotification) {
            await Notifications.cancelScheduledNotificationAsync(
                existingNotification,
            );
        }

        const identifier = await Notifications.scheduleNotificationAsync({
            content: {
                title: `BurnoutFree: ${name}`,
                body: 'Tijd voor een momentje voor jezelf.',
                data: { notificationType: key },
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds: 10,
                repeats: false,
                channelId: CHANNEL_ID,
            },
        });

        scheduledDemoNotifications.set(key, identifier);
        return true;
    } catch (error) {
        console.warn('De voorbeeldnotificatie kon niet worden gepland.', error);
        return false;
    }
}

export async function scheduleDemoNotifications(
    notifications: DemoNotification[],
): Promise<boolean> {
    const hasPermission = await requestNotificationPermission();

    if (!hasPermission) {
        return false;
    }

    const results = await Promise.all(
        notifications.map(async ({ key, name }) => {
            const existingNotification = scheduledDemoNotifications.get(key);
            if (existingNotification) {
                await Notifications.cancelScheduledNotificationAsync(
                    existingNotification,
                );
            }

            try {
                const identifier = await Notifications.scheduleNotificationAsync({
                    content: {
                        title: `BurnoutFree: ${name}`,
                        body: 'Tijd voor een momentje voor jezelf.',
                        data: { notificationType: key },
                    },
                    trigger: {
                        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                        seconds: 10,
                        repeats: false,
                        channelId: CHANNEL_ID,
                    },
                });

                scheduledDemoNotifications.set(key, identifier);
                return true;
            } catch (error) {
                console.warn(
                    'De voorbeeldnotificatie kon niet worden gepland.',
                    error,
                );
                return false;
            }
        }),
    );

    return results.every(Boolean);
}

export async function cancelDemoNotification(key: string): Promise<void> {
    const identifier = scheduledDemoNotifications.get(key);

    if (!identifier) {
        return;
    }

    try {
        await Notifications.cancelScheduledNotificationAsync(identifier);
    } catch (error) {
        console.warn('De voorbeeldnotificatie kon niet worden verwijderd.', error);
    } finally {
        scheduledDemoNotifications.delete(key);
    }
}