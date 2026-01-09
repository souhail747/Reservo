import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, Heart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/data/mockData";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { toggleSaveProperty, isPropertySaved } from "@/pages/SavedProperties";

interface PropertyCardProps {
  property: Property;
  variant?: "grid" | "list";
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  variant = "grid",
}) => {
  const { t } = useLanguage();
  const [saved, setSaved] = useState(false);

  const getRatingLabel = (score: number) => {
    if (score >= 9) return t.search.excellent;
    if (score >= 8) return t.search.veryGood;
    return t.search.good;
  };

  const getRatingClass = (score: number) => {
    if (score >= 9) return "bg-primary text-primary-foreground";
    if (score >= 8) return "bg-info text-info-foreground";
    return "bg-success text-success-foreground";
  };
  useEffect(() => {
    setSaved(isPropertySaved(property.id));
  }, [property.id]);

  const handleSaveClick = () => {
    const newSaved = toggleSaveProperty(property.id);
    setSaved(newSaved.includes(property.id));
  };

  if (variant === "list") {
    return (
      <div className="card-property flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative sm:w-64 flex-shrink-0">
          <Link to={`/property/${property.id}`}>
            <img
              src={property.images[0]}
              alt={property.name}
              className="w-full h-48 sm:h-full object-cover"
            />
          </Link>
         <button
      onClick={handleSaveClick}
      className={`absolute top-3 right-3 p-2 rounded-full transition-colors border ${
        saved
          ? "bg-primary text-white border-primary hover:bg-primary/80"
          : "bg-card/80 text-foreground border-border hover:bg-card"
      }`}
      title={saved ? "Saved" : "Save Property"}
    >
      <Heart className={`h-5 w-5 ${saved ? "fill-white" : ""}`} />
    </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Link to={`/property/${property.id}`}>
                  <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                    {property.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {property.location.city}, {property.location.country}
                  </span>
                  <span className="mx-1">•</span>
                  <span>
                    {property.location.distanceFromCenter} km from center
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {getRatingLabel(property.reviewScore)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {property.reviewCount} {t.search.reviews}
                  </div>
                </div>
                <div
                  className={cn(
                    "rating-badge",
                    getRatingClass(property.reviewScore)
                  )}
                >
                  {property.reviewScore.toFixed(1)}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mt-3">
              {property.features.freeCancellation && (
                <span className="flex items-center gap-1 text-sm text-success">
                  <Check className="h-4 w-4" />
                  {t.search.freeCancellation}
                </span>
              )}
              {property.features.breakfastIncluded && (
                <span className="flex items-center gap-1 text-sm text-success">
                  <Check className="h-4 w-4" />
                  {t.search.breakfastIncluded}
                </span>
              )}
              {property.features.noPrepayment && (
                <span className="flex items-center gap-1 text-sm text-success">
                  <Check className="h-4 w-4" />
                  {t.search.noPrepayment}
                </span>
              )}
            </div>
          </div>

          {/* Price & CTA */}
          <div className="flex items-end justify-between mt-4 pt-4 border-t border-border">
            <div>
              <div className="text-sm text-muted-foreground">
                1 night, {property.rooms[0]?.maxGuests || 2} guests
              </div>
              <div className="price-tag">
                {property.currency === "EUR"
                  ? "€"
                  : property.currency === "GBP"
                  ? "£"
                  : "$"}
                {property.pricePerNight}
              </div>
            </div>
            <Button
              asChild
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link to={`/property/${property.id}`}>{t.search.showPrices}</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-property group">
      {/* Image */}
      <div className="relative overflow-hidden">
        <Link to={`/property/${property.id}`}>
          <img
            src={property.images[0]}
            alt={property.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <button
      onClick={handleSaveClick}
      className={`absolute top-3 right-3 p-2 rounded-full transition-colors border ${
        saved
          ? "bg-primary text-white border-primary hover:bg-primary/80"
          : "bg-card/80 text-foreground border-border hover:bg-card"
      }`}
      title={saved ? "Saved" : "Save Property"}
    >
      <Heart className={`h-5 w-5 ${saved ? "fill-white" : ""}`} />
    </button>
        {!property.features.freeCancellation && (
          <Badge className="deal-badge absolute top-3 left-3">
            Limited offer
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <Link to={`/property/${property.id}`}>
              <h3 className="font-semibold truncate hover:text-primary transition-colors">
                {property.name}
              </h3>
            </Link>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{property.location.city}</span>
            </div>
          </div>
          <div
            className={cn(
              "rating-badge flex-shrink-0",
              getRatingClass(property.reviewScore)
            )}
          >
            {property.reviewScore.toFixed(1)}
          </div>
        </div>

        {/* Rating Stars */}
        <div className="flex items-center gap-1 mt-2">
          {Array.from({ length: property.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-accent text-accent" />
          ))}
          <span className="text-xs text-muted-foreground ml-1">
            ({property.reviewCount})
          </span>
        </div>

        {/* Features */}
        {property.features.freeCancellation && (
          <div className="flex items-center gap-1 text-xs text-success mt-2">
            <Check className="h-3 w-3" />
            {t.search.freeCancellation}
          </div>
        )}

        {/* Price */}
        <div className="mt-4 pt-3 border-t border-border">
          <div className="text-xs text-muted-foreground">
            {t.search.perNight}
          </div>
          <div className="text-xl font-bold">
            {property.currency === "EUR"
              ? "€"
              : property.currency === "GBP"
              ? "£"
              : "$"}
            {property.pricePerNight}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
