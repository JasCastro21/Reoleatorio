import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  const uniforCoordinates = {
    latitude: -3.7691,
    longitude: -38.4764,
  };

  const [randomCoordinates, setRandomCoordinates] = useState(null);

  const generateRandomCoordinates = () => {
    
    const latitude = uniforCoordinates.latitude + (Math.random() - 0.5) * 0.01;
    const longitude = uniforCoordinates.longitude + (Math.random() - 0.5) * 0.01;
    setRandomCoordinates({ latitude, longitude });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá Jasmine!</Text>
        <Text style={styles.question}>Qual Será Seu Próximo Rolê?</Text>
      </View>

      
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            ...uniforCoordinates,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
         
          <Marker
            coordinate={uniforCoordinates}
            title="UNIFOR"
            description="Universidade de Fortaleza"
          />

     
          {randomCoordinates && (
            <Marker
              coordinate={randomCoordinates}
              title="Local Aleatório"
              description="Este é um local aleatório próximo à UNIFOR"
            />
          )}
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
    backgroundColor: '#444',
    borderRadius: 20,
    padding: 10,
  },
  preferenceButtonText: {
    color: '#FFF',
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
