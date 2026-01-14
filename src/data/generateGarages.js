// Script to generate garage data for multiple countries

const garageNames = [
  "AutoCare", "QuickFix", "Elite Auto", "Express Motors", "Pro Service",
  "Premium Garage", "Fast Lane", "City Motors", "Downtown Auto", "Highway Service",
  "Master Mechanics", "Precision Auto", "Quality Service", "Reliable Motors", "Smart Auto",
  "Tech Motors", "Ultimate Garage", "Victory Auto", "Wheels & Deals", "Expert Auto",
  "Ace Motors", "Best Auto", "Champion Service", "Dynamic Motors", "First Class Auto",
  "Golden Garage", "Happy Motors", "Ideal Auto", "Just Right Service", "King Auto",
  "Lucky Motors", "Metro Garage", "Noble Auto", "Optimal Service", "Perfect Motors",
  "Quick Service", "Royal Auto", "Super Garage", "Top Motors", "Ultra Auto",
  "Value Service", "Wise Motors", "Xpress Auto", "Your Garage", "Zenith Motors",
  "Alpha Auto", "Bravo Service", "Classic Motors", "Delta Garage", "Echo Auto",
  "Foxtrot Motors", "Golf Service", "Hotel Auto", "India Garage", "Juliet Motors"
];

const specialtiesOptions = [
  ["Oil Change", "Brake Service", "Diagnostics"],
  ["Quick Service", "Tire Change", "Battery"],
  ["Luxury Cars", "Performance", "Detailing"],
  ["Eco-Friendly", "Hybrid", "Electric"],
  ["Emergency", "Towing", "24/7 Service"],
  ["All Makes", "Service", "Repairs"],
  ["European Cars", "Diagnostics", "Performance"],
  ["Full Service", "Diagnostics", "Inspection"],
  ["Brakes", "Tires", "Suspension"],
  ["Engine Repair", "Transmission", "AC Service"]
];

