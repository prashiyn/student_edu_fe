'use client';

// Auth Imports
import { IRoute } from '@/types/types';
import {
  HiOutlineHome,
  HiOutlineCpuChip,
  HiOutlineUsers,
  HiOutlineUser,
  HiOutlineCog8Tooth,
  HiOutlineCreditCard,
  HiOutlineDocumentText,
  HiOutlineCurrencyDollar
} from 'react-icons/hi2';
import { useTranslations } from 'next-intl';

export function useRoutes(): IRoute[] {
  const t = useTranslations('navigation.routes');
  
  return [
    {
      name: t('main_dashboard.name'),
      path: '/dashboard/main',
      icon: <HiOutlineHome className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
      collapse: false
    },
    {
      name: t('ai_chat.name'),
      path: '/dashboard/ai-chat',
      icon: <HiOutlineCpuChip className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
      collapse: false
    },
    {
      name: t('profile_settings.name'),
      path: '/dashboard/settings',
      icon: <HiOutlineCog8Tooth className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
      collapse: false
    },
    {
      name: t('ai_generator.name'),
      path: '/dashboard/ai-generator',
      icon: <HiOutlineDocumentText className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
      collapse: false,
      disabled: true
    },
    {
      name: t('ai_assistant.name'),
      path: '/dashboard/ai-assistant',
      icon: <HiOutlineUser className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
      collapse: false,
      disabled: true
    },
    {
      name: t('users_list.name'),
      path: '/dashboard/users-list',
      icon: <HiOutlineUsers className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
      collapse: false,
      disabled: true
    },
    {
      name: t('subscription.name'),
      path: '/dashboard/subscription',
      icon: <HiOutlineCreditCard className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
      collapse: false,
      disabled: true
    },
    {
      name: t('landing.name'),
      path: '/home',
      icon: <HiOutlineDocumentText className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
      collapse: false,
      disabled: true
    },
    {
      name: t('pricing.name'),
      path: '/pricing',
      icon: <HiOutlineCurrencyDollar className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
      collapse: false,
      disabled: true
    }
  ];
}
