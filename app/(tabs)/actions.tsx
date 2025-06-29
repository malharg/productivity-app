// app/(tabs)/actions.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NextActionsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Next Actions</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});