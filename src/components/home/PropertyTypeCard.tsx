import React from 'react';
import { Link } from 'react-router-dom';

interface PropertyTypeCardProps {
  id: string;
  name: string;
  icon: string;
  count: number;
}

const PropertyTypeCard: React.FC<PropertyTypeCardProps> = ({ id, name, icon, count }) => {
  return (
    <Link
      to={`/search?type=${id}`}
      className="flex flex-col items-center p-6 bg-card border border-border rounded-lg hover:shadow-card-hover hover:border-primary/20 transition-all group"
    >
      <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{icon}</span>
      <h3 className="font-semibold text-foreground">{name}</h3>
      <p className="text-sm text-muted-foreground">{count.toLocaleString()} properties</p>
    </Link>
  );
};

export default PropertyTypeCard;
