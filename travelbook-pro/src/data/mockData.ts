export interface Property {
  id: string;
  name: string;
  type: "hotel" | "apartment" | "villa" | "resort" | "hostel" | "guesthouse";
  location: {
    city: string;
    country: string;
    address: string;
    coordinates: { lat: number; lng: number };
    distanceFromCenter: number;
  };
  rating: number;
  reviewCount: number;
  reviewScore: number;
  images: string[];
  pricePerNight: number;
  currency: string;
  amenities: string[];
  description: string;
  rooms: Room[];
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    houseRules: string[];
  };
  features: {
    freeCancellation: boolean;
    breakfastIncluded: boolean;
    noPrepayment: boolean;
  };
}

export interface Room {
  id: string;
  name: string;
  maxGuests: number;
  bedType: string;
  size: number;
  pricePerNight: number;
  amenities: string[];
  images: string[];
  available: boolean;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  propertyCount: number;
}

export const destinations: Destination[] = [
  {
    id: "1",
    name: "Paris",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    propertyCount: 8420,
  },
  {
    id: "2",
    name: "London",
    country: "United Kingdom",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
    propertyCount: 12350,
  },
  {
    id: "3",
    name: "New York",
    country: "United States",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
    propertyCount: 9870,
  },
  {
    id: "4",
    name: "Tokyo",
    country: "Japan",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    propertyCount: 6540,
  },
  {
    id: "5",
    name: "Dubai",
    country: "UAE",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    propertyCount: 4230,
  },
  {
    id: "6",
    name: "Barcelona",
    country: "Spain",
    image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
    propertyCount: 5680,
  },
  {
    id: "7",
    name: "Monastir",
    country: "Tunisia",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    propertyCount: 680,
  },
{
  id: "8",
  name: "Douz",
  country: "Tunisia",
  image:
    "https://guide-voyage-tunisie.com/wp-content/uploads/2022/12/balade-a-dos-de-dromadaire4.webp",
  propertyCount: 1212,
}


];

export const propertyTypes = [
  { id: "hotel", name: "Hotels", icon: "🏨", count: 524890 },
  { id: "apartment", name: "Apartments", icon: "🏢", count: 342560 },
  { id: "resort", name: "Resorts", icon: "🏝️", count: 45230 },
  { id: "villa", name: "Villas", icon: "🏡", count: 123450 },
  { id: "hostel", name: "Hostels", icon: "🛏️", count: 78900 },
  { id: "guesthouse", name: "Guest Houses", icon: "🏠", count: 156780 },
];

export const amenitiesList = [
  "Free WiFi",
  "Parking",
  "Swimming Pool",
  "Spa",
  "Fitness Center",
  "Restaurant",
  "Bar",
  "Room Service",
  "Air Conditioning",
  "Pet Friendly",
  "Airport Shuttle",
  "Business Center",
  "Laundry Service",
  "Non-smoking Rooms",
  "Family Rooms",
  "Kitchen",
  "Balcony",
  "Sea View",
  "City View",
  "Garden",
];

