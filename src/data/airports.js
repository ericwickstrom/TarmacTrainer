export const airports = [
  {
    iata: 'LAX',
    name: 'Los Angeles International Airport',
    city: 'Los Angeles',
    country: 'United States',
    region: 'North America'
  },
  {
    iata: 'JFK',
    name: 'John F. Kennedy International Airport',
    city: 'New York',
    country: 'United States',
    region: 'North America'
  },
  {
    iata: 'LHR',
    name: 'London Heathrow Airport',
    city: 'London',
    country: 'United Kingdom',
    region: 'Europe'
  },
  {
    iata: 'CDG',
    name: 'Charles de Gaulle Airport',
    city: 'Paris',
    country: 'France',
    region: 'Europe'
  },
  {
    iata: 'DXB',
    name: 'Dubai International Airport',
    city: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Middle East'
  },
  {
    iata: 'HND',
    name: 'Tokyo Haneda Airport',
    city: 'Tokyo',
    country: 'Japan',
    region: 'Asia'
  },
  {
    iata: 'ORD',
    name: "O'Hare International Airport",
    city: 'Chicago',
    country: 'United States',
    region: 'North America'
  },
  {
    iata: 'SIN',
    name: 'Singapore Changi Airport',
    city: 'Singapore',
    country: 'Singapore',
    region: 'Asia'
  },
  {
    iata: 'ATL',
    name: 'Hartsfield-Jackson Atlanta International Airport',
    city: 'Atlanta',
    country: 'United States',
    region: 'North America'
  },
  {
    iata: 'FRA',
    name: 'Frankfurt Airport',
    city: 'Frankfurt',
    country: 'Germany',
    region: 'Europe'
  },
  {
    iata: 'AMS',
    name: 'Amsterdam Airport Schiphol',
    city: 'Amsterdam',
    country: 'Netherlands',
    region: 'Europe'
  },
  {
    iata: 'HKG',
    name: 'Hong Kong International Airport',
    city: 'Hong Kong',
    country: 'Hong Kong',
    region: 'Asia'
  },
  {
    iata: 'DEN',
    name: 'Denver International Airport',
    city: 'Denver',
    country: 'United States',
    region: 'North America'
  },
  {
    iata: 'BKK',
    name: 'Suvarnabhumi Airport',
    city: 'Bangkok',
    country: 'Thailand',
    region: 'Asia'
  },
  {
    iata: 'SYD',
    name: 'Sydney Kingsford Smith Airport',
    city: 'Sydney',
    country: 'Australia',
    region: 'Oceania'
  },
  {
    iata: 'ICN',
    name: 'Incheon International Airport',
    city: 'Seoul',
    country: 'South Korea',
    region: 'Asia'
  },
  {
    iata: 'MUC',
    name: 'Munich Airport',
    city: 'Munich',
    country: 'Germany',
    region: 'Europe'
  },
  {
    iata: 'MAD',
    name: 'Adolfo Suárez Madrid–Barajas Airport',
    city: 'Madrid',
    country: 'Spain',
    region: 'Europe'
  },
  {
    iata: 'BCN',
    name: 'Barcelona–El Prat Airport',
    city: 'Barcelona',
    country: 'Spain',
    region: 'Europe'
  },
  {
    iata: 'YYZ',
    name: 'Toronto Pearson International Airport',
    city: 'Toronto',
    country: 'Canada',
    region: 'North America'
  },
  {
    iata: 'PEK',
    name: 'Beijing Capital International Airport',
    city: 'Beijing',
    country: 'China',
    region: 'Asia'
  },
  {
    iata: 'MEX',
    name: 'Mexico City International Airport',
    city: 'Mexico City',
    country: 'Mexico',
    region: 'North America'
  },
  {
    iata: 'GRU',
    name: 'São Paulo/Guarulhos International Airport',
    city: 'São Paulo',
    country: 'Brazil',
    region: 'South America'
  },
  {
    iata: 'MIA',
    name: 'Miami International Airport',
    city: 'Miami',
    country: 'United States',
    region: 'North America'
  },
  {
    iata: 'SFO',
    name: 'San Francisco International Airport',
    city: 'San Francisco',
    country: 'United States',
    region: 'North America'
  },
  {
    iata: 'SEA',
    name: 'Seattle-Tacoma International Airport',
    city: 'Seattle',
    country: 'United States',
    region: 'North America'
  },
  {
    iata: 'LAS',
    name: 'Harry Reid International Airport',
    city: 'Las Vegas',
    country: 'United States',
    region: 'North America'
  },
  {
    iata: 'BOS',
    name: 'Logan International Airport',
    city: 'Boston',
    country: 'United States',
    region: 'North America'
  },
  {
    iata: 'MCO',
    name: 'Orlando International Airport',
    city: 'Orlando',
    country: 'United States',
    region: 'North America'
  },
  {
    iata: 'EWR',
    name: 'Newark Liberty International Airport',
    city: 'Newark',
    country: 'United States',
    region: 'North America'
  }
];

export const getRandomAirport = () => {
  return airports[Math.floor(Math.random() * airports.length)];
};

export const getAirportsByRegion = (region) => {
  return airports.filter(airport => airport.region === region);
};

export const searchAirports = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return airports.filter(airport => 
    airport.iata.toLowerCase().includes(lowercaseQuery) ||
    airport.name.toLowerCase().includes(lowercaseQuery) ||
    airport.city.toLowerCase().includes(lowercaseQuery) ||
    airport.country.toLowerCase().includes(lowercaseQuery)
  );
};