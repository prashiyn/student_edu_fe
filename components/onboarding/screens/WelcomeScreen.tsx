'use client';

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { HiOutlineAcademicCap, HiOutlineChartBar, HiOutlineClock } from "react-icons/hi2";

interface WelcomeScreenProps {
  onNext: () => void;
}

export default function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  const t = useTranslations('onboarding.welcome');
  
  const features = [
    {
      icon: <HiOutlineClock className="h-5 w-5" />,
      text: t('features.simulations')
    },
    {
      icon: <HiOutlineAcademicCap className="h-5 w-5" />,
      text: t('features.practice')
    },
    {
      icon: <HiOutlineChartBar className="h-5 w-5" />,
      text: t('features.feedback')
    }
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t('title')}</h2>
          <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="space-y-4">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background">
                {feature.icon}
              </div>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6">
        <Button onClick={onNext} className="w-full">
          {t('button')}
        </Button>
      </div>
    </div>
  );
} 