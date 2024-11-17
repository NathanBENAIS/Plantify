import React, { useRef } from 'react';
import { View, Dimensions, StyleSheet, Image, Platform } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window');

const PLANTS_DATA = [
  {
    id: '1',
    title: 'Monstera Deliciosa',
    illustration: 'https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg',
  },
  {
    id: '2',
    title: 'Ficus Lyrata',
    illustration: 'https://images.pexels.com/photos/2425232/pexels-photo-2425232.jpeg',
  },
  {
    id: '3',
    title: 'Snake Plant',
    illustration: 'https://images.pexels.com/photos/2382325/pexels-photo-2382325.jpeg',
  },
  {
    id: '4',
    title: 'Calathea Orbifolia',
    illustration: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
  },
  {
    id: '5',
    title: 'Pothos',
    illustration: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
  },
];

const PlantCarousel = ({ data = PLANTS_DATA }) => {
  const carouselRef = useRef(null);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image 
          source={{ uri: item.illustration }} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={data}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 60}
        layoutCardOffset={9}
        inactiveSlideShift={0}
        useScrollView={true}
        autoplay={true}
        autoplayDelay={1000}
        autoplayInterval={3000}
        loop={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  slide: {
    width: screenWidth - 60,
    height: screenWidth - 120,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: Platform.OS === 'android' ? 5 : 0,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});

export default PlantCarousel;