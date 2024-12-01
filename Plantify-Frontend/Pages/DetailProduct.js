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

  const renderList = (items) => {
    if (!items || items.length === 0) return null;
    return items.map((item, index) => (
      <Text key={index} style={styles.listItem}>• {item}</Text>
    ));
  };

  const handleGoBack = () => {
    try {
      navigation.goBack();
  
      if (!navigation.canGoBack()) {
        navigation.navigate('Search');
      }
    } catch (error) {
      // Pour le débogage
      Alert.alert('Erreur de navigation', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1A3B0A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détails de la plante</Text>
      </View>

      <View style={styles.content}>
        {/* Plant Information */}
        <View style={styles.plantInfo}>
          <Text style={styles.plantName}>{plant.name}</Text>
          <Text style={styles.scientificName}>{plant.scientificName}</Text>
        </View>

        {/* Main Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: plant.image }} 
            style={styles.image} 
            resizeMode="cover" 
          />
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.sectionText}>{plant.description}</Text>
        </View>

        {/* Characteristics Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Caractéristiques</Text>
          
          <View style={styles.characteristicGrid}>
            <View style={styles.characteristicItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="sunny" size={20} color="#1A3B0A" />
              </View>
              <View style={styles.characteristicContent}>
                <Text style={styles.characteristicLabel}>Ensoleillement</Text>
                <Text style={styles.characteristicValue}>{plant.sunshine}</Text>
              </View>
            </View>

            <View style={styles.characteristicItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="leaf" size={20} color="#1A3B0A" />
              </View>
              <View style={styles.characteristicContent}>
                <Text style={styles.characteristicLabel}>Difficulté</Text>
                <Text style={styles.characteristicValue}>{plant.difficulty}</Text>
              </View>
            </View>

            {plant.characteristics?.fragranceEffect && (
              <View style={styles.characteristicItem}>
                <View style={styles.iconContainer}>
                  <Ionicons name="flower" size={20} color="#1A3B0A" />
                </View>
                <View style={styles.characteristicContent}>
                  <Text style={styles.characteristicLabel}>Effet olfactif</Text>
                  <Text style={styles.characteristicValue}>
                    {plant.characteristics.fragranceEffect}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Composition Section */}
        {plant.characteristics && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Composition</Text>
            {plant.characteristics.minerals?.length > 0 && (
              <View style={styles.compositionGroup}>
                <Text style={styles.compositionTitle}>Minéraux</Text>
                {renderList(plant.characteristics.minerals)}
              </View>
            )}
            {plant.characteristics.vitamins?.length > 0 && (
              <View style={styles.compositionGroup}>
                <Text style={styles.compositionTitle}>Vitamines</Text>
                {renderList(plant.characteristics.vitamins)}
              </View>
            )}
            {plant.characteristics.antioxidants?.length > 0 && (
              <View style={styles.compositionGroup}>
                <Text style={styles.compositionTitle}>Antioxydants</Text>
                {renderList(plant.characteristics.antioxidants)}
              </View>
            )}
          </View>
        )}

        {/* Therapeutic Uses */}
        {plant.characteristics?.therapeuticUses && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Utilisations thérapeutiques</Text>
            {renderList(plant.characteristics.therapeuticUses)}
          </View>
        )}

        {/* Traditional Uses */}
        {plant.traditionalUses && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Utilisations traditionnelles</Text>
            {Object.entries(plant.traditionalUses).map(([key, value]) => (
              <View key={key} style={styles.traditionalUseItem}>
                <Text style={styles.traditionalUseTitle}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Text>
                <Text style={styles.sectionText}>{value}</Text>
              </View>
            ))}
          </View>
        )}
 {/* Bien-être - Nouvelle section */}
 {plant.wellBeing && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bien-être</Text>
            {Object.entries(plant.wellBeing).map(([key, value]) => (
              <View key={key} style={styles.wellBeingItem}>
                <Text style={styles.wellBeingTitle}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Text>
                <Text style={styles.useText}>{value}</Text>
              </View>
            ))}
          </View>
        )}
        {/* Location Section */}
        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons name="location" size={20} color="#1A3B0A" />
            <Text style={[styles.sectionTitle, styles.titleWithIcon]}>
              Localisation
            </Text>
          </View>
          <Text style={styles.sectionText}>{plant.location}</Text>
        </View>
     {/* Signification culturelle */}
     {plant.culturalSignificance && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Signification culturelle</Text>
            <Text style={styles.sectionText}>{plant.culturalSignificance}</Text>
          </View>
        )}

        {/* Fun Fact Section */}
        {plant.funFact && (
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Ionicons name="information-circle" size={20} color="#1A3B0A" />
              <Text style={[styles.sectionTitle, styles.titleWithIcon]}>
                Le saviez-vous ?
              </Text>
            </View>
            <Text style={[styles.sectionText, styles.italicText]}>{plant.funFact}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#B4D8B2',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',

  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontFamily: 'Belleza',
    fontSize: 22,
    fontWeight: '700',
    color: '#1A3B0A',
  },
  content: {
    padding: 16,
  },
  plantInfo: {
    marginBottom: 16,
  },
  plantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A3B0A',
    marginBottom: 4,
  },
  scientificName: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#6B7280',
  },
  imageContainer: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
  },
  section: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A3B0A',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  characteristicGrid: {
    gap: 12,
  },
  characteristicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B4D8B2',
    borderRadius: 16,
    marginRight: 12,
  },
  characteristicContent: {
    flex: 1,
  },
  characteristicLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A3B0A',
    marginBottom: 2,
  },
  characteristicValue: {
    fontSize: 14,
    color: '#4B5563',
  },
  compositionGroup: {
    marginBottom: 12,
  },
  compositionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A3B0A',
    marginBottom: 8,
  },
  listItem: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
    paddingLeft: 8,
  },
  traditionalUseItem: {
    marginBottom: 12,
  },
  traditionalUseTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A3B0A',
    marginBottom: 4,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleWithIcon: {
    marginLeft: 8,
    marginBottom: 0,
  },
  italicText: {
    fontStyle: 'italic',
  },

  wellBeingItem: {
    marginBottom: 12,
  },
  wellBeingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A3B0A',
    marginBottom: 4,
  },
});