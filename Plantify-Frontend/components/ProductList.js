import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function ProductList({ plants }) {
  const navigation = useNavigation();

  const handlePlantPress = (plant) => {
    navigation.navigate('DetailProduct', { plant });
  };

  const renderPlantItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.plantCard}
      onPress={() => handlePlantPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.plantImage}
        />
        
        <View style={styles.plantInfo}>
          <View style={styles.textContainer}>
            <Text style={styles.plantName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.scientificName} numberOfLines={1}>
              {item.scientificName}
            </Text>
          </View>

          <View style={styles.characteristicsContainer}>
            {/* Difficulté */}
            <View style={styles.characteristic}>
              <Ionicons name="leaf" size={16} color="#1A3B0A" />
              <Text style={styles.characteristicText}>{item.difficulty}</Text>
            </View>

          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const EmptyListComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="leaf-outline" size={60} color="#B4D8B2" />
      <Text style={styles.emptyTitle}>Aucune plante trouvée</Text>
      <Text style={styles.emptySubtitle}>
        Essayez de modifier vos critères de recherche
      </Text>
    </View>
  );

  return (
    <FlatList
      data={plants}
      renderItem={renderPlantItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={EmptyListComponent}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  plantCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 12,
  },
  plantImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  plantInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  plantName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  scientificName: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  characteristicsContainer: {
    gap: 8,
  },
  characteristic: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  characteristicText: {
    fontSize: 14,
    color: '#1A3B0A',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A3B0A',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});