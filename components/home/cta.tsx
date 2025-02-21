'use client';

import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Cta() {
  const t = useTranslations('home');

  return (
    <section className="py-16 sm:py-16 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex w-full flex-col gap-8 overflow-hidden rounded-2xl border bg-card p-8 md:rounded-3xl lg:flex-row lg:items-center lg:p-12"
        >
          <div className="flex-1">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
              {t('cta.title')}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t('cta.description')}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/signin">
              <Button variant="outline" className="w-full sm:w-auto">
                {t('cta.buttons.secondary')}
              </Button>
            </Link>
            <Link href="/dashboard/signup">
              <Button className="w-full sm:w-auto">
                {t('cta.buttons.primary')}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
