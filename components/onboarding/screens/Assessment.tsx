'use client';

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { 
  HiOutlineBookOpen,
  HiOutlineCalculator,
  HiOutlineCheckCircle
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";

interface AssessmentProps {
  onNext: () => void;
}

export default function Assessment({ onNext }: AssessmentProps) {
  const t = useTranslations('onboarding.assessment');

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

  const sections = [
    {
      key: 'reading',
      icon: <HiOutlineBookOpen className="h-5 w-5" />
    },
    {
      key: 'math',
      icon: <HiOutlineCalculator className="h-5 w-5" />
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

        <motion.div variants={item}>
          <Card className="p-6">
            <h3 className="mb-4 font-semibold flex items-center gap-2">
              <HiOutlineCheckCircle className="h-5 w-5 text-primary" />
              {t('sections.title')}
            </h3>
            <div className="space-y-4">
              {sections.map(({ key, icon }) => (
                <div key={key} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border bg-background">
                    {icon}
                  </div>
                  <span className="text-sm">
                    {t(`sections.${key}`)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
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