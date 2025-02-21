'use client';

import { Button } from '../ui/button';
import Footer from '@/components/footer/FooterAuthDefault';
import { useTheme } from 'next-themes';
import { PropsWithChildren, useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa6';
import { HiBolt } from 'react-icons/hi2';
import { IoMoon, IoSunny } from 'react-icons/io5';
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface DefaultAuthLayoutProps extends PropsWithChildren {
  children: JSX.Element;
  viewProp: any;
}

export default function DefaultAuthLayout(props: DefaultAuthLayoutProps) {
  const { children } = props;
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('auth');

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const { theme, setTheme } = useTheme();
  
  if (!mounted) return null;
  
  return (
    <div className="relative min-h-screen bg-background">
      <div className={cn(
        "container flex min-h-screen flex-col items-center justify-center",
        "py-8 md:py-12 lg:py-16"
      )}>
        <Link 
          href="/" 
          className={cn(
            "absolute left-4 top-4 md:left-8 md:top-8",
            "flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
          )}
        >
          <FaChevronLeft className="mr-2 h-4 w-4" />
          {t('navigation.back')}
        </Link>
        
        <div className={cn(
          "mx-auto flex w-full flex-col justify-center",
          "space-y-6 sm:w-[350px]"
        )}>
          {children}
        </div>
        
        <Footer />
      </div>

      <Button
        className={cn(
          "fixed bottom-4 right-4 size-10 rounded-full md:bottom-8 md:right-8",
          "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'light' ? (
          <IoMoon className="h-4 w-4" />
        ) : (
          <IoSunny className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
