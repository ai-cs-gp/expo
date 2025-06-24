import React from 'react';
import { Tabs } from 'expo-router';

import { TabBar, tabs } from '@/components';

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'red',
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      {tabs.map((tab) => (
        <Tabs.Screen key={tab.name} name={tab.name} />
      ))}
    </Tabs>
  );
};

export default TabsLayout;
