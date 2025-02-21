'use client';

import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import { MessageCircle, Lightbulb, ListChecks } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Benefits() {
  const t = useTranslations('home');

  const benefits = [
    {
      icon: <MessageCircle className="size-5" />,
      value: "personalized",
      title: t('benefits.tabs.personalized.title'),
      description: t('benefits.tabs.personalized.description'),
      image: "/images/personalized-learning.webp"
    },
    {
      icon: <Lightbulb className="size-5" />,
      value: "practice",
      title: t('benefits.tabs.practice.title'),
      description: t('benefits.tabs.practice.description'),
      image: "/images/practice-questions.webp"
    },
    {
      icon: <ListChecks className="size-5" />,
      value: "progress",
      title: t('benefits.tabs.progress.title'),
      description: t('benefits.tabs.progress.description'),
      image: "/images/track-progress.webp"
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            {t('benefits.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('benefits.subtitle1')}
          </p>
          <p className="text-primary">
            {t('benefits.subtitle2')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          <Tabs defaultValue={benefits[0].value} className="space-y-8">
            <TabsList className="flex h-auto w-full flex-col gap-4 bg-background sm:flex-row">
              {benefits.map((benefit, index) => (
                <TabsTrigger
                  key={benefit.value}
                  value={benefit.value}
                  className="flex w-full flex-col items-start gap-2 whitespace-normal rounded-xl border p-4 text-left data-[state=active]:border-primary hover:bg-accent/50 transition-colors duration-200 dark:border-border"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-primary/20">
                      {benefit.icon}
                    </span>
                    <h3 className="text-xl font-semibold text-foreground">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </TabsTrigger>
              ))}
            </TabsList>

            {benefits.map((benefit) => (
              <TabsContent key={benefit.value} value={benefit.value}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="overflow-hidden rounded-xl border bg-gradient-to-b from-background to-accent/20">
                    <img
                      src={benefit.image}
                      alt={benefit.title}
                      className="aspect-video w-full object-cover"
                    />
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
