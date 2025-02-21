'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductWithPrice } from "@/types/types";
import { HiCheck } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';

interface PricingCardsProps {
  products: ProductWithPrice[] | null;
}

export default function PricingCards({ products }: PricingCardsProps) {
  const router = useRouter();
  const t = useTranslations('pricing.card');

  if (!products) return null;

  const getRecommendedTag = (productId: string) => {
    return productId === 'prod_basic';
  };

  return (
    <div className="grid gap-6 lg:grid-cols-4 lg:gap-8">
      {products.map((product) => {
        const price = product.prices?.[0];
        const isRecommended = getRecommendedTag(product.id);
        
        return (
          <Card 
            key={product.id}
            className={`relative flex flex-col p-6 ${
              isRecommended ? 'border-primary shadow-lg' : ''
            }`}
          >
            {isRecommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center rounded-full bg-primary px-3 py-0.5 text-sm font-medium text-primary-foreground">
                  {t('most_popular')}
                </span>
              </div>
            )}
            
            <div className="mb-5">
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.description}</p>
            </div>

            <div className="mb-5">
              <span className="text-3xl font-bold">
                ${price?.unit_amount ? price.unit_amount / 100 : 0}
              </span>
              {price?.interval && (
                <span className="text-muted-foreground">
                  {t('per')} {price.interval}
                </span>
              )}
            </div>

            <div className="mb-8 space-y-2">
              {product.metadata?.features?.map((feature: string) => (
                <div key={feature} className="flex items-center gap-2">
                  <HiCheck className="h-5 w-5 text-primary" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              onClick={() => router.push('/signup')}
              className="mt-auto"
              variant={isRecommended ? "default" : "outline"}
            >
              {t('cta')}
            </Button>
          </Card>
        );
      })}
    </div>
  );
} 