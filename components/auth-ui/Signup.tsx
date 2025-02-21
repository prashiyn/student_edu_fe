'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import Link from 'next/link';
import { signUp } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Eye, EyeOff } from "lucide-react";
import { useTranslations } from 'next-intl';

// Define prop type with allowEmail boolean
interface SignUpProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function SignUp({ allowEmail, redirectMethod }: SignUpProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');
  const t = useTranslations('auth.signup');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setIsSubmitting(true);
    await handleRequest(e, signUp, router);
    setIsSubmitting(false);
  };

  return (
    <div className="mb-8">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {errorDescription || error}
          </AlertDescription>
        </Alert>
      )}

      <form
        noValidate={true}
        className="mb-4"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label className="text-zinc-950 dark:text-white" htmlFor="email">
              {t('email.label')}
            </label>
            <Input
              className="mr-2.5 mb-2 h-full min-h-[44px] w-full px-4 py-3 focus:outline-0 dark:placeholder:text-zinc-400"
              id="email"
              placeholder={t('email.placeholder')}
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
            <label
              className="text-zinc-950 mt-2 dark:text-white"
              htmlFor="password"
            >
              {t('password.label')}
            </label>
            <div className="relative">
              <Input
                id="password"
                placeholder={t('password.placeholder')}
                type={showPassword ? 'text' : 'password'}
                name="password"
                autoComplete="current-password"
                className="mr-2.5 mb-2 h-full min-h-[44px] w-full px-4 py-3 focus:outline-0 dark:placeholder:text-zinc-400"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="sr-only">
                  {showPassword ? 'Hide password' : 'Show password'}
                </span>
              </Button>
            </div>
          </div>
          <Button
            type="submit"
            className="mt-2 flex h-[unset] w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium"
          >
            {isSubmitting ? t('button.loading') : t('button.submit')}
          </Button>
        </div>
      </form>

      <p className="text-sm text-muted-foreground mb-4">
        {t('validation.passwordRequirements')}
      </p>

      <p>
        <Link
          href="/dashboard/signin/forgot_password"
          className="font-medium text-zinc-950 dark:text-white text-sm"
        >
          {t('links.forgotPassword')}
        </Link>
      </p>
      <p className="font-medium text-sm dark:text-white">
        <Link
          href="/dashboard/signin/password_signin"
          className="font-medium text-sm dark:text-white"
        >
          {t('links.existingAccount')}
        </Link>
      </p>
      {allowEmail && (
        <p className="font-medium text-sm dark:text-white">
          <Link
            href="/dashboard/signin/email_signin"
            className="font-medium text-sm dark:text-white"
          >
            {t('links.magicLink')}
          </Link>
        </p>
      )}
    </div>
  );
}
