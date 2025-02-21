'use client';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  renderThumb,
  renderTrack,
  renderView
} from '@/components/scrollbar/Scrollbar';
import Links from '@/components/sidebar/components/Links';
import UpgradeCard from '@/components/pricing/UpgradeCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { IRoute } from '@/types/types';
import React, { PropsWithChildren, useContext } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { HiX } from 'react-icons/hi';
import { SiStudyverse } from "react-icons/si";
import { HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';
import { UserContext, UserDetailsContext } from '@/contexts/layout';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { signOut } from '@/utils/actions/auth';

export interface SidebarProps extends PropsWithChildren {
  routes: IRoute[];
  [x: string]: any;
}

function Sidebar(props: SidebarProps) {
  const { routes } = props;
  const t = useTranslations('sidebar');
  const user = useContext(UserContext);
  const userDetails = useContext(UserDetailsContext);

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <div className={`lg:!z-99 fixed !z-[99] min-h-full w-[300px] transition-all md:!z-[99] xl:!z-0 ${
      props.variant === 'auth' ? 'xl:hidden' : 'xl:block'
    } ${props.open ? '' : '-translate-x-[120%] xl:translate-x-[unset]'}`}>
      <Card className={`m-3 ml-3 h-[96.5vh] w-full overflow-hidden !rounded-lg border-zinc-200 pe-4 dark:border-zinc-800 sm:my-4 sm:mr-4 md:m-5 md:mr-[-50px]`}>
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}
          universal={true}
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <span
                className="absolute top-4 block cursor-pointer text-muted-foreground xl:hidden"
                onClick={() => props.setOpen(false)}
              >
                <HiX />
              </span>
              <div className={`mt-8 flex items-center justify-center`}>
                <div className="me-2 flex h-[40px] w-[40px] items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <SiStudyverse className="h-5 w-5" />
                </div>
                <h5 className="me-2 text-2xl font-bold leading-5 text-primary">
                  {t('brand.name')}
                </h5>
              </div>
              <div className="mb-8 mt-8 h-px bg-border" />
              <ul>
                <Links routes={routes} />
              </ul>
            </div>
            <div className="mb-9 mt-7">
              <div className="flex justify-center">
                <UpgradeCard />
              </div>

              <div className="mt-5 flex w-full items-center rounded-lg border p-4">
                <Link href="/dashboard/settings">
                  <Avatar className="min-h-10 min-w-10">
                    <AvatarImage src={user?.user_metadata.avatar_url} />
                    <AvatarFallback className="font-bold">
                      {userDetails?.full_name?.[0] || user?.user_metadata.email?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <Link href="/dashboard/settings">
                  <p className="ml-2 mr-3 flex items-center text-sm font-semibold leading-none">
                    {userDetails?.full_name || 
                     user?.user_metadata?.full_name || 
                     t('profile.defaultName')}
                  </p>
                </Link>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="ml-auto flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full p-0 text-center text-sm font-medium"
                  type="submit"
                  aria-label={t('profile.signOut.ariaLabel')}
                >
                  <HiOutlineArrowRightOnRectangle
                    className="h-4 w-4 stroke-2"
                    width="16px"
                    height="16px"
                  />
                </Button>
              </div>
            </div>
          </div>
        </Scrollbars>
      </Card>
    </div>
  );
}

export default Sidebar;
