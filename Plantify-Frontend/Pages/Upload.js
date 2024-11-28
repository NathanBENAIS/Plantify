import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';

const recipes = [
  { id: 1, name: 'Recette 1', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFWvhopJy3uECB10Z1cDYDQG5fX6MMaiFv_Q&s', category: 'Maladie', description: 'Description détaillée de la recette 1' },
  { 
    id: 2, 
    name: 'Recette 2', 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO4nzyRhFY2ckkeVpsX8d4ur5pRXglLACHLQ&s', 
    category: 'Beauté', 
    description: `
      Ingrédients :
      - 1 grande feuille d’aloe vera fraîche
      - 250 ml d’eau ou de jus de fruits naturel (orange ou citron recommandé)
      - 1 à 2 c. à café de miel (facultatif)

      Préparation :
      1. Préparer la feuille :
         - Lavez soigneusement la feuille.
         - Coupez les bords épineux et pelez pour récupérer le gel transparent 
           (attention à ne pas inclure la peau verte ni le latex jaune amer sous la peau, qui peut être irritant).

      2. Mixer :
         - Mettez le gel dans un mixeur avec l’eau ou le jus de fruits.
         - Ajoutez du miel si vous souhaitez une touche sucrée.

      3. Filtrer et servir :
         - Filtrez si nécessaire pour enlever les morceaux.
         - Servez immédiatement et consommez frais.

      Bienfaits du Jus d'Aloe Vera :
      - **Digestion** : Apaise les troubles digestifs (constipation, ballonnements).
      - **Hydratation** : Très hydratant, idéal pour la peau et les muqueuses.
      - **Immunité** : Renforce le système immunitaire grâce à ses antioxydants.
      - **Détox** : Aide à éliminer les toxines du corps.
      - **Peau et cheveux** : Favorise une peau éclatante et des cheveux en bonne santé.
    `,
  },
  { id: 3, name: 'Recette 3', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs3SUForeDP-HZePDb2559nnfNVzF7EWVRbA&s', category: 'Bien-être', description: 'Description détaillée de la recette 3' },
  { id: 4, name: 'Recette 4', image: 'https://monjardinmamaison.maison-travaux.fr/wp-content/uploads/sites/8/2024/04/cette-plante-facile-a-cultiver-chez-vous-detient-un-pouvoir-medicinale.jpg', 
    category: 'Relaxation', 
    description: `Cette plante est idéale en infusion. Avec elle, fini les maux de dents ! Elle permet d’apaiser les douleurs liées aux maladies buccales. 
    Ses propriétés régénèrent les tissus et réduisent les abcès dentaires. 
    C’est aussi un puissant cicatrisant et antiseptique. 
    Par ailleurs, elle réduit les problèmes gastriques et les douleurs menstruelles.

Ajoutons à cela que la fleur de calendula fait des miracles sous forme de crème et de pommade. 
Utile pour soigner une blessure superficielle, elle soulage aussi les brulures légères. 
Elle apaise les démangeaisons dues aux piqures de moustiques et d’abeilles, tout comme la lavande. 
En outre, en dermatologie, elle est utilisée pour traiter certaines formes d’eczémas. Vous l’avez compris, 
elle est indispensable. À mettre de toute urgence dans vos trousses de secours.`},
];

export default function MedicinalRecipesApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [openPicker, setOpenPicker] = useState(false);
  const [items, setItems] = useState([
    { label: 'Toutes', value: '' },
    { label: 'Maladie', value: 'Maladie' },
    { label: 'Beauté', value: 'Beauté' },
    { label: 'Bien-être', value: 'Bien-être' },
    { label: 'Relaxation', value: 'Relaxation' },
    { label: 'Constipation', value: 'Constipation' },
    { label: 'Pousse cheveux', value: 'Pousse cheveux' },
  ]);

  const navigation = useNavigation();

  const handleRecipePress = (recipe) => {
    navigation.navigate('DetailAdvice', { recipe });
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || recipe.category === selectedCategory)
  );

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleRecipePress(item)}>
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
        <View style={styles.pickerContainer}>
          <DropDownPicker
            open={openPicker}
            value={selectedCategory}
            items={items}
            setOpen={setOpenPicker}
            setValue={setSelectedCategory}
            setItems={setItems}
            placeholder="Catégorie"
            style={styles.picker}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            placeholderStyle={styles.placeholderStyle}
            selectedItemContainerStyle={styles.selectedItemContainerStyle}
            zIndex={3000} // Assurez-vous que le zIndex est élevé
          />
        </View>
      </View>
      <FlatList
        data={filteredRecipes}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
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
  pickerContainer: {
    flex: 1,
    zIndex: 1000, // Assurez-vous que le zIndex est élevé
  },
  picker: {
    backgroundColor: '#e8f5e9',
    borderRadius: 5,
  },
  dropDownContainerStyle: {
    backgroundColor: '#e8f5e9',
    borderRadius: 5,
    zIndex: 2000, // Assurez-vous que le zIndex est élevé
  },
  placeholderStyle: {
    color: '#9EA0A4',
    fontSize: 16,
  },
  selectedItemContainerStyle: {
    backgroundColor: '#e8f5e9',
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
  flatListContent: {
    paddingBottom: 100, // Ajoutez un padding pour éviter le chevauchement
  },
});
  