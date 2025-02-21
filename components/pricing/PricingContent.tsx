'use client';

import { useTranslations } from 'next-intl';
import PricingCards from './PricingCards';
import { ProductWithPrice } from '@/types/types';

interface PricingContentProps {
  products: ProductWithPrice[] | null;
}

export default function PricingContent({ products }: PricingContentProps) {
  const t = useTranslations('pricing');

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-10">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t('title')}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {t('subtitle')}
        </p>
      </div>
      <PricingCards products={products} />
    </div>
  );
} 