import React from 'react';
import SearchBar from '@/components/search/SearchBar';
import { useLanguage } from '@/contexts/LanguageContext';

const HomeHero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen bg-gray-900 text-primary-foreground">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80')] bg-cover bg-center opacity-20" />
      <div className="relative container-main py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t.home.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80">
            {t.home.heroSubtitle}
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <SearchBar variant="hero" />
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
