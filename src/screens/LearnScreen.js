import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { airports, searchAirports } from '../data/airportController';

const LearnScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAirports, setFilteredAirports] = useState(airports);
  const [selectedRegion, setSelectedRegion] = useState('All');

  const regions = ['All', 'North America', 'Europe', 'Asia', 'Middle East', 'South America', 'Oceania'];

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      filterByRegion(selectedRegion);
    } else {
      const results = searchAirports(query);
      if (selectedRegion !== 'All') {
        setFilteredAirports(results.filter(a => a.region === selectedRegion));
      } else {
        setFilteredAirports(results);
      }
    }
  };

  const filterByRegion = (region) => {
    setSelectedRegion(region);
    if (region === 'All') {
      setFilteredAirports(searchQuery ? searchAirports(searchQuery) : airports);
    } else {
      const filtered = airports.filter(a => a.region === region);
      setFilteredAirports(searchQuery ? filtered.filter(a => 
        searchAirports(searchQuery).includes(a)
      ) : filtered);
    }
  };

  const renderAirportItem = ({ item }) => (
    <View style={styles.airportCard}>
      <View style={styles.iataContainer}>
        <Text style={styles.iataCode}>{item.iata}</Text>
      </View>
      <View style={styles.airportInfo}>
        <Text style={styles.airportName}>{item.name}</Text>
        <Text style={styles.cityText}>{item.city}, {item.country}</Text>
        <Text style={styles.regionText}>{item.region}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search airports, cities, or codes..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={regions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedRegion === item && styles.filterButtonActive
              ]}
              onPress={() => filterByRegion(item)}
            >
              <Text style={[
                styles.filterText,
                selectedRegion === item && styles.filterTextActive
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={filteredAirports}
        keyExtractor={(item) => item.iata}
        renderItem={renderAirportItem}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    backgroundColor: 'white',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterContainer: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  filterTextActive: {
    color: 'white',
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  airportCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iataContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iataCode: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  airportInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  airportName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cityText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  regionText: {
    fontSize: 12,
    color: '#999',
  },
  separator: {
    height: 10,
  },
});

export default LearnScreen;