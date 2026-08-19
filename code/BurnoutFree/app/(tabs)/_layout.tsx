import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { colors } from '@/styles/colors';
import { useTranslation } from '@/utils/i18n';

export default function TabLayout() {
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.darkBlue,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarIconStyle: {
          marginBottom: 5,
        },
        tabBarStyle: {
          paddingTop: 15,
          paddingLeft: 5,
          paddingRight: 5,
          height: 130,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('tab.home'),
          tabBarIcon: ({ color }) => <IconSymbol size={20} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: t('tab.journal'),
          tabBarIcon: ({ color }) => <IconSymbol size={20} name="journal.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="ontwikkeling"
        options={{
          title: t('tab.development'),
          tabBarIcon: ({ color }) => <IconSymbol size={20} name="plant.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="kennis"
        options={{
          title: t('tab.knowledge'),
          tabBarIcon: ({ color }) => <IconSymbol size={20} name="book.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          title: t('tab.tools'),
          tabBarIcon: ({ color }) => <IconSymbol size={20} name="toolbox.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}