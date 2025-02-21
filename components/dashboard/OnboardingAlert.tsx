'use client';

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { HiOutlineInformationCircle } from "react-icons/hi2";
import OnboardingModal from '@/components/onboarding/OnboardingModal';

export default function OnboardingAlert() {
  const t = useTranslations('dashboard.onboarding');
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Alert className="mb-4 border-primary/20 bg-primary/5 dark:border-primary/20 dark:bg-primary/10">
        <AlertDescription className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-primary dark:text-primary">
            <HiOutlineInformationCircle className="h-5 w-5" />
            {t('alert.message')}
          </span>
          <Button 
            variant="outline"
            className="border-primary/20 hover:bg-primary/10 dark:border-primary/30 dark:hover:bg-primary/20"
            onClick={() => setShowModal(true)}
          >
            {t('alert.button')}
          </Button>
        </AlertDescription>
      </Alert>

      <OnboardingModal 
        open={showModal} 
        onOpenChange={setShowModal} 
      />
    </>
  );
} 