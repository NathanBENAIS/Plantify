
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


// Liste simulée de plantes avec images
// const SIMULATED_PLANTS = [
//   { 
//     id: '1', 
//     name: 'Rose',
//     scientificName: 'Rosa',
//     description: 'La rose est une fleur élégante et parfumée, symbole de l\'amour et de la passion. Ses pétales délicats et son parfum envoûtant en font l\'une des fleurs les plus appréciées au monde.',
//     care: 'Arrosage modéré, plein soleil, sol bien drainé',
//     watering: 'Deux fois par semaine',
//     sunshine: 'Plein soleil',
//     difficulty: 'Modérée',
//     image: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg'
//   },
//   {
//     id: '2',
//     name: 'Tournesol',
//     scientificName: 'Helianthus annuus',
//     description: 'Le tournesol est une plante majestueuse qui suit le soleil tout au long de la journée. Ses grands pétales jaunes et son centre foncé en font une plante très décorative.',
//     care: 'Arrosage régulier, plein soleil, sol riche',
//     watering: 'Trois fois par semaine',
//     sunshine: 'Plein soleil',
//     difficulty: 'Facile',
//     image: 'https://images.pexels.com/photos/46216/sunflower-flowers-bright-yellow-46216.jpeg'
//   },
//   {
//     id: '3',
//     name: 'Lavande',
//     scientificName: 'Lavandula',
//     description: 'La lavande est connue pour son parfum apaisant et ses propriétés médicinales. Ses fleurs violettes attirent les papillons et les abeilles.',
//     care: 'Peu d\'arrosage, plein soleil, sol calcaire',
//     watering: 'Une fois par semaine',
//     sunshine: 'Plein soleil',
//     difficulty: 'Facile',
//     image: 'https://images.pexels.com/photos/4017633/pexels-photo-4017633.jpeg'
//   },
//   {
//     id: '4',
//     name: 'Orchidée',
//     scientificName: 'Orchidaceae',
//     description: 'L\'orchidée est une plante exotique aux fleurs spectaculaires. Elle symbolise la beauté, le luxe et le raffinement.',
//     care: 'Arrosage modéré, lumière indirecte, humidité',
//     watering: 'Une fois par semaine',
//     sunshine: 'Lumière indirecte',
//     difficulty: 'Avancée',
//     image: 'https://images.pexels.com/photos/1171386/pexels-photo-1171386.jpeg'
//   },
//   {
//     id: '5',
//     name: 'Cactus',
//     scientificName: 'Cactaceae',
//     description: 'Le cactus est une plante succulente adaptée aux environnements arides. Il stocke l\'eau dans ses tissus pour survivre aux périodes de sécheresse.',
//     care: 'Peu d\'arrosage, plein soleil, sol drainant',
//     watering: 'Une fois par mois',
//     sunshine: 'Plein soleil',
//     difficulty: 'Facile',
//     image: 'https://images.pexels.com/photos/1903965/pexels-photo-1903965.jpeg'
//   },
//   {
//     id: '6',
//     name: 'Fougère',
//     scientificName: 'Polypodiopsida',
//     description: 'La fougère est une plante d\'ombre qui apporte une touche de verdure luxuriante. Ses frondes délicates créent une ambiance tropicale.',
//     care: 'Arrosage régulier, ombre, humidité',
//     watering: 'Deux fois par semaine',
//     sunshine: 'Ombre ou lumière indirecte',
//     difficulty: 'Modérée',
//     image: 'https://images.pexels.com/photos/1964869/pexels-photo-1964869.jpeg'
//   },
//   {
//     id: '7',
//     name: 'Aloe Vera',
//     scientificName: 'Aloe barbadensis miller',
//     description: 'L\'Aloe Vera est connue pour ses propriétés médicinales. Ses feuilles contiennent un gel utilisé en cosmétique et en médecine naturelle.',
//     care: 'Peu d\'arrosage, lumière indirecte',
//     watering: 'Une fois par semaine',
//     sunshine: 'Lumière indirecte',
//     difficulty: 'Facile',
//     image: 'https://images.pexels.com/photos/4207908/pexels-photo-4207908.jpeg'
//   },
//   {
//     id: '8',
//     name: 'Bambou',
//     scientificName: 'Bambusoideae',
//     description: 'Le bambou est une plante élégante à croissance rapide. Il peut créer des haies naturelles et apporter une touche zen à votre jardin.',
//     care: 'Arrosage régulier, mi-ombre',
//     watering: 'Trois fois par semaine',
//     sunshine: 'Mi-ombre',
//     difficulty: 'Modérée',
//     image: 'https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg'
//   },
//   {
//     id: '9',
//     name: 'Tulipe',
//     scientificName: 'Tulipa',
//     description: 'La tulipe est une fleur printanière aux couleurs vives. Elle symbolise le renouveau et la perfection.',
//     care: 'Arrosage modéré, plein soleil',
//     watering: 'Deux fois par semaine',
//     sunshine: 'Plein soleil',
//     difficulty: 'Modérée',
//     image: 'https://images.pexels.com/photos/68178/tulips-flowers-garden-colorful-68178.jpeg'
//   },
//   {
//     id: '10',
//     name: 'Lys',
//     scientificName: 'Lilium',
//     description: 'Le lys est une fleur majestueuse au parfum envoûtant. Ses grandes fleurs élégantes en font une plante très décorative.',
//     care: 'Arrosage régulier, mi-ombre',
//     watering: 'Deux fois par semaine',
//     sunshine: 'Mi-ombre',
//     difficulty: 'Modérée',
//     image: 'https://images.pexels.com/photos/615350/lily-flower-plant-garden-615350.jpeg'
//   },
// ];

export default function ProductList({ plants }) {
  const navigation = useNavigation();

  const handlePlantPress = (plant) => {
    navigation.navigate('DetailProduct', { plant });
  };

  const renderPlantItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.plantItem}
      onPress={() => handlePlantPress(item)}
    >
      <View style={styles.plantContent}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.plantImage}
        />
        <View style={styles.plantInfo}>
          <Text style={styles.plantName}>{item.name}</Text>
          <Text style={styles.scientificName}>{item.scientificName}</Text>
          <View style={styles.difficultyContainer}>
            <Ionicons name="leaf" size={16} color="#6E1C40" />
            <Text style={styles.difficultyText}>{item.difficulty}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={plants}
        renderItem={renderPlantItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="leaf-outline" size={50} color="#ccc" />
            <Text style={styles.emptyText}>Aucune plante trouvée</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 10,
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
  listContainer: {
    paddingHorizontal: 15,
  },
  plantItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
  },
  plantContent: {
    flexDirection: 'row',
    padding: 15,
  },
  plantImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  plantInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  plantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scientificName: {
    fontSize: 14,
    color: '#777',
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  difficultyText: {
    fontSize: 14,
    marginLeft: 5,
    color: '#6E1C40',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#ccc',
    marginTop: 10,
  },
});
