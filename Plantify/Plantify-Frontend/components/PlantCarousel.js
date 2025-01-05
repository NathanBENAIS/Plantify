import React, { useRef, useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  Platform,
  Modal,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { PLANTS_DATA } from "../data/PlantsData";

const { width: screenWidth } = Dimensions.get("window");
import { PLANT_CAROUSEL_DATA } from "../data/PlantCarouselData";

const normalizePlantName = (name) => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
};

const findMatchingPlant = (plantName) => {
  const normalizedName = normalizePlantName(plantName);
  
  return PLANTS_DATA.find(
    plant => 
      normalizePlantName(plant.name) === normalizedName ||
      normalizePlantName(plant.scientificName) === normalizedName
  );
};

const PlantCarousel = () => {
  const navigation = useNavigation();
  const carouselRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);

  const handlePlantNamePress = (plantName) => {
    const matchingPlant = findMatchingPlant(plantName);
    if (matchingPlant) {
      setModalVisible(false);
      navigation.navigate('DetailProduct', { plant: matchingPlant });
    }
  };

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.slide}
        onPress={() => {
          setSelectedPlant(item);
          setModalVisible(true);
        }}
      >
        <Image
          source={{ uri: item.illustration }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.titleContainer}>
          <View style={styles.titleContent}>
            <Text style={styles.slideTitle}>{item.title}</Text>
            <Text style={styles.plantName}>{item.plantName}</Text>
          </View>
          <View style={styles.seasonBadge}>
            <Text style={styles.seasonText}>{item.season}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={PLANT_CAROUSEL_DATA}
        renderItem={_renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 60}
        hasParallaxImages={false}
        inactiveSlideScale={0.95}
        inactiveSlideOpacity={0.7}
        activeSlideAlignment="center"
        autoplayInterval={5000}
        autoplayDelay={1500}
        enableMomentum={false}
        lockScrollWhileSnapping={true}
        loop={true}
        autoplay={true}
      />

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

            {selectedPlant && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                  source={{ uri: selectedPlant.illustration }}
                  style={styles.modalImage}
                />
                <View style={styles.modalBody}>
                  <Text style={styles.modalTitle}>{selectedPlant.title}</Text>
                  <TouchableOpacity 
                    onPress={() => handlePlantNamePress(selectedPlant.plantName)}
                  >
                    <Text style={[styles.modalPlantName, styles.clickableName]}>
                      {selectedPlant.plantName}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.seasonBadge}>
                    <Text style={styles.seasonText}>
                      {selectedPlant.season}
                    </Text>
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>
                      {selectedPlant.description}
                    </Text>
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                      Période de plantation
                    </Text>
                    <Text style={styles.periodText}>
                      {selectedPlant.plantingPeriod}
                    </Text>
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                      Conseils d'entretien
                    </Text>
                    {selectedPlant.careTips.map((tip, index) => (
                      <View key={index} style={styles.tipItem}>
                        <Ionicons name="leaf" size={16} color="#539211" />
                        <Text style={styles.tipText}>{tip}</Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Prochain atelier</Text>
                    <View style={styles.eventContainer}>
                      <Text style={styles.eventTitle}>
                        {selectedPlant.eventDetails.title}
                      </Text>
                      <Text style={styles.eventDate}>
                        {selectedPlant.eventDetails.workshopDate}
                      </Text>
                      <Text style={styles.eventLocation}>
                        {selectedPlant.eventDetails.location}
                      </Text>
                      {selectedPlant.eventDetails.activities.map(
                        (activity, index) => (
                          <View key={index} style={styles.activityItem}>
                            <Ionicons
                              name="checkmark-circle"
                              size={16}
                              color="#539211"
                            />
                            <Text style={styles.activityText}>{activity}</Text>
                          </View>
                        )
                      )}
                    </View>
                  </View>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: screenWidth - 60,
    paddingTop: 20,
    marginBottom: 15,
  },
  slide: {
    width: screenWidth - 60,
    height: screenWidth - 120,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: Platform.OS === "android" ? 5 : 0,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 12,
    left: 15,
    right: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#539211',
  },
  titleContent: {
    flex: 1,
    paddingRight: 40,
  },
  slideTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A3B0A',
    marginBottom: 4,
  },
  plantName: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  seasonBadge: {
    position: 'absolute',
    top: -30,
    right: 10,
    backgroundColor: '#539211',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  seasonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 60,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalCloseButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
    backgroundColor: "#FFFFFF",
    padding: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  modalImage: {
    width: "100%",
    height: 250,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalBody: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A3B0A",
    marginBottom: 12,
  },
  modalPlantName: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 12,
  },
  clickableName: {
    textDecorationLine: 'underline',
    color: '#539211',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A3B0A",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#4B5563",
    lineHeight: 24,
    marginBottom: 16,
  },
  periodText: {
    fontSize: 16,
    color: "#539211",
    fontWeight: "500",
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  tipText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#4B5563",
  },
  eventContainer: {
    backgroundColor: "#F3F4F6",
    padding: 15,
    borderRadius: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A3B0A",
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A3B0A",
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  activityText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#4B5563",
  }
});

export default PlantCarousel;