// Country configurations
const countries = {
  Kenya: {
    cities: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"],
    timezone: "Africa/Nairobi",
    phonePrefix: "+254",
    phoneFormat: (i) => `+254 ${700 + (i % 100)} ${Math.floor(100000 + Math.random() * 900000)}`,
    coords: [
      { lat: -1.2864, lng: 36.8172 }, // Nairobi
      { lat: -4.0435, lng: 39.6682 }, // Mombasa
      { lat: -0.0917, lng: 34.7680 }, // Kisumu
      { lat: -0.3031, lng: 36.0800 }, // Nakuru
      { lat: 0.5143, lng: 35.2698 }   // Eldoret
    ],
    pricing: { min: 1500, max: 15000 }
  },
  USA: {
    cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"],
    timezone: "America/New_York",
    phonePrefix: "+1",
    phoneFormat: (i) => {
      const areaCodes = [212, 310, 312, 713, 602, 215, 210, 619, 214, 408];
      const areaCode = areaCodes[i % areaCodes.length];
      return `+1 (${areaCode}) ${Math.floor(200 + Math.random() * 800)}-${Math.floor(1000 + Math.random() * 9000)}`;
    },
    coords: [
      { lat: 40.7128, lng: -74.0060 }, // New York
      { lat: 34.0522, lng: -118.2437 }, // Los Angeles
      { lat: 41.8781, lng: -87.6298 }, // Chicago
      { lat: 29.7604, lng: -95.3698 }, // Houston
      { lat: 33.4484, lng: -112.0740 }, // Phoenix
      { lat: 39.9526, lng: -75.1652 }, // Philadelphia
      { lat: 29.4241, lng: -98.4936 }, // San Antonio
      { lat: 32.7157, lng: -117.1611 }, // San Diego
      { lat: 32.7767, lng: -96.7970 }, // Dallas
      { lat: 37.3382, lng: -121.8863 }  // San Jose
    ],
    pricing: { min: 60, max: 300 }
  },
  UK: {
    cities: ["London", "Manchester", "Birmingham", "Leeds", "Glasgow", "Liverpool", "Newcastle", "Sheffield", "Bristol", "Edinburgh"],
    timezone: "Europe/London",
    phonePrefix: "+44",
    phoneFormat: (i) => {
      const areaCodes = [20, 161, 121, 113, 141, 151, 191, 114, 117, 131];
      const areaCode = areaCodes[i % areaCodes.length];
      return `+44 ${areaCode} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`;
    },
    coords: [
      { lat: 51.5074, lng: -0.1278 }, // London
      { lat: 53.4808, lng: -2.2426 }, // Manchester
      { lat: 52.4862, lng: -1.8904 }, // Birmingham
      { lat: 53.8008, lng: -1.5491 }, // Leeds
      { lat: 55.8642, lng: -4.2518 }, // Glasgow
      { lat: 53.4084, lng: -2.9916 }, // Liverpool
      { lat: 54.9783, lng: -1.6178 }, // Newcastle
      { lat: 53.3811, lng: -1.4701 }, // Sheffield
      { lat: 51.4545, lng: -2.5879 }, // Bristol
      { lat: 55.9533, lng: -3.1883 }  // Edinburgh
    ],
    pricing: { min: 50, max: 250 }
  },
  India: {
    cities: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Surat"],
    timezone: "Asia/Kolkata",
    phonePrefix: "+91",
    phoneFormat: (i) => {
      const prefixes = [22, 11, 80, 40, 44, 33, 20, 79, 141, 261];
      const prefix = prefixes[i % prefixes.length];
      return `+91 ${prefix} ${Math.floor(2000 + Math.random() * 8000)} ${Math.floor(1000 + Math.random() * 9000)}`;
    },
    coords: [
      { lat: 19.0760, lng: 72.8777 }, // Mumbai
      { lat: 28.7041, lng: 77.1025 }, // Delhi
      { lat: 12.9716, lng: 77.5946 }, // Bangalore
      { lat: 17.3850, lng: 78.4867 }, // Hyderabad
      { lat: 13.0827, lng: 80.2707 }, // Chennai
      { lat: 22.5726, lng: 88.3639 }, // Kolkata
      { lat: 18.5204, lng: 73.8567 }, // Pune
      { lat: 23.0225, lng: 72.5714 }, // Ahmedabad
      { lat: 26.9124, lng: 75.7873 }, // Jaipur
      { lat: 21.1702, lng: 72.8311 }  // Surat
    ],
    pricing: { min: 1000, max: 10000 }
  },
  Australia: {
    cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Canberra", "Newcastle", "Wollongong", "Hobart"],
    timezone: "Australia/Sydney",
    phonePrefix: "+61",
    phoneFormat: (i) => {
      const areaCodes = [2, 3, 7, 8, 8, 7, 2, 2, 2, 3];
      const areaCode = areaCodes[i % areaCodes.length];
      return `+61 ${areaCode} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`;
    },
    coords: [
      { lat: -33.8688, lng: 151.2093 }, // Sydney
      { lat: -37.8136, lng: 144.9631 }, // Melbourne
      { lat: -27.4698, lng: 153.0251 }, // Brisbane
      { lat: -31.9505, lng: 115.8605 }, // Perth
      { lat: -34.9285, lng: 138.6007 }, // Adelaide
      { lat: -28.0167, lng: 153.4000 }, // Gold Coast
      { lat: -35.2809, lng: 149.1300 }, // Canberra
      { lat: -32.9283, lng: 151.7817 }, // Newcastle
      { lat: -34.4278, lng: 150.8931 }, // Wollongong
      { lat: -42.8821, lng: 147.3272 }  // Hobart
    ],
    pricing: { min: 80, max: 350 }
  },
  "South Africa": {
    cities: ["Johannesburg", "Cape Town", "Durban", "Pretoria", "Port Elizabeth", "Bloemfontein", "East London", "Polokwane", "Nelspruit", "Kimberley"],
    timezone: "Africa/Johannesburg",
    phonePrefix: "+27",
    phoneFormat: (i) => {
      const areaCodes = [11, 21, 31, 12, 41, 51, 43, 15, 13, 53];
      const areaCode = areaCodes[i % areaCodes.length];
      return `+27 ${areaCode} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(1000 + Math.random() * 9000)}`;
    },
    coords: [
      { lat: -26.2041, lng: 28.0473 }, // Johannesburg
      { lat: -33.9249, lng: 18.4241 }, // Cape Town
      { lat: -29.8587, lng: 31.0218 }, // Durban
      { lat: -25.7479, lng: 28.2293 }, // Pretoria
      { lat: -33.9608, lng: 25.6022 }, // Port Elizabeth
      { lat: -29.1217, lng: 26.2140 }, // Bloemfontein
      { lat: -33.0153, lng: 27.9116 }, // East London
      { lat: -23.9045, lng: 29.4689 }, // Polokwane
      { lat: -25.4753, lng: 30.9698 }, // Nelspruit
      { lat: -28.7282, lng: 24.7499 }  // Kimberley
    ],
    pricing: { min: 400, max: 4000 }
  }
};

