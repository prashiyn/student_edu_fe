'use client';

import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import { cn } from "@/lib/utils";

export function Testimonials() {
  const t = useTranslations('home');

  const testimonials = [
    {
      name: t('testimonials.cards.0.name'),
      role: t('testimonials.cards.0.role'),
      quote: t('testimonials.cards.0.quote'),
      image: t('testimonials.cards.0.image'),
      height: 'h-[350px] lg:h-[400px]',
    },
    {
      name: t('testimonials.cards.1.name'),
      role: t('testimonials.cards.1.role'),
      quote: t('testimonials.cards.1.quote'),
      image: t('testimonials.cards.1.image'),
      height: 'h-[300px] lg:h-[350px]',
    },
    {
      name: t('testimonials.cards.2.name'),
      role: t('testimonials.cards.2.role'),
      quote: t('testimonials.cards.2.quote'),
      image: t('testimonials.cards.2.image'),
      height: 'h-[300px] lg:h-[350px]',
    },
    {
      name: t('testimonials.cards.3.name'),
      role: t('testimonials.cards.3.role'),
      quote: t('testimonials.cards.3.quote'),
      image: t('testimonials.cards.3.image'),
      height: 'h-[350px] lg:h-[400px]',
    },
    {
      name: t('testimonials.cards.4.name'),
      role: t('testimonials.cards.4.role'),
      quote: t('testimonials.cards.4.quote'),
      image: t('testimonials.cards.4.image'),
      height: 'h-[300px] lg:h-[350px]',
    },
    {
      name: t('testimonials.cards.5.name'),
      role: t('testimonials.cards.5.role'),
      quote: t('testimonials.cards.5.quote'),
      image: t('testimonials.cards.5.image'),
      height: 'h-[350px] lg:h-[400px]',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="container max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={cn(
                "group relative overflow-hidden rounded-2xl border",
                "bg-card transition-all duration-300",
                "dark:border-border",
                testimonial.height
              )}
            >
              <div className="absolute inset-0">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className={cn(
                  "absolute inset-0",
                  "bg-gradient-to-t from-background/95 via-background/50 to-transparent",
                  "dark:from-background/98 dark:via-background/50 dark:to-transparent",
                  "transition-colors duration-300"
                )} />
              </div>
              
              <div className="absolute bottom-0 p-6 transition-transform duration-300">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <blockquote className={cn(
                    "text-lg font-medium mb-4",
                    "text-foreground",
                    "transition-colors duration-300"
                  )}>
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <p className={cn(
                      "text-lg font-semibold",
                      "text-foreground",
                      "transition-colors duration-300"
                    )}>
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-primary">
                      {testimonial.role}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 