import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import mockPlaces from './MockPlace';

const PreferencesScreen = ({ navigation, route }) => {
  const { selectedOptions, updateSelectedOptions } = route.params;
  const uniqueTypes = Array.from(new Set(mockPlaces.map(place => place.type)));
  const [selectedTypes, setSelectedTypes] = useState(selectedOptions);

  const toggleType = (type) => {
    setSelectedTypes((prevSelectedTypes) =>
      prevSelectedTypes.includes(type)
        ? prevSelectedTypes.filter((t) => t !== type)
        : [...prevSelectedTypes, type]
    );
  };

  const applyFilters = () => {
    updateSelectedOptions(selectedTypes);
    navigation.goBack();
  };

  const isSelected = (type) => selectedTypes.includes(type);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {uniqueTypes.map((type, index) => (
          <TouchableOpacity
            key={index}
            style={styles.typeButton}
            onPress={() => toggleType(type)}
          >
            <View
              style={[
                styles.typeSquare,
                isSelected(type) ? styles.typeSquareSelected : {},
              ]}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  isSelected(type) ? styles.typeButtonTextSelected : {},
                ]}
              >
                +
              </Text>
            </View>
            <Text style={styles.typeLabel}>{type}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
        <Text style={styles.applyButtonText}>Aplicar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040F13',
    paddingTop: 50,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  typeSquare: {
    width: 40,
    height: 40,
    borderRadius: 10, 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    borderWidth: 2,
    borderColor: '#FF7B01',
    backgroundColor: 'transparent',
  },
  typeSquareSelected: {
    backgroundColor: '#FF7B01',
  },
  typeButtonText: {
    color: '#FF7B01',
    fontSize: 24,
    fontWeight: 'bold',
  },
  typeButtonTextSelected: {
    color: '#FFF',
  },
  typeLabel: {
    fontSize: 18,
    color: '#FFF',
  },
  applyButton: {
    backgroundColor: '#FF7B01',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  applyButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PreferencesScreen;
