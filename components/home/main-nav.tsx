'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useEffect, useState } from "react";

export function MainNav() {
  const t = useTranslations('home');
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-sm shadow-sm" : "bg-transparent"
    )}>
      <div className="container flex h-20 items-center justify-between py-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold">{t('brand')}</span>
        </Link>
        <nav className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/dashboard/signin">
            <Button variant={isScrolled ? "default" : "outline"} className="rounded-full">
              {t('hero.cta.signin')}
            </Button>
          </Link>
        </nav>
      </div>
    </div>
  );
} 