export const generateGaragesForCountry = (country, startId, count = 50) => {
  const config = countries[country];
  const garages = [];
  
  for (let i = 0; i < count; i++) {
    const cityIndex = i % config.cities.length;
    const city = config.cities[cityIndex];
    const coords = config.coords[cityIndex];
    
    // Add some variation to coordinates
    const latVariation = (Math.random() - 0.5) * 0.1;
    const lngVariation = (Math.random() - 0.5) * 0.1;
    
    const nameIndex = i % garageNames.length;
    const specialtyIndex = i % specialtiesOptions.length;
    
    const minPrice = config.pricing.min + Math.floor(Math.random() * config.pricing.min);
    const maxPrice = config.pricing.max - Math.floor(Math.random() * (config.pricing.max * 0.3));
    
    garages.push({
      id: startId + i,
      name: `${garageNames[nameIndex]} ${city}`,
      country,
      city,
      timezone: config.timezone,
      rating: parseFloat((4.0 + Math.random() * 1).toFixed(1)),
      reviews: Math.floor(50 + Math.random() * 500),
      specialties: specialtiesOptions[specialtyIndex],
      pricing: { min: minPrice, max: maxPrice },
      image: `https://images.unsplash.com/photo-${1486262715619 + (i % 10)}?w=800&h=600&fit=crop`,
      lat: coords.lat + latVariation,
      lng: coords.lng + lngVariation,
      description: `${garageNames[nameIndex]} ${city} is a trusted automotive service center. We provide quality repairs and maintenance with experienced technicians.`,
      services: [
        "Oil & Filter Change",
        "Brake Service",
        "Engine Diagnostics",
        "Tire Service",
        "Battery Service",
        "AC Repair",
        "Transmission Service",
        "Wheel Alignment"
      ],
      landmarks: [
        `Near ${city} Center`,
        `${city} Main Street`,
        `Downtown ${city}`
      ],
      gallery: [
        "https://images.unsplash.com/photo-1632823469850-1b4942f4e2e5?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop"
      ],
      phone: config.phoneFormat(i),
      email: `info@${garageNames[nameIndex].toLowerCase().replace(/\s+/g, '')}${city.toLowerCase().replace(/\s+/g, '')}.com`,
      hours: "Mon-Sat: 8:00 AM - 6:00 PM"
    });
  }
  
  return garages;
};

// Generate all garages
export const generateAllGarages = () => {
  let allGarages = [];
  let currentId = 1000; // Start from 1000 to avoid conflicts
  
  Object.keys(countries).forEach(country => {
    const garages = generateGaragesForCountry(country, currentId, 1000); // Generate 1000 per country
    allGarages = [...allGarages, ...garages];
    currentId += 1000;
  });
  
  return allGarages;
};
