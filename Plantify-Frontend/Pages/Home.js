import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import PlantScanButtons from '../components/PlantScanButtons';
import PlantCarousel from '../components/PlantCarousel';

export default function Home({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PlantCarousel />
      <PlantScanButtons />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
