import React from 'react';
import PropertyTypeCard from '@/components/home/PropertyTypeCard';
import { propertyTypes } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';

const BrowseByType: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-secondary/50 py-12 md:py-16">
      <div  className="container-main">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          {t.home.browseByType}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {propertyTypes.map(type => (
            <PropertyTypeCard key={type.id} {...type} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByType;
