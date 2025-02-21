'use client';

import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Laptop, Brain, Zap, Trophy } from "lucide-react";
import { Statistics } from "@/components/home/statistics";

export function Hero() {
  const t = useTranslations('home');
  const { theme } = useTheme();

  const featureCards = [
    {
      icon: <Laptop className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: t('hero.cards.0.title'),
      position: "sm:right-[50%] sm:top-[12%] sm:w-[40%] sm:aspect-[5/3]",
      mobilePosition: "top-0 left-0",
      delay: 0.1,
    },
    {
      icon: <Brain className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: t('hero.cards.1.title'),
      position: "sm:right-[50%] sm:top-[36%] sm:w-[40%] sm:aspect-[5/6]",
      mobilePosition: "top-0 right-0",
      delay: 0.2,
    },
    {
      icon: <Zap className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: t('hero.cards.2.title'),
      position: "sm:bottom-[36%] sm:left-[54%] sm:w-[40%] sm:aspect-[5/6]",
      mobilePosition: "bottom-0 left-0",
      delay: 0.3,
    },
    {
      icon: <Trophy className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: t('hero.cards.3.title'),
      position: "sm:bottom-[12%] sm:left-[54%] sm:w-[40%] sm:aspect-[5/3",
      mobilePosition: "bottom-0 right-0",
      delay: 0.4,
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-16">

        <div className="grid grid-cols-1 items-center gap-x-16 lg:grid-cols-2">
          <div className="relative z-10 max-w-[640px] space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                {t('hero.title')}
              </h1>
              <h1 className="text-primary text-2xl font-bold tracking-tight sm:text-4xl">{t('hero.title2')}</h1>
            </motion.div>
            <motion.p
              className="text-lg leading-8 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t('hero.subtitle')}
            </motion.p>
            <div className="mt-96">
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link href="/dashboard/signin">
                  <Button size="lg" className="rounded-full">
                    {t('hero.cta.primary')}
                  </Button>
                </Link>
                <Link href="https://github.com/yourusername/yourrepo" target="_blank">
                  <Button variant="outline" size="lg" className="rounded-full">
                    {t('hero.cta.secondary')}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
          <div className="relative mt-16 lg:mt-0 lg:-translate-y-12">
            <div className="grid grid-cols-2 gap-4 sm:aspect-[7/8] sm:block sm:h-full sm:w-full">
              {featureCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: card.delay }}
                  className={cn(
                    "flex flex-col items-center justify-center",
                    "rounded-lg border border-border",
                    "bg-background/50 backdrop-blur-sm",
                    "hover:bg-accent/50 transition-all duration-200",
                    "group cursor-pointer p-3 sm:p-4",
                    "relative sm:absolute w-full h-32 sm:h-auto",
                    card.position,
                    card.mobilePosition
                  )}
                >
                  <span className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-primary/20 group-hover:scale-110 transition-transform duration-200">
                    {card.icon}
                  </span>
                  <p className="mt-2 text-xs sm:text-sm font-medium text-center px-1 sm:px-2">
                    {card.title}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <Statistics />

        {/* Redesigned animated background */}
        <div className="absolute inset-0 -z-10">
          {/* Background base */}
          <div className={cn(
            "absolute inset-0",
            "bg-background transition-colors duration-300"
          )} />

          {/* Primary gradient blob */}
          <motion.div
            className={cn(
              "absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full",
              "bg-gradient-to-br from-primary/20 via-purple-500/10 to-transparent",
              "dark:from-primary/5 dark:via-purple-500/5 dark:to-transparent",
              "blur-3xl opacity-60 dark:opacity-40"
            )}
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 20, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Secondary gradient blob */}
          <motion.div
            className={cn(
              "absolute right-1/4 top-1/3 h-[500px] w-[500px] rounded-full",
              "bg-gradient-to-bl from-blue-500/20 via-primary/10 to-transparent",
              "dark:from-blue-500/5 dark:via-primary/5 dark:to-transparent",
              "blur-3xl opacity-60 dark:opacity-40"
            )}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, -30, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />

          {/* Accent highlights */}
          <motion.div
            className={cn(
              "absolute left-1/3 top-1/2 h-[300px] w-[300px] rounded-full",
              "bg-gradient-to-r from-primary/30 to-transparent",
              "dark:from-primary/10 dark:to-transparent",
              "blur-2xl opacity-40 dark:opacity-20"
            )}
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />

          {/* Gradient overlay for smooth transitions */}
          <div className={cn(
            "absolute inset-0",
            "bg-gradient-to-b from-background via-transparent to-background",
            "dark:from-background/90 dark:via-background/50 dark:to-background",
            "transition-colors duration-300"
          )} />
        </div>
      </div>
    </div>
  );
} 