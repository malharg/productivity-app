import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useData } from '../../src/hooks/useData';

export default function ProjectsScreen() {
    const { projects, isLoading } = useData();

    if (isLoading) {
        return <View style={styles.container}><Text>Loading...</Text></View>
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.header}>All Projects</Text>
                <FlatList
                    data={projects}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.projectItem}>
                            <Text style={styles.projectText}>{item.name}</Text>
                        </View>
                    )}
                    ListEmptyComponent={<View style={styles.emptyContainer}><Text>No projects created yet.</Text></View>}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    container: { flex: 1, padding: 15 },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    projectItem: {
        padding: 20,
        backgroundColor: '#f8f9fa',
        borderBottomWidth: 1,
        borderBottomColor: '#dee2e6',
        borderRadius: 5,
        marginBottom: 10,
    },
    projectText: {
        fontSize: 18,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});