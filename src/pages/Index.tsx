import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

import HomeHero from '@/components/home/Hero';
import PopularDestinations from '@/components/home/PopularDestinations';
import BrowseByType from '@/components/home/BrowseByType';
import TrendingProperties from '@/components/home/TrendingProperties';
import WhyBookWithUs from '@/components/home/WhyBookWithUs';

const Index: React.FC = () => {
  const { language } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Reservo | Find Your Perfect Accommodation</title>
        <meta name="description" content="Search and book the best accommodations worldwide." />
        <link rel="canonical" href={`https://stayfinder.com/${language}`} />
      </Helmet>

      <Layout>
        <HomeHero />
        <PopularDestinations />
        <BrowseByType />
        <TrendingProperties />
        <WhyBookWithUs />
      </Layout>
    </>
  );
};

export default Index;
