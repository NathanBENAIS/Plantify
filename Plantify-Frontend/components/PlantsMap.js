import React, { useRef, useState } from 'react';
import { StyleSheet, View, Platform, ScrollView, Text, Image, TouchableOpacity } from 'react-native';

const PlantCard = ({ plant, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={onPress}
    >
      <Image
        source={{ uri: plant.image }}
        style={styles.cardImage}
      />
      <Text style={styles.cardTitle}>{plant.name}</Text>
    </TouchableOpacity>
  );
};

const PlantsMap = ({ plants }) => {
  if (Platform.OS === 'web') {
    const { MapContainer, TileLayer, CircleMarker, Popup, useMap } = require('react-leaflet');
    require('leaflet/dist/leaflet.css');

    // Ajout du style pour cacher l'attribution
    React.useEffect(() => {
      const style = document.createElement('style');
      style.textContent = `
        .leaflet-control-attribution {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
      return () => document.head.removeChild(style);
    }, []);

    const MapController = ({ selectedPlant }) => {
      const map = useMap();
      
      React.useEffect(() => {
        if (selectedPlant) {
          map.flyTo(selectedPlant.position, map.getZoom(), {
            duration: 1.5
          });
        }
      }, [selectedPlant]);
    
      return null;
    };

    const [selectedPlant, setSelectedPlant] = useState(null);

    const handleCardPress = (plant) => {
      setSelectedPlant(plant);
    };

    return (
      <View style={styles.mainContainer}>
        <View style={styles.mapContainer}>
          <MapContainer 
            center={[48.8566, 2.3522]} 
            zoom={13} 
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
            attributionControl={false}
          >
            <MapController selectedPlant={selectedPlant} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution=""
            />
            {plants.map((plant, idx) => (
              <CircleMarker 
                key={idx} 
                center={plant.position}
                radius={20}
                pathOptions={{
                  fillColor: selectedPlant?.id === plant.id ? "#ff4757" : "#3388ff",
                  fillOpacity: 0.7,
                  color: "#ffffff",
                  weight: 2
                }}
              >
                <Popup>
                  <b>{plant.name}</b><br/>
                  {plant.location}
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </View>
        <View style={styles.cardsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {plants.map((plant) => (
              <PlantCard 
                key={plant.id} 
                plant={plant} 
                onPress={() => handleCardPress(plant)}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  } else {
    const { WebView } = require('react-native-webview');
    const [selectedPlant, setSelectedPlant] = useState(null);
    const webViewRef = useRef(null);

    const handleCardPress = (plant) => {
      setSelectedPlant(plant);
      const script = `
        const currentZoom = map.getZoom();
        map.flyTo([${plant.position[0]}, ${plant.position[1]}], currentZoom, {
          duration: 1.5
        });
        markers.forEach(marker => {
          marker.setStyle({
            fillColor: marker.plantId === '${plant.id}' ? '#ff4757' : '#3388ff'
          });
        });
      `;
      webViewRef.current.injectJavaScript(script);
    };
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
          <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
          <style>
            body { margin: 0; padding: 0; }
            #map { height: 100%; width: 100%; }
            .leaflet-control-attribution { display: none !important; }
          </style>
        </head>
        <body>
          <div id="map"></div>
          <script>
            var map = L.map('map', {
              attributionControl: false
            }).setView([48.8566, 2.3522], 13);
            
            var markers = [];
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19
            }).addTo(map);

            const plants = ${JSON.stringify(plants)};
            
            plants.forEach(function(plant) {
              const marker = L.circleMarker(plant.position, {
                radius: 40,
                fillColor: "#3388ff",
                fillOpacity: 0.7,
                color: "#ffffff",
                weight: 4
              })
                .bindPopup('<b>' + plant.name + '</b><br>' + plant.location)
                .addTo(map);
              
              marker.plantId = plant.id;
              markers.push(marker);
            });
          </script>
        </body>
      </html>
    `;

    return (
      <View style={styles.mainContainer}>
        <View style={styles.mapContainer}>
          <WebView
            ref={webViewRef}
            style={styles.map}
            source={{ html: htmlContent }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        </View>
        <View style={styles.cardsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {plants.map((plant) => (
              <PlantCard 
                key={plant.id} 
                plant={plant}
                onPress={() => handleCardPress(plant)}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  cardsContainer: {
    height: 180,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  card: {
    width: 140,
    height: 160,
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    padding: 8,
    textAlign: 'center',
    color: '#2c3e50',
  },
});

export default PlantsMap;