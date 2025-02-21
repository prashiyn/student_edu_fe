'use client';

/* eslint-disable */
import NavLink from '@/components/link/NavLink';
import { IRoute } from '@/types/types';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface SidebarLinksProps extends PropsWithChildren {
  routes: IRoute[];
  [x: string]: any;
}

export function SidebarLinks(props: SidebarLinksProps) {
  const pathname = usePathname();

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = useCallback(
    (routeName: string) => pathname?.includes(routeName),
    [pathname]
  );
  const activeLayout = useCallback(
    (routeName: string) => {
      return pathname?.includes('/ai');
    },
    [pathname]
  );

  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes: IRoute[]) => {
    return routes.map((route, key) => {
      if (route.disabled) {
        return (
          <div
            key={key}
            className="flex w-full max-w-full cursor-not-allowed items-center justify-between rounded-lg py-3 pl-8 font-medium opacity-30"
          >
            <div className="w-full items-center justify-center">
              <div className="flex w-full items-center justify-center">
                <div className="mr-3 mt-1.5">
                  {route.icon}
                </div>
                <p className="mr-auto text-sm">
                  {route.name}
                </p>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div key={key}>
            <div
              className={cn(
                "flex w-full max-w-full items-center justify-between rounded-lg py-3 pl-8",
                activeRoute(route.path.toLowerCase())
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-foreground/70 font-medium hover:bg-muted"
              )}
            >
              <NavLink
                href={route.layout ? route.layout + route.path : route.path}
                key={key}
                styles={{ width: '100%' }}
              >
                <div className="w-full items-center justify-center">
                  <div className="flex w-full items-center justify-center">
                    <div className={cn(
                      "mr-3 mt-1.5",
                      activeRoute(route.path.toLowerCase())
                        ? "text-primary-foreground"
                        : "text-foreground/70"
                    )}>
                      {route.icon}
                    </div>
                    <p className={cn(
                      "mr-auto text-sm",
                      activeRoute(route.path.toLowerCase())
                        ? "text-primary-foreground font-semibold"
                        : "text-foreground/70 font-medium"
                    )}>
                      {route.name}
                    </p>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
        );
      }
    });
  };
  //  BRAND
  return <>{createLinks(routes)}</>;
}

export default SidebarLinks;
