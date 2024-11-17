import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductList from '../components/ProductList';
import PlantsMap from '../components/PlantsMap';
import { PLANTS_DATA } from '../data/PlantsData';

export default function Search() {
  const [showMaps, setShowMaps] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlants, setFilteredPlants] = useState(PLANTS_DATA);

  const handleSearch = (text) => {
    setSearchTerm(text);
    const filtered = PLANTS_DATA.filter(
      plant =>
        plant.name.toLowerCase().includes(text.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPlants(filtered);
  };

  const toggleView = (showMap) => {
    setShowMaps(showMap);
    Animated.spring(animation, {
      toValue: showMap ? 1 : 0,
      useNativeDriver: true,
      tension: 20,
      friction: 7
    }).start();
  };

  const slideAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '-100%']
  });

  const slideInAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['100%', '0%']
  });

  return (
    <View style={styles.container}>
 
          <View style={styles.header}>

        {/* Boutons de basculement */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => toggleView(true)}
            activeOpacity={0.8}
            style={[styles.toggleButton, styles.leftButton, showMaps && styles.activeButton]}
          >
            <Ionicons name="map" size={20} color={showMaps ? '#FFF' : '#b4d8b2'} />
            <Text style={[styles.buttonText, showMaps && styles.activeButtonText]}>Carte</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => toggleView(false)}
            activeOpacity={0.8}
            style={[styles.toggleButton, styles.rightButton, !showMaps && styles.activeButton]}
          >
            <Ionicons name="list" size={20} color={!showMaps ? '#FFF' : '#b4d8b2'} />
            <Text style={[styles.buttonText, !showMaps && styles.activeButtonText]}>Liste</Text>
          </TouchableOpacity>
        </View>

        {/* Barre de recherche centralisée */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une plante..."
            value={searchTerm}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      <View style={styles.animationContainer}>
        <Animated.View
          style={[styles.content, {
            transform: [{ translateX: slideAnimation }],
            position: 'absolute',
            width: '100%',
            height: '100%'
          }]}
        >
          <ProductList plants={filteredPlants} />
        </Animated.View>

        <Animated.View
          style={[styles.content, {
            transform: [{ translateX: slideInAnimation }],
            position: 'absolute',
            width: '100%',
            height: '100%'
          }]}
        >
          <PlantsMap plants={filteredPlants} />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    zIndex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom:'10%'
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    minWidth: 120,
  },
  leftButton: {
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderRightWidth: 0,
  },
  rightButton: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    marginLeft: -18,
    marginTop: 2,
  },
  activeButton: {
    backgroundColor: '#b4d8b2',
  },
  buttonText: {
    color: '#b4d8b2',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  activeButtonText: {
    color: '#FFF',
  },
  animationContainer: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
});