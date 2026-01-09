import React from 'react';
import { Shield, Clock, CreditCard, Headphones } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const benefits = [
  { icon: Shield, title: 'Secure Booking', description: 'Your data is protected with advanced encryption' },
  { icon: Clock, title: '24/7 Support', description: 'We’re here to help anytime, anywhere' },
  { icon: CreditCard, title: 'Best Price Guarantee', description: 'Find a lower price? We’ll match it' },
  { icon: Headphones, title: 'Free Cancellation', description: 'Flexible booking on most properties' },
];

const WhyBookWithUs: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-primary text-primary-foreground py-12 md:py-16">
      <div className="container-main">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          {t.home.whyBookWithUs}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-primary-foreground/5"
            >
              <b.icon className="h-12 w-12 text-accent mb-4" />
              <h3 className="font-semibold text-lg mb-2">{b.title}</h3>
              <p className="text-sm text-primary-foreground/70">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBookWithUs;
