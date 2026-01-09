import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  MapPin,
  Star,
  Heart,
  Share2,
  Check,
  Wifi,
  Car,
  Waves,
  Dumbbell,
  Utensils,
  Wind,
  ChevronLeft,
  ChevronRight,
  Users,
  Maximize,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import PropertyCard from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { getPropertyById, properties } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { toggleSaveProperty, isPropertySaved } from "@/pages/SavedProperties";

const amenityIcons: Record<string, React.ElementType> = {
  "Free WiFi": Wifi,
  Parking: Car,
  "Swimming Pool": Waves,
  "Fitness Center": Dumbbell,
  Restaurant: Utensils,
  "Air Conditioning": Wind,
};

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const property = getPropertyById(id || "");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isPropertySaved(property.id));
  }, [property.id]);

  const handleSaveClick = () => {
    const newSaved = toggleSaveProperty(property.id);
    setSaved(newSaved.includes(property.id));
  };

  if (!property) {
    return (
      <Layout>
        <div className="container-main py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Property not found</h1>
          <Link to="/search">
            <Button>Back to search</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const similarProperties = properties
    .filter(
      (p) => p.id !== property.id && p.location.city === property.location.city
    )
    .slice(0, 3);

  const getRatingLabel = (score: number) => {
    if (score >= 9) return t.search.excellent;
    if (score >= 8) return t.search.veryGood;
    return t.search.good;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <>
      <Helmet>
        <title>
          {property.name} - {property.location.city} | Reservo
        </title>
        <meta
          name="description"
          content={`Book ${property.name} in ${
            property.location.city
          }. ${property.description.substring(0, 155)}...`}
        />
        <meta property="og:title" content={`${property.name} | Reservo`} />
        <meta property="og:description" content={property.description} />
        <meta property="og:image" content={property.images[0]} />
      </Helmet>

      <Layout>
        <div className="container-main py-6">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              to={`/search?destination=${property.location.city}`}
              className="hover:text-primary"
            >
              {property.location.city}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{property.name}</span>
          </nav>

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="capitalize">
                  {property.type}
                </Badge>
                <div className="flex items-center gap-1">
                  {Array.from({ length: property.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {property.name}
              </h1>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{property.location.address}</span>
                <span className="mx-2">•</span>
                <span>
                  {property.location.distanceFromCenter} km from center
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleSaveClick}>
                <Heart
                  className={`h-4 w-4 mr-2 ${
                    saved ? "text-red-500" : "text-gray-500"
                  }`}
                />
                {saved ? "Saved" : t.property.saveProperty}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                {t.property.share}
              </Button>
              <div className="flex items-center gap-2 ml-4">
                <div className="text-right">
                  <div className="font-semibold">
                    {getRatingLabel(property.reviewScore)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {property.reviewCount} {t.search.reviews}
                  </div>
                </div>
                <div className="bg-primary text-primary-foreground font-bold text-lg px-3 py-2 rounded">
                  {property.reviewScore.toFixed(1)}
                </div>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="relative rounded-lg overflow-hidden mb-8">
            <div className="aspect-[16/9] md:aspect-[16/4]">
              <img
                src={property.images[currentImageIndex]}
                alt={property.name}
                className="w-full h-full object-cover"
              />
            </div>
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-card/80 rounded-full hover:bg-card transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-card/80 rounded-full hover:bg-card transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-colors",
                        index === currentImageIndex
                          ? "bg-primary"
                          : "bg-card/60"
                      )}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start mb-6 overflow-x-auto">
                  <TabsTrigger value="overview">
                    {t.property.overview}
                  </TabsTrigger>
                  <TabsTrigger value="rooms">{t.property.rooms}</TabsTrigger>
                  <TabsTrigger value="facilities">
                    {t.property.facilities}
                  </TabsTrigger>
                  <TabsTrigger value="reviews">
                    {t.property.reviews}
                  </TabsTrigger>
                  <TabsTrigger value="policies">
                    {t.property.policies}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      {t.property.description}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {property.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Top amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {property.amenities.slice(0, 6).map((amenity) => {
                        const Icon = amenityIcons[amenity] || Check;
                        return (
                          <div
                            key={amenity}
                            className="flex items-center gap-2"
                          >
                            <Icon className="h-5 w-5 text-primary" />
                            <span className="text-sm">{amenity}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="rooms" className="space-y-4">
                  <h2 className="text-xl font-semibold">
                    {t.property.selectRooms}
                  </h2>
                  {property.rooms.map((room) => (
                    <div
                      key={room.id}
                      className="border border-border rounded-lg p-4 flex flex-col md:flex-row gap-4"
                    >
                      <div className="md:w-48 flex-shrink-0">
                        <img
                          src={room.images[0]}
                          alt={room.name}
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{room.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {room.maxGuests} guests
                          </span>
                          <span className="flex items-center gap-1">
                            <Maximize className="h-4 w-4" />
                            {room.size} m²
                          </span>
                          <span>{room.bedType}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {room.amenities.slice(0, 4).map((amenity) => (
                            <Badge
                              key={amenity}
                              variant="secondary"
                              className="text-xs"
                            >
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="md:text-right flex flex-row md:flex-col items-center md:items-end justify-between">
                        <div>
                          <div className="text-2xl font-bold">
                            ${room.pricePerNight}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {t.search.perNight}
                          </div>
                        </div>
                        <Button className="bg-accent text-accent-foreground hover:bg-accent/90 mt-2">
                          {t.property.reserve}
                        </Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="facilities" className="space-y-4">
                  <h2 className="text-xl font-semibold">
                    {t.property.facilities}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity) => {
                      const Icon = amenityIcons[amenity] || Check;
                      return (
                        <div
                          key={amenity}
                          className="flex items-center gap-2 p-3 bg-secondary rounded-md"
                        >
                          <Icon className="h-5 w-5 text-primary" />
                          <span className="text-sm">{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary text-primary-foreground font-bold text-3xl px-4 py-3 rounded">
                      {property.reviewScore.toFixed(1)}
                    </div>
                    <div>
                      <div className="font-semibold text-lg">
                        {getRatingLabel(property.reviewScore)}
                      </div>
                      <div className="text-muted-foreground">
                        {property.reviewCount} {t.search.reviews}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    Reviews will be displayed here. Connect to a database to
                    show real reviews.
                  </p>
                </TabsContent>

                <TabsContent value="policies" className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">
                      {t.property.houseRules}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-secondary rounded-md">
                        <div>
                          <div className="text-sm text-muted-foreground">
                            {t.property.checkInTime}
                          </div>
                          <div className="font-medium">
                            {property.policies.checkIn}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-secondary rounded-md">
                        <div>
                          <div className="text-sm text-muted-foreground">
                            {t.property.checkOutTime}
                          </div>
                          <div className="font-medium">
                            {property.policies.checkOut}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">
                      {t.property.cancellationPolicy}
                    </h3>
                    <p className="text-muted-foreground">
                      {property.policies.cancellation}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">House rules</h3>
                    <ul className="space-y-2">
                      {property.policies.houseRules.map((rule, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Check className="h-4 w-4 text-success" />
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 bg-card border border-border rounded-lg p-6">
                <div className="mb-4">
                  <div className="text-sm text-muted-foreground">
                    Starting from
                  </div>
                  <div className="text-3xl font-bold">
                    {property.currency === "EUR"
                      ? "€"
                      : property.currency === "GBP"
                      ? "£"
                      : "$"}
                    {property.pricePerNight}
                    <span className="text-base font-normal text-muted-foreground">
                      /{t.search.perNight}
                    </span>
                  </div>
                </div>

                {property.features.freeCancellation && (
                  <div className="flex items-center gap-2 text-success text-sm mb-2">
                    <Check className="h-4 w-4" />
                    {t.search.freeCancellation}
                  </div>
                )}
                {property.features.breakfastIncluded && (
                  <div className="flex items-center gap-2 text-success text-sm mb-2">
                    <Check className="h-4 w-4" />
                    {t.search.breakfastIncluded}
                  </div>
                )}
                {property.features.noPrepayment && (
                  <div className="flex items-center gap-2 text-success text-sm mb-4">
                    <Check className="h-4 w-4" />
                    {t.search.noPrepayment}
                  </div>
                )}

                <Button
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                  size="lg"
                >
                  {t.property.reserve}
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-3">
                  You won't be charged yet
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProperties.map((p) => (
              <Link
                to={`/property/${p.id}`} // assuming this route shows the property detail
                key={p.id}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <PropertyCard property={p} variant="grid" />
              </Link>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PropertyDetails;
