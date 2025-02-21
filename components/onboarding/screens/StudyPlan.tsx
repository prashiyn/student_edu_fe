'use client';

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { 
  HiOutlineCalendarDays, 
  HiOutlineChartBar, 
  HiOutlineClipboardDocument 
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";

interface StudyPlanProps {
  onNext: () => void;
}

export default function StudyPlan({ onNext }: StudyPlanProps) {
  const t = useTranslations('onboarding.study_plan');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const features = [
    {
      key: 'daily',
      icon: <HiOutlineCalendarDays className="h-5 w-5" />,
    },
    {
      key: 'weekly',
      icon: <HiOutlineChartBar className="h-5 w-5" />,
    },
    {
      key: 'tests',
      icon: <HiOutlineClipboardDocument className="h-5 w-5" />,
    }
  ];

  return (
    <motion.div
      className="flex flex-col h-full"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="flex-1 space-y-6">
        <motion.div variants={item}>
          <h2 className="text-2xl font-bold tracking-tight">{t('title')}</h2>
          <p className="text-muted-foreground">{t('subtitle')}</p>
        </motion.div>

        <motion.div 
          variants={item} 
          className="grid gap-4"
        >
          {features.map(({ key, icon }) => (
            <Card key={key} className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background">
                  {icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">
                    {t(`features.${key}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(`features.${key}.description`)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>
      </div>

      <motion.div variants={item} className="pt-6">
        <Button onClick={onNext} className="w-full">
          {t('button')}
        </Button>
      </motion.div>
    </motion.div>
  );
} 