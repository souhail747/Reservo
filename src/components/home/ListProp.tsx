import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { properties } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';

// Helper to get and set saved properties in localStorage
const getSavedProperties = (): string[] =>
  JSON.parse(localStorage.getItem("savedProperties") || "[]");

const setSavedProperties = (ids: string[]) =>
  localStorage.setItem("savedProperties", JSON.stringify(ids));

const SavedProperties: React.FC = () => {
  const [savedProps, setSavedProps] = useState<typeof properties>([]);

  // Load saved properties
  const loadSaved = () => {
    const savedIds = getSavedProperties();
    const savedList = properties.filter((p) => savedIds.includes(p.id));
    setSavedProps(savedList);
  };
  const number=getSavedProperties().length

  useEffect(() => {
    loadSaved();
  }, []);
  const navigate=useNavigate();

  useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      navigate(-1);
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [navigate]);


  // Remove a property from saved
  const handleUnsave = (id: string) => {
    const updatedIds = getSavedProperties().filter((savedId) => savedId !== id);
    setSavedProperties(updatedIds);
    setSavedProps((prev) => prev.filter((p) => p.id !== id));
  };

  if (savedProps.length === 0) {
    return (
      <Layout>
        <div className="container-main py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">No saved properties</h1>
          <Link to="/search">
            <Button>Browse Properties</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-main py-6">
        <h1 className="text-2xl font-bold mb-6">Saved Properties:  ({number})</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProps.map((property) => (
            <div
              key={property.id}
              className="relative border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* X button to unsave */}
              <button
                onClick={() => handleUnsave(property.id)}
                className="absolute top-2 right-2 p-2 bg-card/80 hover:bg-card rounded-full transition-colors z-10"
              >
                <X className="h-4 w-4 text-red-500" />
              </button>

              {/* Image */}
              <Link to={`/property/${property.id}`}>
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={property.images[0]}
                    alt={property.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              </Link>

              {/* Content */}
              <div className="p-4">
                <h2 className="font-semibold text-lg mb-1">{property.name}</h2>
                <div className="flex items-center gap-2 mb-2">
                  {Array.from({ length: property.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-muted-foreground">
                    ({property.reviewCount})
                  </span>
                </div>
                <div className="text-lg font-bold mb-2">
                  {property.currency === "EUR"
                    ? "€"
                    : property.currency === "GBP"
                    ? "£"
                    : "$"}
                  {property.pricePerNight} / night
                </div>
                <div className="text-sm text-muted-foreground line-clamp-2">
                  {property.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SavedProperties;
