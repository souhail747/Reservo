import React from 'react';
import PropertyCard from '@/components/property/PropertyCard';
import { properties } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';

const TrendingProperties: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="container-main py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">
        {t.home.trendingProperties}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.slice(0, 4).map(property => (
          <PropertyCard key={property.id} property={property} variant="grid" />
        ))}
      </div>
    </section>
  );
};

export default TrendingProperties;
