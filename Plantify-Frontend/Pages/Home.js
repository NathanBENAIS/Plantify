import React from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import PlantScanButtons from "../components/PlantScanButtons";
import PlantCarousel from "../components/PlantCarousel";

export default function Home({ navigation }) {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="leaf" size={40} color="#b4d8b2" />
          <Text style={styles.brandName}>Plantify</Text>
        </View>
        <Text style={styles.tagline}>Explorez le monde des plantes</Text>
      </View>

      <View style={styles.carouselContainer}>
        <PlantCarousel />
      </View>

      <View style={styles.scanContainer}>
        <PlantScanButtons />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  brandName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#b4d8b2',
    marginLeft: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  carouselContainer: {
    width: '100%',
  },
  scanContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
});