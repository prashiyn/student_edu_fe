'use client';

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import WelcomeScreen from "./screens/WelcomeScreen";
import PlanSetup from "./screens/PlanSetup";
import StudyPlan from "./screens/StudyPlan";
import Assessment from "./screens/Assessment";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HiOutlineChevronLeft } from "react-icons/hi2";
import { useTranslations } from "next-intl";
import { updateTestPreferences } from '@/utils/actions/preferences';

interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface TestPreferences {
  testDate: string;
  focusArea: string;
}

export default function OnboardingModal({ open, onOpenChange }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<TestPreferences>({
    testDate: '',
    focusArea: ''
  });
  const t = useTranslations('onboarding');

  const handlePreferenceUpdate = (key: keyof TestPreferences, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleComplete = async () => {
    try {
      await updateTestPreferences(preferences);
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to update preferences:', error);
      // Handle error (maybe show toast)
    }
  };

  const screens = {
    1: WelcomeScreen,
    2: PlanSetup,
    3: StudyPlan,
    4: Assessment
  };

  const CurrentScreen = screens[step as keyof typeof screens];

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] p-0 gap-0">
        <DialogTitle/>
        <div className="grid lg:grid-cols-2 h-[80vh] max-h-[700px] min-h-[500px]">
          <div className="flex flex-col p-6">
            {step > 1 && (
              <Button
                variant="ghost"
                size="sm"
                className="self-start mb-4"
                onClick={handleBack}
              >
                <HiOutlineChevronLeft className="mr-2 h-4 w-4" />
                {t('back')}
              </Button>
            )}
            <div className="flex-1 overflow-y-auto">
              <CurrentScreen 
                onNext={() => {
                  if (step === 4) {
                    handleComplete();
                  } else {
                    setStep(prev => prev + 1);
                  }
                }}
                onPreferenceUpdate={handlePreferenceUpdate}
                preferences={preferences}
              />
            </div>
          </div>
          <div className={cn(
            "hidden lg:block bg-muted rounded-r-lg",
            "bg-[url('/onboarding/step-" + step + ".png')] bg-cover bg-center bg-no-repeat"
          )} />
        </div>
      </DialogContent>
    </Dialog>
  );
} 