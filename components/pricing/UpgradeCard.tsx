'use client';

import { Button } from '@/components/ui/button';
import { HiOutlineCurrencyDollar } from 'react-icons/hi2';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function UpgradeCard() {
  const t = useTranslations('sidebar.upgrade');

  return (
    <div className="relative flex flex-col items-center rounded-lg border p-4">
      <div className="flex h-[40px] w-[40px] items-center justify-center rounded-md bg-primary text-primary-foreground">
        <HiOutlineCurrencyDollar className="h-5 w-5 stroke-2" />
      </div>
      <div className="mb-3 flex w-full flex-col pt-4">
        <p className="mb-2.5 text-center text-lg font-bold">
          {t('title')}
        </p>
        <p className="text-center text-sm font-medium text-muted-foreground">
          {t('description')}
          <span className="font-bold text-primary">{t('description2')}</span>
          {t('description3')}
        </p>
      </div>
      <Link href="/pricing" className="w-full">
        <Button className="w-full">
          {t('button')}
        </Button>
      </Link>
    </div>
  );
}
