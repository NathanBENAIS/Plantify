import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  SafeAreaView,
  Animated,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { RECIPES_DATA } from '../data/RecipesData.js';

const categories = [
  { id: '1', name: 'Toutes', icon: 'grid-outline' },
  { id: '2', name: 'Bien-être', icon: 'leaf-outline' },
  { id: '3', name: 'Beauté', icon: 'flower-outline' },
  { id: '4', name: 'Relaxation', icon: 'water-outline' },
  { id: '5', name: 'Santé', icon: 'medical-outline' },
];

export default function Advice() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(['Toutes']);
  const [showFilters, setShowFilters] = useState(false);
  const [filterAnimation] = useState(new Animated.Value(0));

  const toggleFilters = () => {
    const toValue = showFilters ? 0 : 1;
    Animated.spring(filterAnimation, {
      toValue,
      useNativeDriver: true,
      friction: 8,
    }).start();
    setShowFilters(!showFilters);
  };

  const toggleCategory = (categoryName) => {
    setSelectedCategories(prev => {
      if (categoryName === 'Toutes') {
        return ['Toutes'];
      }
      
      const newCategories = prev.filter(cat => cat !== 'Toutes');
      
      if (prev.includes(categoryName)) {
        const filtered = newCategories.filter(cat => cat !== categoryName);
        return filtered.length === 0 ? ['Toutes'] : filtered;
      } else {
        return [...newCategories, categoryName];
      }
    });
  };

  const filteredRecipes = RECIPES_DATA.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategories.includes('Toutes') || 
                           selectedCategories.includes(recipe.category);
    
    return matchesSearch && matchesCategory;
  });

  const renderCategoryButton = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategories.includes(item.name) && styles.categoryButtonActive
      ]}
      onPress={() => toggleCategory(item.name)}
    >
      <Ionicons 
        name={item.icon} 
        size={22} 
        color={selectedCategories.includes(item.name) ? '#FFFFFF' : '#539211'} 
      />
      <Text style={[
        styles.categoryButtonText,
        selectedCategories.includes(item.name) && styles.categoryButtonTextActive
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderRecipeCard = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => {
        setSelectedRecipe(item);
        setModalVisible(true);
      }}
    >
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <View style={styles.recipeBadge}>
        <Text style={styles.recipeBadgeText}>{item.category}</Text>
      </View>
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeName}>{item.name}</Text>
        <View style={styles.recipeMetaInfo}>
          <View style={styles.recipeMetaItem}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.recipeMetaText}>{item.preparationTime}</Text>
          </View>
          <View style={styles.recipeMetaItem}>
            <Ionicons name="leaf-outline" size={16} color="#666" />
            <Text style={styles.recipeMetaText}>{item.difficulty}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recettes Naturelles</Text>
        <Text style={styles.headerSubtitle}>Découvrez nos remèdes ancestraux</Text>
      </View>

      {/* Search Bar with Filter Button */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une recette..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity 
          style={[
            styles.filterButton,
            showFilters && styles.filterButtonActive
          ]} 
          onPress={toggleFilters}
        >
          <Ionicons 
            name="options-outline" 
            size={24} 
            color={showFilters ? '#FFFFFF' : '#1A3B0A'} 
          />
        </TouchableOpacity>
      </View>

     {/* Animated Categories */}
<Animated.View style={[
  styles.categoriesContainer,
  {
    transform: [{
      translateY: filterAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, 0]
      })
    }],
    opacity: filterAnimation
  }
]}>
  {showFilters && (
    <View style={styles.categoriesList}>
      {categories.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.categoryButton,
            selectedCategories.includes(item.name) && styles.categoryButtonActive
          ]}
          onPress={() => toggleCategory(item.name)}
        >
          <Ionicons 
            name={item.icon} 
            size={22} 
            color={selectedCategories.includes(item.name) ? '#FFFFFF' : '#539211'} 
          />
          <Text style={[
            styles.categoryButtonText,
            selectedCategories.includes(item.name) && styles.categoryButtonTextActive
          ]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )}
</Animated.View>

      {/* Recipes Grid */}
      <FlatList
        data={filteredRecipes}
        renderItem={renderRecipeCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.recipesGrid}
      />

      {/* Recipe Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
            {selectedRecipe && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                  source={{ uri: selectedRecipe.image }}
                  style={styles.modalImage}
                />
                <View style={styles.modalBody}>
                  <Text style={styles.modalTitle}>{selectedRecipe.name}</Text>
                  <View style={styles.modalBadge}>
                    <Text style={styles.modalBadgeText}>{selectedRecipe.category}</Text>
                  </View>
                  <Text style={styles.modalDescription}>{selectedRecipe.description}</Text>
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Ingrédients</Text>
                    {selectedRecipe.ingredients?.map((ingredient, index) => (
                      <View key={index} style={styles.ingredientItem}>
                        <Ionicons name="leaf" size={12} color="#539211" />
                        <Text style={styles.ingredientText}>{ingredient}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', 
  },
  header: {
    paddingTop: 35,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#B4D8B2',
  },
  headerTitle: {
    fontFamily: 'Belleza',
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A3B0A',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#1A3B0A',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
    gap: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', 
    marginTop : 5,
    padding: 2,
    borderRadius: 12,
  },
  
  filterButton: {
    backgroundColor: '#B4D8B2',
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  filterButtonActive: {
    backgroundColor: '#1A3B0A',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  categoriesContainer: {
    overflow: 'hidden',
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
  },
  categoriesList: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 15,
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#539211',
    marginBottom: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#539211',
    borderColor: '#539211',
  },
  categoryButtonText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#539211',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  recipesGrid: {
    padding: 10,
  },
  recipeCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#F5F5F5', 
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  recipeImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  recipeBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(83, 146, 17, 0.9)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  recipeBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  recipeInfo: {
    padding: 12,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  recipeMetaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recipeMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipeMetaText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 60,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  modalImage: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalBody: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  modalBadge: {
    backgroundColor: '#539211',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  modalBadgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  modalSection: {
    marginTop: 16,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ingredientText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
});