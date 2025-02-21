/*eslint-disable*/
'use client';

import MainChart from '@/components/dashboard/main/cards/MainChart';
import MainDashboardTable from '@/components/dashboard/main/cards/MainDashboardTable';
import DashboardLayout from '@/components/layout';
import tableDataUserReports from '@/variables/tableDataUserReports';
import { User } from '@supabase/supabase-js';
import OnboardingAlert from '../OnboardingAlert';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import OnboardingModal from '@/components/onboarding/OnboardingModal';
import config from '@/config/config';
import UpgradeCard from '@/components/pricing/UpgradeCard';
interface Props {
  user: User | null | undefined;
  userDetails: { [x: string]: any } | null | any;
  subscription: any;
}

export default function Main(props: Props) {
  const t = useTranslations('dashboard');
  const { user, userDetails, subscription } = props;
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  useEffect(() => {
    if (user?.user_metadata?.firstTimeSignUp) {
      setShowOnboarding(true);
    }
  }, [user]);

  const needsOnboarding = user?.user_metadata?.firstTimeSignUp || 
                         !user?.user_metadata?.onboardingComplete;
  const isFreePlan = subscription?.price_id === config.freePlan;
  return (
    <DashboardLayout
      user={props.user}
      userDetails={props.userDetails}
      title={t('title')}
      description={t('description')}
    >
      <div className="h-full w-full">
        <div className="mx-auto max-w-4xl w-full px-4 sm:px-6 lg:px-8">
          {needsOnboarding && <OnboardingAlert />}
          {!needsOnboarding && isFreePlan && <UpgradeCard />}
        </div>
        <div className="mb-5 flex gap-5 flex-col xl:flex-row w-full">
          <MainChart />
        </div>
        {/* Conversion and talbes*/}
        <div className="h-full w-full rounded-lg ">
          <MainDashboardTable tableData={tableDataUserReports} />
        </div>
      </div>
      <OnboardingModal 
        open={showOnboarding} 
        onOpenChange={setShowOnboarding} 
      />
    </DashboardLayout>
  );
}
