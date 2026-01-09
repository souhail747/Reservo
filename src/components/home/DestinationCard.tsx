import React from 'react';
import { Link } from 'react-router-dom';
import { Destination } from '@/data/mockData';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <Link
      to={`/search?destination=${encodeURIComponent(destination.name)}`}
      className="group relative overflow-hidden rounded-lg aspect-[4/3] block"
    >
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-primary-foreground">
        <h3 className="font-bold text-xl">{destination.name}</h3>
        <p className="text-sm opacity-90">{destination.propertyCount.toLocaleString()} properties</p>
      </div>
    </Link>
  );
};

export default DestinationCard;
