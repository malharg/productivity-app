import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="inbox" color={color} />,
        }}
      />
      <Tabs.Screen
        name="actions"
        options={{
          title: 'Next Actions',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="tasks" color={color} />,
        }}
      />
      <Tabs.Screen
        name="projects" 
        options={{
          title: 'Projects',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="briefcase" color={color} />,
        }}
      />
    </Tabs>
  );
}