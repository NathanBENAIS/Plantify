// components/PlantScanButtons.js
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator, Image, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { PLANTS_DATA } from '../data/PlantsData';

const PLANT_ID_API_KEY = 'VgiAr1SSWrdrVorjrmFkuhDpCkAOxTWGHhNDFNVZa6fcMR6mdg';

const normalizePlantName = (name) => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
};

const findMatchingPlant = (apiPlantName, plantsData) => {
  const normalizedApiName = normalizePlantName(apiPlantName);
  
  let match = plantsData.find(
    plant => 
      normalizePlantName(plant.name) === normalizedApiName ||
      normalizePlantName(plant.scientificName) === normalizedApiName
  );

  if (!match) {
    match = plantsData.find(
      plant => 
        normalizePlantName(plant.name).includes(normalizedApiName) ||
        normalizedApiName.includes(normalizePlantName(plant.name)) ||
        normalizePlantName(plant.scientificName).includes(normalizedApiName) ||
        normalizedApiName.includes(normalizePlantName(plant.scientificName))
    );
  }

  return match;
};

export default function PlantScanButtons() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [identificationResult, setIdentificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [matchingPlantData, setMatchingPlantData] = useState(null);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        await identifyPlant(result.assets[0].base64);
      }
    } catch (err) {
      setError("Erreur lors de la sélection de l'image");
    }
  };

  const scanImage = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        await identifyPlant(result.assets[0].base64);
      }
    } catch (err) {
      setError("Erreur lors de la capture de l'image");
    }
  };

  const identifyPlant = async (base64Image) => {
    setLoading(true);
    setError(null);
    setMatchingPlantData(null);

    const requestData = JSON.stringify({
      images: [base64Image],
      latitude: 48.858844,
      longitude: 2.294351,
      health: "all",
    });

    try {
      const response = await fetch('https://api.plant.id/v3/identification', {
        method: 'POST',
        headers: {
          'Api-Key': PLANT_ID_API_KEY,
          'Content-Type': 'application/json',
        },
        body: requestData,
      });

      const result = await response.json();

      if (response.ok && result.result) {
        const suggestions = result.result.classification.suggestions;
        const diseases = result.result.disease.suggestions;
        
        // Chercher une correspondance dans PLANTS_DATA
        const matchingPlant = findMatchingPlant(suggestions[0].name, PLANTS_DATA);
        setMatchingPlantData(matchingPlant);

        setIdentificationResult({
          suggestedPlant: suggestions[0].name,
          probability: (suggestions[0].probability * 100).toFixed(2),
          healthStatus: result.result.is_healthy.binary ? 'Plante saine' : 'Plante malade',
          healthProbability: (result.result.is_healthy.probability * 100).toFixed(2),
          diseases: diseases.slice(0, 3).map(disease => ({
            name: disease.name,
            probability: (disease.probability * 100).toFixed(2)
          })),
          classification: suggestions.slice(0, 3).map(suggestion => ({
            name: suggestion.name,
            probability: (suggestion.probability * 100).toFixed(2)
          }))
        });
      } else {
        setError("Erreur lors de l'identification de la plante");
      }
    } catch (error) {
      console.error("Erreur lors de l'identification : ", error);
      setError("Erreur lors de l'identification");
    } finally {
      setLoading(false);
    }
  };

  const handlePlantPress = () => {
    if (matchingPlantData) {
      navigation.navigate('DetailProduct', { plant: matchingPlantData });
    } else {
      Alert.alert(
        "Information",
        "Cette plante n'est pas encore dans notre base de données. Nous travaillons à enrichir notre catalogue.",
        [{ text: "OK", style: "default" }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.scanContainer}>
        <Text style={styles.title}>Identifier une plante</Text>
        <Text style={styles.subtitle}>Prenez en photo ou sélectionnez une image de la plante que vous souhaitez identifier</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <View style={styles.buttonContent}>
              <Ionicons name="images" size={24} color="#FFF" />
              <Text style={styles.buttonText}>Galerie</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={scanImage}>
            <View style={styles.buttonContent}>
              <Ionicons name="camera" size={24} color="#FFF" />
              <Text style={styles.buttonText}>Appareil photo</Text>
            </View>
          </TouchableOpacity>
        </View>

        {image && (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: image }} style={styles.previewImage} />
          </View>
        )}
        
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#b4d8b2" />
            <Text style={styles.loadingText}>Identification en cours...</Text>
          </View>
        )}
        
        {error && (
          <View style={styles.errorContainer}>
            <Ionicons name="warning" size={24} color="#cc0000" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        
        {identificationResult && !loading && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Résultat de l'identification</Text>
            
            <View style={[
              styles.plantResultCard,
              matchingPlantData && styles.plantResultCardClickable
            ]}>
              <TouchableOpacity 
                style={styles.clickableArea}
                onPress={handlePlantPress}
              >
                <View style={styles.plantInfoHeader}>
                  <Text style={styles.suggestedPlant}>{identificationResult.suggestedPlant}</Text>
                  <Text style={styles.probability}>{identificationResult.probability}% de correspondance</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.healthStatus}>
                <Ionicons 
                  name={identificationResult.healthStatus === 'Plante saine' ? 'checkmark-circle' : 'warning'} 
                  size={20} 
                  color={identificationResult.healthStatus === 'Plante saine' ? '#27ae60' : '#e74c3c'} 
                />
                <Text style={[
                  styles.healthStatusText,
                  { color: identificationResult.healthStatus === 'Plante saine' ? '#27ae60' : '#e74c3c' }
                ]}>
                  {identificationResult.healthStatus} ({identificationResult.healthProbability}%)
                </Text>
              </View>

              {identificationResult.diseases.length > 0 && (
                <View style={styles.diseasesContainer}>
                  <Text style={styles.diseasesTitle}>Problèmes potentiels :</Text>
                  {identificationResult.diseases.map((disease, index) => (
                    <Text key={index} style={styles.diseaseItem}>
                      • {disease.name} ({disease.probability}%)
                    </Text>
                  ))}
                </View>
              )}

              {matchingPlantData && (
                <TouchableOpacity onPress={handlePlantPress}>
                  <Text style={styles.tapForMore}>Appuyez pour voir les détails complets</Text>
                </TouchableOpacity>
              )}
              
              {!matchingPlantData && (
                <Text style={styles.notInDatabase}>Cette plante n'est pas encore dans notre base de données</Text>
              )}
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  scanContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#b4d8b2',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    elevation: 2,
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  imagePreviewContainer: {
    marginVertical: 20,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#b4d8b2',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffeeee',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  errorText: {
    color: '#cc0000',
    marginLeft: 10,
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  clickableArea: {
    // Cette zone ne sera cliquable que sur le nom de la plante et le pourcentage
    padding: 5,
  },
  
  plantResultCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  
  plantResultCardClickable: {
    borderColor: '#b4d8b2',
    borderWidth: 2,
  },
  
  plantInfoHeader: {
    marginBottom: 10,
  },
  
  suggestedPlant: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
    textDecorationLine: 'underline', // Ajoute un soulignement pour indiquer que c'est cliquable
  },
  
  tapForMore: {
    textAlign: 'center',
    color: '#b4d8b2',
    fontSize: 14,
    marginTop: 10,
    fontStyle: 'italic',
    textDecorationLine: 'underline', // Ajoute un soulignement pour indiquer que c'est cliquable
    padding: 5, // Ajoute un padding pour augmenter la zone cliquable
  },
  probability: {
    fontSize: 16,
    color: '#b4d8b2',
    fontWeight: '500',
  },
  healthStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  healthStatusText: {
    marginLeft: 8,
    fontSize: 16,
  },
  diseasesContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  diseasesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 5,
  },
  diseaseItem: {
    fontSize: 14,
    color: '#34495e',
    marginVertical: 2,
  },
  tapForMore: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: 14,
    marginTop: 10,
    fontStyle: 'italic',
  },
  notInDatabase: {
    textAlign: 'center',
    color: '#e74c3c',
    fontSize: 14,
    marginTop: 10,
    fontStyle: 'italic',
  }
});