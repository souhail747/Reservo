import React from 'react';
import DestinationCard from '@/components/home/DestinationCard';
import { destinations } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';

const PopularDestinations: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="container-main bg-blue-200 py-12 md:py-6">
      <h2 className="text-2xl md:text-2xl font-bold mb-8">
        {t.home.popularDestinations}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {destinations.map(destination => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </section>
  );
};

export default PopularDestinations;
  