export const properties: Property[] = [
  // Paris
  {
    id: "1",
    name: "Grand Plaza Hotel & Suites",
    type: "hotel",
    location: {
      city: "Paris",
      country: "France",
      address: "15 Avenue des Champs-Élysées, 75008 Paris",
      coordinates: { lat: 48.8698, lng: 2.3075 },
      distanceFromCenter: 0.5,
    },
    rating: 5,
    reviewCount: 2847,
    reviewScore: 9.2,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    ],
    pricePerNight: 289,
    currency: "EUR",
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Spa",
      "Fitness Center",
      "Restaurant",
      "Bar",
      "Room Service",
      "Air Conditioning",
    ],
    description:
      "Experience luxury in the heart of Paris. Our 5-star hotel offers stunning views of the Eiffel Tower, world-class dining, and impeccable service.",
    rooms: [
      {
        id: "r1",
        name: "Deluxe Double Room",
        maxGuests: 2,
        bedType: "1 King Bed",
        size: 35,
        pricePerNight: 289,
        amenities: [
          "Free WiFi",
          "Air Conditioning",
          "Mini Bar",
          "Safe",
          "Flat-screen TV",
        ],
        images: [
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
        ],
        available: true,
      },
    ],
    policies: {
      checkIn: "15:00",
      checkOut: "11:00",
      cancellation: "Free cancellation up to 24 hours before check-in",
      houseRules: ["No smoking", "No pets allowed", "No parties or events"],
    },
    features: {
      freeCancellation: true,
      breakfastIncluded: true,
      noPrepayment: false,
    },
  },
  {
    id: "2",
    name: "Cozy Central Apartment",
    type: "apartment",
    location: {
      city: "Paris",
      country: "France",
      address: "42 Rue de Rivoli, 75004 Paris",
      coordinates: { lat: 48.8566, lng: 2.3522 },
      distanceFromCenter: 0.2,
    },
    rating: 4,
    reviewCount: 856,
    reviewScore: 8.7,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    ],
    pricePerNight: 145,
    currency: "EUR",
    amenities: [
      "Free WiFi",
      "Kitchen",
      "Air Conditioning",
      "City View",
      "Balcony",
    ],
    description:
      "Charming apartment in the heart of Paris, perfect for couples or solo travelers seeking an authentic Parisian experience.",
    rooms: [
      {
        id: "r1",
        name: "Entire Apartment",
        maxGuests: 2,
        bedType: "1 Queen Bed",
        size: 45,
        pricePerNight: 145,
        amenities: ["Free WiFi", "Kitchen", "Air Conditioning", "City View"],
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
        ],
        available: true,
      },
    ],
    policies: {
      checkIn: "14:00",
      checkOut: "10:00",
      cancellation: "Free cancellation up to 48 hours before check-in",
      houseRules: ["No smoking", "No pets allowed", "Quiet hours after 22:00"],
    },
    features: {
      freeCancellation: true,
      breakfastIncluded: false,
      noPrepayment: true,
    },
  },

  // London
  {
    id: "3",
    name: "The Ritz London",
    type: "hotel",
    location: {
      city: "London",
      country: "United Kingdom",
      address: "150 Piccadilly, London W1J 9BR",
      coordinates: { lat: 51.5074, lng: -0.1411 },
      distanceFromCenter: 0.8,
    },
    rating: 5,
    reviewCount: 3421,
    reviewScore: 9.5,
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    ],
    pricePerNight: 520,
    currency: "GBP",
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Spa",
      "Fitness Center",
      "Restaurant",
      "Bar",
      "Room Service",
      "Air Conditioning",
      "Airport Shuttle",
    ],
    description:
      "One of the world's most iconic hotels, offering timeless elegance and exceptional service in the heart of London.",
    rooms: [
      {
        id: "r1",
        name: "Superior King Room",
        maxGuests: 2,
        bedType: "1 King Bed",
        size: 40,
        pricePerNight: 520,
        amenities: [
          "Free WiFi",
          "Air Conditioning",
          "Mini Bar",
          "Safe",
          "Flat-screen TV",
          "Marble Bathroom",
        ],
        images: [
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
        ],
        available: true,
      },
    ],
    policies: {
      checkIn: "15:00",
      checkOut: "12:00",
      cancellation: "Free cancellation up to 72 hours before check-in",
      houseRules: ["No smoking", "Smart casual dress code in public areas"],
    },
    features: {
      freeCancellation: true,
      breakfastIncluded: true,
      noPrepayment: false,
    },
  },

  // New York
  {
    id: "4",
    name: "Manhattan Skyline Hotel",
    type: "hotel",
    location: {
      city: "New York",
      country: "United States",
      address: "200 W 57th St, New York, NY 10019",
      coordinates: { lat: 40.7658, lng: -73.9808 },
      distanceFromCenter: 1.0,
    },
    rating: 4,
    reviewCount: 2150,
    reviewScore: 8.9,
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    ],
    pricePerNight: 320,
    currency: "USD",
    amenities: [
      "Free WiFi",
      "Gym",
      "Restaurant",
      "Bar",
      "Room Service",
      "Air Conditioning",
    ],
    description:
      "Modern hotel in Midtown Manhattan with amazing skyline views and convenient access to Broadway and Central Park.",
    rooms: [
      {
        id: "r1",
        name: "Standard King Room",
        maxGuests: 2,
        bedType: "1 King Bed",
        size: 38,
        pricePerNight: 320,
        amenities: [
          "Free WiFi",
          "Air Conditioning",
          "Mini Bar",
          "Flat-screen TV",
        ],
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
        ],
        available: true,
      },
    ],
    policies: {
      checkIn: "15:00",
      checkOut: "11:00",
      cancellation: "Free cancellation up to 48 hours before check-in",
      houseRules: ["No smoking", "No pets allowed", "Quiet hours after 23:00"],
    },
    features: {
      freeCancellation: true,
      breakfastIncluded: true,
      noPrepayment: false,
    },
  },

  // Tokyo
  {
    id: "5",
    name: "Modern Tokyo Loft",
    type: "apartment",
    location: {
      city: "Tokyo",
      country: "Japan",
      address: "3-14-1 Shibuya, Tokyo",
      coordinates: { lat: 35.6762, lng: 139.6503 },
      distanceFromCenter: 1.2,
    },
    rating: 4,
    reviewCount: 542,
    reviewScore: 8.9,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80",
    ],
    pricePerNight: 175,
    currency: "USD",
    amenities: [
      "Free WiFi",
      "Kitchen",
      "Air Conditioning",
      "City View",
      "Laundry Service",
    ],
    description:
      "Stylish modern loft in the heart of Shibuya, walking distance to the famous crossing and shopping districts.",
    rooms: [
      {
        id: "r1",
        name: "Entire Loft",
        maxGuests: 4,
        bedType: "2 Double Beds",
        size: 65,
        pricePerNight: 175,
        amenities: [
          "Free WiFi",
          "Kitchen",
          "Air Conditioning",
          "City View",
          "Washer/Dryer",
        ],
        images: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
        ],
        available: true,
      },
    ],
    policies: {
      checkIn: "16:00",
      checkOut: "10:00",
      cancellation: "Free cancellation up to 7 days before check-in",
      houseRules: ["No smoking", "No shoes inside", "Quiet hours after 21:00"],
    },
    features: {
      freeCancellation: true,
      breakfastIncluded: false,
      noPrepayment: true,
    },
  },

  // Dubai
  {
    id: "6",
    name: "Burj Al Arab Jumeirah",
    type: "resort",
    location: {
      city: "Dubai",
      country: "UAE",
      address: "Jumeirah Beach Road, Dubai",
      coordinates: { lat: 25.1412, lng: 55.1853 },
      distanceFromCenter: 12.5,
    },
    rating: 5,
    reviewCount: 5628,
    reviewScore: 9.8,
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    ],
    pricePerNight: 1850,
    currency: "USD",
    amenities: [
      "Free WiFi",
      "Private Beach",
      "Swimming Pool",
      "Spa",
      "Fitness Center",
      "Restaurant",
      "Bar",
      "Room Service",
      "Air Conditioning",
      "Airport Shuttle",
      "Butler Service",
    ],
    description:
      "The world's most luxurious hotel, offering unparalleled opulence on its own private island.",
    rooms: [
      {
        id: "r1",
        name: "Deluxe One-Bedroom Suite",
        maxGuests: 2,
        bedType: "1 King Bed",
        size: 170,
        pricePerNight: 1850,
        amenities: [
          "Free WiFi",
          "Air Conditioning",
          "Mini Bar",
          "Safe",
          "Flat-screen TV",
          "Butler Service",
          "Sea View",
          "Private Dining",
        ],
        images: [
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
        ],
        available: true,
      },
    ],
    policies: {
      checkIn: "15:00",
      checkOut: "12:00",
      cancellation: "Non-refundable",
      houseRules: ["No smoking", "Dress code applies in restaurants"],
    },
    features: {
      freeCancellation: false,
      breakfastIncluded: true,
      noPrepayment: false,
    },
  },

  // Barcelona
  {
    id: "7",
    name: "Barcelona Beach Hostel",
    type: "hostel",
    location: {
      city: "Barcelona",
      country: "Spain",
      address: "Passeig de Joan de Borbó, 08003 Barcelona",
      coordinates: { lat: 41.3784, lng: 2.1925 },
      distanceFromCenter: 2.1,
    },
    rating: 3,
    reviewCount: 1234,
    reviewScore: 8.1,
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
      "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=800&q=80",
    ],
    pricePerNight: 32,
    currency: "EUR",
    amenities: [
      "Free WiFi",
      "Bar",
      "Shared Kitchen",
      "Lockers",
      "Air Conditioning",
      "Terrace",
    ],
    description:
      "Fun and social hostel just steps from the beach, perfect for backpackers and solo travelers.",
    rooms: [
      {
        id: "r1",
        name: "6-Bed Mixed Dorm",
        maxGuests: 1,
        bedType: "1 Single Bed in Dorm",
        size: 25,
        pricePerNight: 32,
        amenities: [
          "Free WiFi",
          "Air Conditioning",
          "Locker",
          "Shared Bathroom",
        ],
        images: [
          "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
        ],
        available: true,
      },
      {
        id: "r2",
        name: "Private Double Room",
        maxGuests: 2,
        bedType: "1 Double Bed",
        size: 15,
        pricePerNight: 75,
        amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom"],
        images: [
          "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=800&q=80",
        ],
        available: true,
      },
    ],
    policies: {
      checkIn: "14:00",
      checkOut: "11:00",
      cancellation: "Free cancellation up to 24 hours before check-in",
      houseRules: [
        "No smoking inside",
        "Quiet hours 23:00-08:00",
        "Valid ID required",
      ],
    },
    features: {
      freeCancellation: true,
      breakfastIncluded: false,
      noPrepayment: true,
    },
  },
];

