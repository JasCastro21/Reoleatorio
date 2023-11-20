import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import mockPlaces from './MockPlace'; 
import { useNavigation } from '@react-navigation/native';

const MapScreen = () => {
  const [currentPlaceIndex, setCurrentPlaceIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]); 
  const mapRef = useRef(null);
  const navigation = useNavigation();

  // Função modificada para sortear com base nas preferências
  const generateRandomCoordinates = () => {
    let nextPlace;

    if (selectedOptions.length > 0) {
      // Seleciona um tipo aleatório das preferências
      const randomType = selectedOptions[Math.floor(Math.random() * selectedOptions.length)];
      nextPlace = getRandomPlaceByType(randomType);
    } else {
      // Seleciona qualquer localidade se não houver preferências
      const nextIndex = (currentPlaceIndex + 1) % mockPlaces.length;
      setCurrentPlaceIndex(nextIndex);
      nextPlace = mockPlaces[nextIndex];
    }

    if (mapRef.current && nextPlace) {
      mapRef.current.animateToRegion({
        latitude: nextPlace.latitude,
        longitude: nextPlace.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  };

  const getRandomPlaceByType = (type) => {
    const filteredPlaces = mockPlaces.filter(place => place.type === type);
    if (filteredPlaces.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * filteredPlaces.length);
    const nextPlace = filteredPlaces[randomIndex];
  
    // Encontrar o índice correspondente em mockPlaces
    const newPlaceIndex = mockPlaces.findIndex(place => place.name === nextPlace.name);
    setCurrentPlaceIndex(newPlaceIndex);
  
    return nextPlace;
  };
  

  const goToPreferences = () => {
    navigation.navigate('Pref', {
      selectedOptions, 
      updateSelectedOptions: (newOptions) => setSelectedOptions(newOptions), 
    });
  };

  const currentPlace = mockPlaces[currentPlaceIndex];


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá Jasmine!</Text>
        <Text style={styles.question}>Qual será seu próximo rolê?</Text>
      </View>

      <View style={styles.preferencesContainer}>
        <Text style={styles.preferencesLabel}>Preferências:</Text>
        <TouchableOpacity style={styles.preferenceButton} onPress={goToPreferences}>
          <Text style={styles.preferenceButtonText}>+</Text>
        </TouchableOpacity>
        <View style={styles.selectedOptionsContainer}>
          {selectedOptions.map((option, index) => (
            <View key={index} style={styles.selectedOption}>
              <Text style={styles.selectedOptionText}>{option}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: mockPlaces[0].latitude,
            longitude: mockPlaces[0].longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {mockPlaces.map((place, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: place.latitude, longitude: place.longitude }}
              title={place.name}
              description={place.type}
              opacity={index === currentPlaceIndex ? 1 : 0}
            />
          ))}
        </MapView>
      </View>

      <TouchableOpacity style={styles.button} onPress={generateRandomCoordinates}>
        <Text style={styles.buttonText}>Gerar Rolê</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#040F13',
  },
  header: {
    marginTop: 100,
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  question: {
    fontSize: 18,
    color: '#FFF',
    marginTop: 10,
    marginBottom: 20,
  },
  preferencesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  preferencesLabel: {
    fontSize: 16,
    color: '#FFF',
    marginRight: 10,
  },
  preferenceButton: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 2, 
    borderColor: '#FF7B01', 
    width: 50,
    height: 50,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  preferenceButtonText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 28, 
  },
  selectedOptionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  selectedOption: {
    backgroundColor: '#FF7B01',
    borderRadius: 20,
    padding: 5,
    marginRight: 5,
    marginTop: 5,
  },
  selectedOptionText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mapContainer: {
    width: Dimensions.get('window').width * 0.9,
    height: 400,
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 30,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    backgroundColor: '#FF7B01',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default MapScreen;
