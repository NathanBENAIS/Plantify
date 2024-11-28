import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function DetailAdvice({ route }) {
  const { recipe } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <Text style={styles.title}>{recipe.name}</Text>
      <Text style={styles.category}>Catégorie : {recipe.category}</Text>

      <Text style={styles.sectionTitle}>Description détaillée :</Text>
      <ScrollView style={styles.descriptionContainer} contentContainerStyle={styles.descriptionContent}>
        <Text style={styles.description}>{recipe.description}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2c3e50',
  },
  category: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#7f8c8d',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#34495e',
  },
  descriptionContainer: {
    flex: 1,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  descriptionContent: {
    paddingVertical: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2c3e50',
  },
});