export const getPropertyById = (id: string): Property | undefined => {
  return properties.find((p) => p.id === id);
};

export const searchProperties = (
  destination?: string,
  filters?: {
    priceMin?: number;
    priceMax?: number;
    rating?: number;
    propertyTypes?: string[];
    amenities?: string[];
  }
): Property[] => {
  let results = [...properties];

  if (destination) {
    const searchTerm = destination.toLowerCase();
    results = results.filter(
      (p) =>
        p.location.city.toLowerCase().includes(searchTerm) ||
        p.location.country.toLowerCase().includes(searchTerm)
    );
  }

  if (filters) {
    if (filters.priceMin !== undefined) {
      results = results.filter((p) => p.pricePerNight >= filters.priceMin!);
    }
    if (filters.priceMax !== undefined) {
      results = results.filter((p) => p.pricePerNight <= filters.priceMax!);
    }
    if (filters.rating !== undefined) {
      results = results.filter((p) => p.rating >= filters.rating!);
    }
    if (filters.propertyTypes && filters.propertyTypes.length > 0) {
      results = results.filter((p) => filters.propertyTypes!.includes(p.type));
    }
    if (filters.amenities && filters.amenities.length > 0) {
      results = results.filter((p) =>
        filters.amenities!.every((a) => p.amenities.includes(a))
      );
    }
  }

  return results;
};
