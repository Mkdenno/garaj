// Import generated garages
import { generateAllGarages } from './generateGarages';

// Helper function to calculate distance between two coordinates
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 10) / 10; // Round to 1 decimal place
};

// Helper function to get current time in a specific timezone
export const getLocalTime = (timezone) => {
  try {
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return timeString;
  } catch (error) {
    return "Time unavailable";
  }
};

// Helper function to check if garage is currently open
export const isGarageOpen = (hours, timezone) => {
  if (hours === "24/7 - Always Open") return true;

  // Simple check - can be enhanced with more complex parsing
  // For now, return true for most cases (you can enhance this logic)
  return true;
};

export const mockGarages = [
  // KENYA - Nairobi
  {
    id: 1,
    name: "AutoCare Pro Nairobi",
    country: "Kenya",
    city: "Nairobi",
    timezone: "Africa/Nairobi",
    subscriptionTier: "premium",
    rating: 4.8,
    reviews: 234,
    specialties: ["Oil Change", "Brake Service", "Diagnostics"],
    pricing: { min: 2000, max: 5000 },
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop",
    lat: -1.2864,
    lng: 36.8172,
    description:
      "AutoCare Pro is your trusted neighborhood garage in Nairobi with over 15 years of experience. We specialize in comprehensive vehicle maintenance and repair services with certified technicians.",
    services: [
      "Oil & Filter Change",
      "Brake Inspection & Repair",
      "Engine Diagnostics",
      "Tire Rotation & Balance",
      "Battery Service",
      "AC Repair",
      "Transmission Service",
      "Wheel Alignment",
    ],
    landmarks: [
      "Near Westlands Roundabout - 0.5 km",
      "Opposite Sarit Centre",
      "Next to Westlands Police Station",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1632823469850-1b4942f4e2e5?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop",
    ],
    phone: "+254 712 345 678",
    email: "info@autocarepro.co.ke",
    hours: "Mon-Sat: 8:00 AM - 6:00 PM",
  },
  {
    id: 2,
    name: "QuickFix Motors Kilimani",
    country: "Kenya",
    city: "Nairobi",
    timezone: "Africa/Nairobi",
    subscriptionTier: "free",
    rating: 4.6,
    reviews: 189,
    specialties: ["Quick Service", "Tire Change", "Battery"],
    pricing: { min: 1500, max: 4000 },
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&h=600&fit=crop",
    lat: -1.2921,
    lng: 36.7856,
    description:
      "QuickFix Motors offers fast and reliable automotive services in Kilimani. We understand your time is valuable, so we provide express services without compromising quality.",
    services: [
      "Express Oil Change",
      "Tire Replacement",
      "Battery Testing & Replacement",
      "Windshield Repair",
      "Light Bulb Replacement",
      "Wiper Blade Service",
      "Fluid Top-ups",
    ],
    landmarks: [
      "Behind Yaya Centre",
      "Near Kilimani Road",
      "Adjacent to Shell Petrol Station",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop",
    ],
    phone: "+254 720 456 789",
    email: "service@quickfixmotors.co.ke",
    hours: "Mon-Sun: 7:00 AM - 9:00 PM",
  },
  // USA - New York
  {
    id: 7,
    name: "Manhattan Auto Repair",
    country: "USA",
    city: "New York",
    timezone: "America/New_York",
    rating: 4.7,
    reviews: 567,
    specialties: ["Full Service", "Diagnostics", "NYC Inspection"],
    pricing: { min: 80, max: 200 },
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&h=600&fit=crop",
    lat: 40.7580,
    lng: -73.9855,
    description:
      "Manhattan Auto Repair has been serving NYC drivers for over 20 years. We offer comprehensive auto repair services with certified mechanics and state-of-the-art equipment.",
    services: [
      "NYS Vehicle Inspection",
      "Engine Diagnostics",
      "Brake Service",
      "Oil Change",
      "Transmission Repair",
      "AC Service",
      "Tire Service",
      "Electrical Repairs",
    ],
    landmarks: [
      "Near Central Park West",
      "Columbus Circle - 2 blocks",
      "Lincoln Center nearby",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1632823469850-1b4942f4e2e5?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop",
    ],
    phone: "+1 (212) 555-0123",
    email: "info@manhattanauto.com",
    hours: "Mon-Fri: 7:00 AM - 7:00 PM, Sat: 8:00 AM - 5:00 PM",
  },
  {
    id: 8,
    name: "Brooklyn Express Auto",
    country: "USA",
    city: "New York",
    timezone: "America/New_York",
    rating: 4.5,
    reviews: 423,
    specialties: ["Quick Service", "Brakes", "Tires"],
    pricing: { min: 60, max: 150 },
    image:
      "https://images.unsplash.com/photo-1625047508077-0b8e5136b4e1?w=800&h=600&fit=crop",
    lat: 40.6782,
    lng: -73.9442,
    description:
      "Brooklyn Express Auto provides fast, reliable service to Brooklyn residents. We specialize in quick turnaround repairs without compromising quality.",
    services: [
      "Express Oil Change",
      "Brake Repair",
      "Tire Sales & Service",
      "Battery Replacement",
      "Suspension Work",
      "Exhaust Repair",
      "Wheel Alignment",
    ],
    landmarks: [
      "Near Prospect Park",
      "Flatbush Avenue",
      "Brooklyn Museum - 1 mile",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop",
    ],
    phone: "+1 (718) 555-0456",
    email: "service@brooklynauto.com",
    hours: "Mon-Sat: 7:00 AM - 8:00 PM, Sun: 9:00 AM - 4:00 PM",
  },
  // UK - London
  {
    id: 9,
    name: "London Motor Services",
    country: "UK",
    city: "London",
    timezone: "Europe/London",
    rating: 4.8,
    reviews: 312,
    specialties: ["MOT Testing", "Servicing", "Repairs"],
    pricing: { min: 50, max: 180 },
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop",
    lat: 51.5074,
    lng: -0.1278,
    description:
      "London Motor Services is your trusted garage in Central London. We offer MOT testing, full servicing, and repairs for all makes and models.",
    services: [
      "MOT Testing",
      "Full Service",
      "Brake Service",
      "Clutch Replacement",
      "Diagnostics",
      "Tyres",
      "Exhaust Systems",
      "Air Conditioning",
    ],
    landmarks: [
      "Near Westminster",
      "Victoria Station - 0.5 miles",
      "Buckingham Palace area",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1632823469850-1b4942f4e2e5?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop",
    ],
    phone: "+44 20 7123 4567",
    email: "info@londonmotors.co.uk",
    hours: "Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 4:00 PM",
  },
  // INDIA - Mumbai
  {
    id: 10,
    name: "Mumbai Auto Care",
    country: "India",
    city: "Mumbai",
    timezone: "Asia/Kolkata",
    rating: 4.6,
    reviews: 445,
    specialties: ["All Brands", "Quick Service", "Affordable"],
    pricing: { min: 1500, max: 8000 },
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&h=600&fit=crop",
    lat: 19.0760,
    lng: 72.8777,
    description:
      "Mumbai Auto Care provides quality automotive services at affordable prices. We service all major brands with experienced technicians and genuine parts.",
    services: [
      "General Service",
      "Engine Repair",
      "AC Service",
      "Denting & Painting",
      "Wheel Alignment",
      "Battery Service",
      "Brake Service",
      "Suspension Repair",
    ],
    landmarks: [
      "Near Bandra Station",
      "Linking Road",
      "Opposite Bandra Court",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop",
    ],
    phone: "+91 22 2345 6789",
    email: "service@mumbaiautocare.in",
    hours: "Mon-Sun: 9:00 AM - 8:00 PM",
  },
  // AUSTRALIA - Sydney
  {
    id: 11,
    name: "Sydney Auto Workshop",
    country: "Australia",
    city: "Sydney",
    timezone: "Australia/Sydney",
    rating: 4.9,
    reviews: 289,
    specialties: ["European Cars", "Diagnostics", "Performance"],
    pricing: { min: 100, max: 300 },
    image:
      "https://images.unsplash.com/photo-1625047508077-0b8e5136b4e1?w=800&h=600&fit=crop",
    lat: -33.8688,
    lng: 151.2093,
    description:
      "Sydney Auto Workshop specializes in European vehicles with factory-trained technicians. We use the latest diagnostic equipment and genuine parts.",
    services: [
      "Logbook Service",
      "Pre-Purchase Inspection",
      "Brake Service",
      "Suspension",
      "Engine Diagnostics",
      "Air Conditioning",
      "Transmission Service",
      "Performance Tuning",
    ],
    landmarks: [
      "Sydney CBD",
      "Near Circular Quay",
      "Opera House - 2km",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1632823469850-1b4942f4e2e5?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop",
    ],
    phone: "+61 2 9123 4567",
    email: "info@sydneyauto.com.au",
    hours: "Mon-Fri: 7:30 AM - 5:30 PM, Sat: 8:00 AM - 2:00 PM",
  },
  // SOUTH AFRICA - Johannesburg
  {
    id: 12,
    name: "Joburg Auto Experts",
    country: "South Africa",
    city: "Johannesburg",
    timezone: "Africa/Johannesburg",
    rating: 4.7,
    reviews: 198,
    specialties: ["All Makes", "Service", "Repairs"],
    pricing: { min: 500, max: 3000 },
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&h=600&fit=crop",
    lat: -26.2041,
    lng: 28.0473,
    description:
      "Joburg Auto Experts is your reliable partner for all automotive needs in Johannesburg. We offer honest service at fair prices with experienced mechanics.",
    services: [
      "Major Service",
      "Minor Service",
      "Brake & Clutch",
      "Gearbox Repair",
      "Engine Overhaul",
      "Electrical Work",
      "Aircon Service",
      "Wheel Alignment",
    ],
    landmarks: [
      "Sandton City nearby",
      "Nelson Mandela Square",
      "M1 Highway access",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop",
    ],
    phone: "+27 11 123 4567",
    email: "info@joburgauto.co.za",
    hours: "Mon-Fri: 7:30 AM - 5:00 PM, Sat: 8:00 AM - 1:00 PM",
  },
  {
    id: 3,
    name: "Elite Auto Service Karen",
    country: "Kenya",
    city: "Nairobi",
    timezone: "Africa/Nairobi",
    rating: 4.9,
    reviews: 412,
    specialties: ["Luxury Cars", "Performance", "Detailing"],
    pricing: { min: 5000, max: 15000 },
    image:
      "https://images.unsplash.com/photo-1625047508077-0b8e5136b4e1?w=800&h=600&fit=crop",
    lat: -1.3197,
    lng: 36.7078,
    description:
      "Elite Auto Service in Karen specializes in luxury and high-performance vehicles. Our master technicians are factory-trained and use only premium parts and equipment.",
    services: [
      "Luxury Vehicle Maintenance",
      "Performance Tuning",
      "Premium Detailing",
      "Paint Protection",
      "Ceramic Coating",
      "Engine Performance Upgrades",
      "Suspension Tuning",
      "Custom Exhaust Systems",
    ],
    landmarks: [
      "Karen Shopping Centre - 1 km",
      "Near Karen Country Club",
      "Opposite Nairobi National Park Gate",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1632823469850-1b4942f4e2e5?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=400&h=300&fit=crop",
    ],
    phone: "+254 733 567 890",
    email: "concierge@eliteauto.co.ke",
    hours: "Mon-Fri: 8:00 AM - 7:00 PM, Sat: 9:00 AM - 5:00 PM",
  },
  {
    id: 4,
    name: "Green Garage Gigiri",
    country: "Kenya",
    city: "Nairobi",
    timezone: "Africa/Nairobi",
    rating: 4.7,
    reviews: 156,
    specialties: ["Eco-Friendly", "Hybrid", "Electric"],
    pricing: { min: 3000, max: 8000 },
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&h=600&fit=crop",
    lat: -1.2333,
    lng: 36.8,
    description:
      "Green Garage in Gigiri is committed to sustainable automotive care. We specialize in hybrid and electric vehicles, using eco-friendly products and practices.",
    services: [
      "Hybrid Vehicle Service",
      "Electric Vehicle Maintenance",
      "Battery Health Check",
      "Eco-Friendly Oil Change",
      "Regenerative Brake Service",
      "EV Charging System Check",
      "Solar Panel Installation",
    ],
    landmarks: [
      "Near UN Complex Gigiri",
      "Opposite Village Market",
      "Next to Two Rivers Mall",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop",
    ],
    phone: "+254 745 678 901",
    email: "hello@greengarage.co.ke",
    hours: "Mon-Sat: 8:00 AM - 6:00 PM",
  },
  {
    id: 5,
    name: "24/7 Auto Rescue CBD",
    country: "Kenya",
    city: "Nairobi",
    timezone: "Africa/Nairobi",
    rating: 4.5,
    reviews: 298,
    specialties: ["Emergency", "Towing", "24/7 Service"],
    pricing: { min: 2500, max: 6000 },
    image:
      "https://images.unsplash.com/photo-1625047508077-0b8e5136b4e1?w=800&h=600&fit=crop",
    lat: -1.2864,
    lng: 36.8172,
    description:
      "24/7 Auto Rescue is always here when you need us in Nairobi CBD. We provide round-the-clock emergency services, towing, and roadside assistance across Kenya.",
    services: [
      "24/7 Emergency Service",
      "Towing Service",
      "Roadside Assistance",
      "Jump Start",
      "Lockout Service",
      "Flat Tire Change",
      "Fuel Delivery",
      "Emergency Repairs",
    ],
    landmarks: [
      "Thika Road Highway Access",
      "Near Kenyatta National Hospital",
      "CBD - Uhuru Highway",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1632823469850-1b4942f4e2e5?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop",
    ],
    phone: "+254 700 123 456",
    email: "emergency@247autorescue.co.ke",
    hours: "24/7 - Always Open",
  },
  {
    id: 6,
    name: "Classic Car Workshop Industrial Area",
    country: "Kenya",
    city: "Nairobi",
    timezone: "Africa/Nairobi",
    rating: 4.9,
    reviews: 87,
    specialties: ["Classic Cars", "Restoration", "Custom Work"],
    pricing: { min: 10000, max: 50000 },
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&h=600&fit=crop",
    lat: -1.3167,
    lng: 36.85,
    description:
      "Classic Car Workshop in Industrial Area is a haven for vintage automobile enthusiasts. Our craftsmen specialize in restoration and maintenance of classic and collector vehicles.",
    services: [
      "Classic Car Restoration",
      "Vintage Parts Sourcing",
      "Custom Fabrication",
      "Paint & Body Work",
      "Interior Restoration",
      "Engine Rebuilding",
      "Chrome Plating",
      "Appraisal Services",
    ],
    landmarks: [
      "Industrial Area - Enterprise Road",
      "Near Mombasa Road",
      "Opposite Baba Dogo",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=400&h=300&fit=crop",
    ],
    phone: "+254 722 890 123",
    email: "info@classiccarworkshop.co.ke",
    hours: "Tue-Sat: 9:00 AM - 5:00 PM",
  },
];

// Combine original garages with generated ones
const generatedGarages = generateAllGarages();
export const allMockGarages = [...mockGarages, ...generatedGarages];
