import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DetailProduct({ route, navigation }) {
  const { plant } = route.params;

  const renderCharacteristicsList = (items) => {
    if (!items || items.length === 0) return null;
    return (
      <View style={styles.listContainer}>
        {items.map((item, index) => (
          <Text key={index} style={styles.listItem}>• {item}</Text>
        ))}
      </View>
    );
  };

  const renderTherapeuticUses = () => {
    if (!plant.characteristics?.therapeuticUses) return null;
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Utilisations thérapeutiques</Text>
        {renderCharacteristicsList(plant.characteristics.therapeuticUses)}
      </View>
    );
  };

  const renderTraditionalUses = () => {
    if (!plant.traditionalUses) return null;
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Utilisations traditionnelles</Text>
        {Object.entries(plant.traditionalUses).map(([key, value]) => (
          <View key={key} style={styles.traditionalUseItem}>
            <Text style={styles.traditionalUseTitle}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
            <Text style={styles.traditionalUseText}>{value}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderWellBeing = () => {
    if (!plant.wellBeing) return null;
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bien-être</Text>
        {Object.entries(plant.wellBeing).map(([key, value]) => (
          <View key={key} style={styles.wellBeingItem}>
            <Text style={styles.wellBeingTitle}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
            <Text style={styles.wellBeingText}>{value}</Text>
          </View>
        ))}
      </View>
    );
  };


  const handleGoBack = () => {
    try {
      navigation.goBack();
      // En cas de problème, on peut ajouter une solution de repli
      if (!navigation.canGoBack()) {
        navigation.navigate('Search'); // Remplacez 'Home' par le nom de votre écran principal
      }
    } catch (error) {
      // Pour le débogage
      Alert.alert('Erreur de navigation', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity 
          style={styles.backButton}
          onPress={handleGoBack}
          activeOpacity={0.7} // Ajout d'un feedback visuel
        >
          <Ionicons name="arrow-back" size={24} color="#6E1C40" />
        </TouchableOpacity>
      </View>

      <View style={styles.mainInfo}>
        <Text style={styles.plantName}>{plant.name}</Text>
        <Text style={styles.scientificName}>{plant.scientificName}</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: plant.image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{plant.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Caractéristiques</Text>
        
        <View style={styles.careItem}>
          <Ionicons name="sunny" size={24} color="#6E1C40" />
          <View style={styles.careTextContainer}>
            <Text style={styles.careTitle}>Ensoleillement</Text>
            <Text style={styles.careText}>{plant.sunshine}</Text>
          </View>
        </View>

        <View style={styles.careItem}>
          <Ionicons name="leaf" size={24} color="#6E1C40" />
          <View style={styles.careTextContainer}>
            <Text style={styles.careTitle}>Niveau de difficulté</Text>
            <Text style={styles.careText}>{plant.difficulty}</Text>
          </View>
        </View>

        {plant.characteristics?.fragranceEffect && (
          <View style={styles.careItem}>
            <Ionicons name="flower" size={24} color="#6E1C40" />
            <View style={styles.careTextContainer}>
              <Text style={styles.careTitle}>Effet olfactif</Text>
              <Text style={styles.careText}>{plant.characteristics.fragranceEffect}</Text>
            </View>
          </View>
        )}
      </View>

      {plant.characteristics && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Composition</Text>
          
          {plant.characteristics.minerals && plant.characteristics.minerals.length > 0 && (
            <View style={styles.compositionGroup}>
              <Text style={styles.compositionTitle}>Minéraux</Text>
              {renderCharacteristicsList(plant.characteristics.minerals)}
            </View>
          )}
          
          {plant.characteristics.vitamins && plant.characteristics.vitamins.length > 0 && (
            <View style={styles.compositionGroup}>
              <Text style={styles.compositionTitle}>Vitamines</Text>
              {renderCharacteristicsList(plant.characteristics.vitamins)}
            </View>
          )}
          
          {plant.characteristics.antioxidants && plant.characteristics.antioxidants.length > 0 && (
            <View style={styles.compositionGroup}>
              <Text style={styles.compositionTitle}>Antioxydants</Text>
              {renderCharacteristicsList(plant.characteristics.antioxidants)}
            </View>
          )}
        </View>
      )}

      {renderTherapeuticUses()}
      {renderTraditionalUses()}
      {renderWellBeing()}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Localisation</Text>
        <Text style={styles.locationText}>{plant.location}</Text>
      </View>

      {plant.culturalSignificance && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Signification culturelle</Text>
          <Text style={styles.culturalText}>{plant.culturalSignificance}</Text>
        </View>
      )}

      {plant.funFact && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Le saviez-vous ?</Text>
          <Text style={styles.funFactText}>{plant.funFact}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainInfo: {
    padding: 20,
  },
  plantName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  scientificName: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#7f8c8d',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  section: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
  },
  careItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  careTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  careTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  careText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  listContainer: {
    marginLeft: 10,
  },
  listItem: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 5,
    lineHeight: 20,
  },
  compositionGroup: {
    marginBottom: 15,
  },
  compositionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 5,
  },
  traditionalUseItem: {
    marginBottom: 10,
  },
  traditionalUseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 5,
  },
  traditionalUseText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
  wellBeingItem: {
    marginBottom: 10,
  },
  wellBeingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 5,
  },
  wellBeingText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
  locationText: {
    fontSize: 14,
    color: '#34495e',
  },
  culturalText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
  funFactText: {
    fontSize: 14,
    color: '#34495e',
    fontStyle: 'italic',
    lineHeight: 20,
  }
});