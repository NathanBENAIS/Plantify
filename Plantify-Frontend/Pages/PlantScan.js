import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const PLANT_ID_API_KEY = 'VgiAr1SSWrdrVorjrmFkuhDpCkAOxTWGHhNDFNVZa6fcMR6mdg';

export default function PlantScan() {
  const [image, setImage] = useState(null);
  const [identificationResult, setIdentificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      setError('Erreur lors de la sélection de l\'image');
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
      setError('Erreur lors de la capture de l\'image');
    }
  };

  const identifyPlant = async (base64Image) => {
    setLoading(true);
    setError(null);

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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Identification de Plantes</Text>
      
      {/* Bouton pour télécharger une image */}
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.uploadButtonText}>Télécharger une image</Text>
      </TouchableOpacity>

      {/* Bouton pour scanner une image via la caméra */}
      <TouchableOpacity style={styles.scanButton} onPress={scanImage}>
        <Text style={styles.uploadButtonText}>Scanner une plante</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.uploadedImage} />}
      
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Identification en cours...</Text>
        </View>
      )}
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      {identificationResult && !loading && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Résultat de l'identification :</Text>
          <Text style={styles.suggestedPlant}>{identificationResult.suggestedPlant}</Text>
          <Text style={styles.probability}>Probabilité : {identificationResult.probability}%</Text>
          <Text style={styles.healthStatus}>{identificationResult.healthStatus} ({identificationResult.healthProbability}%)</Text>
          
          <Text style={styles.sectionTitle}>Classifications principales :</Text>
          {identificationResult.classification.map((classif, index) => (
            <Text key={index} style={styles.listItem}>{classif.name}: {classif.probability}%</Text>
          ))}
          
          <Text style={styles.sectionTitle}>Maladies possibles :</Text>
          {identificationResult.diseases.map((disease, index) => (
            <Text key={index} style={styles.listItem}>{disease.name}: {disease.probability}%</Text>
          ))}
        </View>
      )}
    </ScrollView>
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
  uploadButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  scanButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  uploadButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  uploadedImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 5,
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#7f8c8d',
  },
  errorContainer: {
    backgroundColor: '#ffcccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: '#cc0000',
    fontSize: 16,
    textAlign: 'center',
  },
  resultContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  suggestedPlant: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 5,
  },
  probability: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  healthStatus: {
    fontSize: 18,
    color: '#27ae60',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#2c3e50',
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
    color: '#34495e',
  },
});
