import { airports, totalAirports } from './airportData';

/**
 * Get airports by continent
 */
export const getAirportsByContinent = (continent) => {
  return airports.filter(airport => airport.continent === continent);
};

/**
 * Get airports by country
 */
export const getAirportsByCountry = (country) => {
  return airports.filter(airport => airport.country === country);
};

/**
 * Search airports by name, location, or IATA code
 */
export const searchAirports = (query) => {
  const searchTerm = query.toLowerCase();
  return airports.filter(airport => 
    airport.name.toLowerCase().includes(searchTerm) ||
    airport.location.toLowerCase().includes(searchTerm) ||
    airport.iata.toLowerCase().includes(searchTerm) ||
    airport.country.toLowerCase().includes(searchTerm)
  );
};

/**
 * Get random airports for quiz
 */
export const getRandomAirports = (count = 10) => {
  const shuffled = [...airports].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

/**
 * Get a single random airport
 */
export const getRandomAirport = () => {
  return airports[Math.floor(Math.random() * airports.length)];
};

/**
 * Get airport by IATA code
 */
export const getAirportByIATA = (iata) => {
  return airports.find(airport => airport.iata === iata.toUpperCase());
};

/**
 * Get all continents
 */
export const getContinents = () => {
  return [...new Set(airports.map(airport => airport.continent))].sort();
};

/**
 * Get all countries
 */
export const getCountries = () => {
  return [...new Set(airports.map(airport => airport.country))].sort();
};

// Re-export for convenience
export { airports, totalAirports };