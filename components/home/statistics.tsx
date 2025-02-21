'use client';

import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import { Users, GraduationCap, Globe2, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Statistics() {
  const t = useTranslations('home');

  const stats = [
    {
      icon: <GraduationCap className="h-5 w-5" />,
      value: "500K+",
      label: t('statistics.tests'),
      delay: 0.1,
    },
    {
      icon: <Users className="h-5 w-5" />,
      value: "50K+",
      label: t('statistics.students'),
      delay: 0.2,
    },
    {
      icon: <Globe2 className="h-5 w-5" />,
      value: "120+",
      label: t('statistics.countries'),
      delay: 0.3,
    },
    {
      icon: <Star className="h-5 w-5" />,
      value: "4.9",
      label: t('statistics.rating'),
      delay: 0.4,
    },
  ];

  return (
    <div className="mx-auto mt-8 max-w-7xl px-6 lg:px-8">
      <dl className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: stat.delay }}
            className="flex flex-col gap-3"
          >
            <div className={cn(
              "flex size-12 items-center justify-center rounded-lg",
              "bg-primary/10 text-primary dark:bg-primary/20"
            )}>
              {stat.icon}
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="text-2xl font-semibold tracking-tight md:text-3xl">
                {stat.value}
              </dd>
            </div>
          </motion.div>
        ))}
      </dl>
    </div>
  );
} 