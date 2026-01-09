import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Map, List, SlidersHorizontal, X } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SearchBar from '@/components/search/SearchBar';
import PropertyCard from '@/components/property/PropertyCard';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useLanguage } from '@/contexts/LanguageContext';
import { searchProperties, propertyTypes, amenitiesList } from '@/data/mockData';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { t } = useLanguage();

  // Get query params
  const destination = searchParams.get('destination') || '';
  const typeFromUrl = searchParams.get('type') || '';

  // Scroll to top when destination changes
  useEffect(() => {
    window.scrollTo({ top: 100, behavior: 'smooth' });
  }, [destination]);

  // View & sort
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortBy, setSortBy] = useState('popularity');

  // Filters
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedType, setSelectedType] = useState<string>(typeFromUrl);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Update selectedType if URL changes
  useEffect(() => {
    setSelectedType(typeFromUrl);
  }, [typeFromUrl]);

  // Toggle amenities
  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setPriceRange([0, 2000]);
    setSelectedType('');
    setSelectedAmenities([]);
    setSelectedRating(null);
  };

  // Count active filters
  const activeFiltersCount =
    (priceRange[0] > 0 || priceRange[1] < 2000 ? 1 : 0) +
    (selectedType ? 1 : 0) +
    selectedAmenities.length +
    (selectedRating ? 1 : 0);

  // Filter properties
  const properties = useMemo(() => {
    const typeArray = selectedType ? [selectedType] : undefined;

    let results = searchProperties(destination, {
      priceMin: priceRange[0],
      priceMax: priceRange[1],
      propertyTypes: typeArray,
      amenities: selectedAmenities.length > 0 ? selectedAmenities : undefined,
      rating: selectedRating || undefined,
    });

    // Sort
    switch (sortBy) {
      case 'price-low':
        results.sort((a, b) => a.pricePerNight - b.pricePerNight);
        break;
      case 'price-high':
        results.sort((a, b) => b.pricePerNight - a.pricePerNight);
        break;
      case 'rating':
        results.sort((a, b) => b.reviewScore - a.reviewScore);
        break;
      default:
        break;
    }

    return results;
  }, [destination, priceRange, selectedType, selectedAmenities, selectedRating, sortBy]);

  // Filters panel
  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Price */}
      <div>
        <h3 className="font-semibold mb-4">{t.search.priceRange}</h3>
        <Slider value={priceRange} min={0} max={2000} step={10} onValueChange={setPriceRange} className="mb-2" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}+</span>
        </div>
      </div>

      {/* Property Types */}
      <div>
        <h3 className="font-semibold mb-4">{t.search.propertyType}</h3>
        <div className="space-y-2">
          {/* All types */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="propertyType"
              value=""
              checked={selectedType === ''}
              onChange={() => setSelectedType('')}
              className="h-4 w-4 text-primary"
            />
            <span className="text-sm">{t.search.allTypes || 'All Types'}</span>
          </label>

          {/* Individual types */}
          {propertyTypes.map((type) => (
            <label key={type.id} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="propertyType"
                value={type.id}
                checked={selectedType === type.id}
                onChange={() => setSelectedType(type.id)}
                className="h-4 w-4 text-primary"
              />
              <span className="text-sm">{type.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Guest Rating */}
      <div>
        <h3 className="font-semibold mb-4">{t.search.guestRating}</h3>
        <div className="flex flex-wrap gap-2">
          {[9, 8, 7].map((rating) => (
            <button
              key={rating}
              onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
              className={`filter-chip ${selectedRating === rating ? 'filter-chip-active' : ''}`}
            >
              {rating}+ {rating >= 9 ? t.search.excellent : rating >= 8 ? t.search.veryGood : t.search.good}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="font-semibold mb-4">{t.search.amenities}</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {amenitiesList.slice(0, 10).map((amenity) => (
            <label key={amenity} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={selectedAmenities.includes(amenity)}
                onCheckedChange={() => toggleAmenity(amenity)}
              />
              <span className="text-sm">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          <X className="h-4 w-4 mr-2" />
          {t.common.clear} ({activeFiltersCount})
        </Button>
      )}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{destination ? `Properties in ${destination}` : 'Search Properties'} | Reservo</title>
        <meta
          name="description"
          content={`Find and book ${properties.length} properties ${destination ? `in ${destination}` : ''}. Compare prices, read reviews, and book with confidence.`}
        />
      </Helmet>

      <Layout>
        {/* Search Bar */}
        <div className="bg-primary py-4">
          <div className="container-main">
            <SearchBar variant="compact" initialDestination={destination} />
          </div>
        </div>

        <div className="container-main py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-20 bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-lg">{t.search.filters}</h2>
                  {activeFiltersCount > 0 && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </div>
                <FiltersContent />
              </div>
            </aside>

            {/* Main */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-xl font-bold">
                    {destination ? `${t.search.resultsFor} ${destination}` : t.nav.properties}
                  </h1>
                  <p className="text-muted-foreground">
                    {properties.length} {t.search.properties}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Mobile filters */}
                  <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                    <SheetTrigger asChild className="lg:hidden">
                      <Button variant="outline" size="sm">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        {t.search.filters}
                        {activeFiltersCount > 0 && (
                          <span className="ml-2 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                            {activeFiltersCount}
                          </span>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px]">
                      <SheetHeader>
                        <SheetTitle>{t.search.filters}</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FiltersContent />
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={t.search.sortBy} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">{t.search.popularity}</SelectItem>
                      <SelectItem value="price-low">{t.search.priceLowest}</SelectItem>
                      <SelectItem value="price-high">{t.search.priceHighest}</SelectItem>
                      <SelectItem value="rating">{t.search.rating}</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View toggle */}
                  <div className="hidden sm:flex items-center border border-border rounded-md">
                    <Button
                      variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                      size="icon"
                      className="h-9 w-9 rounded-r-none"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                      size="icon"
                      className="h-9 w-9 rounded-l-none"
                      onClick={() => setViewMode('grid')}
                    >
                      <Map className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Results */}
              {properties.length > 0 ? (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'
                      : 'space-y-4'
                  }
                >
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} variant={viewMode} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">{t.common.noResults}</p>
                  <Button variant="outline" onClick={clearFilters} className="mt-4">
                    {t.common.clear} {t.search.filters}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Search;
