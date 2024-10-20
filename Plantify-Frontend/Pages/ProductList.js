import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';

// Liste simulée de plantes
const SIMULATED_PLANTS = [
  { id: '1', name: 'Rose', scientificName: 'Rosa' },
  { id: '2', name: 'Tournesol', scientificName: 'Helianthus annuus' },
  { id: '3', name: 'Lavande', scientificName: 'Lavandula' },
  { id: '4', name: 'Orchidée', scientificName: 'Orchidaceae' },
  { id: '5', name: 'Cactus', scientificName: 'Cactaceae' },
  { id: '6', name: 'Fougère', scientificName: 'Polypodiopsida' },
  { id: '7', name: 'Aloe Vera', scientificName: 'Aloe barbadensis miller' },
  { id: '8', name: 'Bambou', scientificName: 'Bambusoideae' },
  { id: '9', name: 'Tulipe', scientificName: 'Tulipa' },
  { id: '10', name: 'Lys', scientificName: 'Lilium' },
];

export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [plants, setPlants] = useState(SIMULATED_PLANTS);

  const handleSearch = (text) => {
    setSearchTerm(text);
    const filteredPlants = SIMULATED_PLANTS.filter(
      plant => plant.name.toLowerCase().includes(text.toLowerCase()) ||
               plant.scientificName.toLowerCase().includes(text.toLowerCase())
    );
    setPlants(filteredPlants);
  };

  const renderPlantItem = ({ item }) => (
    <View style={styles.plantItem}>
      <Text style={styles.plantName}>{item.name}</Text>
      <Text style={styles.scientificName}>{item.scientificName}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Plantes</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher une plante..."
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        data={plants}
        renderItem={renderPlantItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.emptyList}>Aucune plante trouvée</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  plantItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  plantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
  },
  scientificName: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#7f8c8d',
  },
  emptyList: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#95a5a6',
  },
});