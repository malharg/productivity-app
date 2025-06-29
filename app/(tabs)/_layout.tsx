// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons'; // For tab icons

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="inbox" // This corresponds to inbox.tsx
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="inbox" color={color} />,
        }}
      />
      <Tabs.Screen
        name="actions" // This corresponds to actions.tsx
        options={{
          title: 'Next Actions',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="tasks" color={color} />,
        }}
      />
      {/* We will add the Projects tab later */}
    </Tabs>
  );
}