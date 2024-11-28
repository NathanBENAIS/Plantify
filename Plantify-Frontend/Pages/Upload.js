import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image, Modal, Button } from 'react-native';

const recipes = [
  { id: 1, name: 'Recette 1', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFWvhopJy3uECB10Z1cDYDQG5fX6MMaiFv_Q&s', category: 'Maladie', description: 'Description détaillée de la recette 1' },
  { id: 2, name: 'Recette 2', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO4nzyRhFY2ckkeVpsX8d4ur5pRXglLACHLQ&s', category: 'Beauté', description: 'Dans un blender versez 2 cuillères à soupe de gel d’aloe vera, 250 ml d’eau, 1/2 jus de citron et un peu de miel (j’ajoute une petite cuillère à café, c’est selon votre goût). Mixez jusqu’à obtenir un jus homogène.' },
  { id: 3, name: 'Recette 3', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs3SUForeDP-HZePDb2559nnfNVzF7EWVRbA&s', category: 'Bien-être', description: 'Description détaillée de la recette 3' },
  { id: 4, name: 'Recette 4', image: 'https://encrypted-tbn0.gstatic.com/images?  q=tbn:ANd9GcSs3SUForeDP-HZePDb2559nnfNVzF7EWVRbA&s', category: 'Relaxation', description: 'Description détaillée de la recette 4' },
];

export default function MedicinalRecipesApp() {
  const [open, setOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleOpen = (recipe) => {
    setSelectedRecipe(recipe);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || recipe.category === selectedCategory)
  );

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleOpen(item)}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardCategory}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catalogue des Recettes Médicinales</Text>
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Rechercher"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <TextInput
          style={styles.selectCategory}
          placeholder="Catégorie"
          value={selectedCategory}
          onChangeText={(text) => setSelectedCategory(text)}
        />
      </View>
      <FlatList
        data={filteredRecipes}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
      <Modal visible={open} transparent={true} animationType="slide" onRequestClose={handleClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedRecipe && (
              <>
                <Image source={{ uri: selectedRecipe.image }} style={styles.popupImage} />
                <Text style={styles.popupTitle}>{selectedRecipe.name}</Text>
                <Text style={styles.popupDescription}>{selectedRecipe.description}</Text>
                <Button title="Fermer" onPress={handleClose} />
              </>
            )}
          </View>
        </View>
      </Modal>
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
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#e8f5e9',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  selectCategory: {
    flex: 1,
    backgroundColor: '#e8f5e9',
    padding: 10,
    borderRadius: 5,
  },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#a5d6a7',
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495e',
  },
  cardCategory: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  popupImage: {
    width: '100%',
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 10,
  },
  popupDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 15,
    textAlign: 'center',
  },
});
