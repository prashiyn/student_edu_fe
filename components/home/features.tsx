'use client';

import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import { HiBolt } from 'react-icons/hi2';
import { BiBrain } from 'react-icons/bi';
import { IoSpeedometerOutline } from 'react-icons/io5';
import { Check } from "lucide-react";

export function Features() {
  const t = useTranslations('home');

  const features = [
    {
      icon: <HiBolt className="h-6 w-6" />,
      title: t('features.cards.0.title'),
      description1: t('features.cards.0.description1'),
      description2: t('features.cards.0.description2'),
    },
    {
      icon: <BiBrain className="h-6 w-6" />,
      title: t('features.cards.1.title'),
      description1: t('features.cards.1.description1'),
      description2: t('features.cards.1.description2'),
    },
    {
      icon: <IoSpeedometerOutline className="h-6 w-6" />,
      title: t('features.cards.2.title'),
      description1: t('features.cards.2.description1'),
      description2: t('features.cards.2.description2'),
    },
  ];

  return (
    <section className="py-16 sm:py-16 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('features.title')}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {t('features.subtitle')}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-2xl border bg-card p-8 transition-colors duration-200 hover:bg-accent dark:border-border"
              >
                <div className="mb-4 inline-block rounded-xl bg-primary/10 p-3 text-primary dark:bg-primary/20">
                  {feature.icon}
                </div>
                <h3 className="mb-4 text-xl font-semibold text-foreground">{feature.title}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">{feature.description1}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">{feature.description2}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 