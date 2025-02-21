'use client';

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { HiOutlineCalendar, HiOutlineBookOpen } from "react-icons/hi2";
import { useState } from "react";

interface PlanSetupProps {
  onNext: () => void;
  onPreferenceUpdate: (key: string, value: string) => void;
  preferences: {
    testDate: string;
    focusArea: string;
  };
}

export default function PlanSetup({ 
  onNext, 
  onPreferenceUpdate,
  preferences 
}: PlanSetupProps) {
  const t = useTranslations('onboarding.plan_setup');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

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
          <Label className="mb-3 block font-medium">
            {t('test_date.label')}
          </Label>
          <RadioGroup
            value={preferences.testDate}
            onValueChange={(value) => onPreferenceUpdate('testDate', value)}
            className="grid gap-2"
          >
            {Object.entries(t.raw('test_date.options')).map(([key, value]) => (
              <Label
                key={key}
                className="flex cursor-pointer items-center rounded-lg border p-4 hover:bg-muted"
              >
                <RadioGroupItem value={key} className="mr-3" />
                {value as string}
              </Label>
            ))}
          </RadioGroup>
        </motion.div>

        <motion.div variants={item}>
          <Label className="mb-3 block font-medium">
            {t('focus.label')}
          </Label>
          <RadioGroup
            value={preferences.focusArea}
            onValueChange={(value) => onPreferenceUpdate('focusArea', value)}
            className="grid gap-2"
          >
            {Object.entries(t.raw('focus.options')).map(([key, value]) => (
              <Label
                key={key}
                className="flex cursor-pointer items-center rounded-lg border p-4 hover:bg-muted"
              >
                <RadioGroupItem value={key} className="mr-3" />
                {value as string}
              </Label>
            ))}
          </RadioGroup>
        </motion.div>
      </div>

      <motion.div variants={item} className="pt-6">
        <Button 
          onClick={onNext} 
          className="w-full"
          disabled={!preferences.testDate || !preferences.focusArea}
        >
          {t('button')}
        </Button>
      </motion.div>
    </motion.div>
  );
} 