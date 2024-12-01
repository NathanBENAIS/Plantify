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
  }  
  else {
    const { WebView } = require('react-native-webview');
    const [selectedPlant, setSelectedPlant] = useState(null);
    const webViewRef = useRef(null);

    const handleCardPress = (plant) => {
      setSelectedPlant(plant);
      const script = `
        (function() {
          try {
            if (typeof map !== 'undefined' && map) {
              // Animation de zoom avec flyTo
              map.flyTo([${plant.position[0]}, ${plant.position[1]}], 15, {
                duration: 1.5,
                easeLinearity: 0.25
              });
              
              // Mise à jour des marqueurs
              if (markers && markers.length) {
                markers.forEach(marker => {
                  if (marker && marker.setStyle) {
                    const isSelected = marker.plantId === '${plant.id}';
                    marker.setStyle({
                      fillColor: isSelected ? '#ff4757' : '#3388ff',
                      radius: isSelected ? 30 : 20,
                      fillOpacity: isSelected ? 0.8 : 0.7
                    });
                    
                    if (isSelected) {
                      setTimeout(() => marker.openPopup(), 1500); // Ouvre le popup après l'animation
                    } else {
                      marker.closePopup();
                    }
                  }
                });
              }
            }
          } catch (error) {
            console.error('Error in handleCardPress:', error);
          }
          true;
        })();
      `;
      webViewRef.current?.injectJavaScript(script);
    };
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
          <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
          <style>
            html, body { 
              margin: 0; 
              padding: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
              position: fixed;
            }
            #map { 
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: #f8f9fa;
            }
            .leaflet-control-attribution { 
              display: none !important; 
            }
            /* Animation des marqueurs */
            .leaflet-marker-icon,
            .leaflet-marker-shadow {
              transition: transform 0.3s ease-out;
            }
          </style>
        </head>
        <body>
          <div id="map"></div>
          <script>
            var map;
            var markers = [];
            
            document.addEventListener('DOMContentLoaded', function() {
              try {
                // Initialisation de la carte avec des options améliorées
                map = L.map('map', {
                  attributionControl: false,
                  zoomControl: true,
                  dragging: true,
                  tap: false,
                  bounceAtZoomLimits: false,
                  touchZoom: 'center',
                  zoomAnimation: true
                }).setView([48.8566, 2.3522], 13);
                
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  maxZoom: 19,
                  minZoom: 4
                }).addTo(map);

                const plants = ${JSON.stringify(plants)};
                
                plants.forEach(function(plant) {
                  const marker = L.circleMarker(plant.position, {
                    radius: 20,
                    fillColor: "#3388ff",
                    fillOpacity: 0.7,
                    color: "#ffffff",
                    weight: 2,
                    className: 'animated-marker'
                  });
                  
                  marker.plantId = plant.id;
                  
                  // Popup avec style amélioré
                  marker.bindPopup(
                    '<div style="text-align: center;">' +
                    '<b style="font-size: 14px;">' + plant.name + '</b><br>' +
                    '<span style="font-size: 12px;">' + plant.location + '</span>' +
                    '</div>', 
                    { 
                      closeButton: false,
                      className: 'custom-popup'
                    }
                  );
                  
                  marker.addTo(map);
                  markers.push(marker);
                });

                // Fix pour le rendu initial
                setTimeout(function() {
                  map.invalidateSize();
                }, 250);

              } catch (e) {
                console.error('Map initialization error:', e);
              }
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
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn('WebView error: ', nativeEvent);
            }}
            scrollEnabled={false}
            bounces={false}
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