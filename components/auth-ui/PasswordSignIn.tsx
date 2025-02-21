'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signInWithPassword } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { useTranslations } from 'next-intl';

// Define prop type with allowEmail boolean
interface PasswordSignInProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function PasswordSignIn({
  allowEmail,
  redirectMethod
}: PasswordSignInProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations('auth.password_signin');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, signInWithPassword, router);
    setIsSubmitting(false);
  };

  return (
    <div>
      <form
        noValidate={true}
        className="mb-4"
        onSubmit={(e) => handleSubmit(e)}
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
            <Input
              id="password"
              placeholder={t('password.placeholder')}
              type="password"
              name="password"
              autoComplete="current-password"
              className="mr-2.5 mb-2 h-full min-h-[44px] w-full px-4 py-3 focus:outline-0 dark:placeholder:text-zinc-400"
            />
          </div>
          <Button
            type="submit"
            className="mt-2 flex h-[unset] w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium"
          >
            {isSubmitting ? t('button.loading') : t('button.submit')}
          </Button>
        </div>
      </form>
      <p>
        <Link
          href="/dashboard/signin/forgot_password"
          className="font-medium text-zinc-950 dark:text-white text-sm"
        >
          {t('links.forgot')}
        </Link>
      </p>
      {allowEmail && (
        <p>
          <Link
            href="/dashboard/signin/email_signin"
            className="font-medium text-zinc-950 dark:text-white text-sm"
          >
            {t('links.magic')}
          </Link>
        </p>
      )}
      <p>
        <Link
          href="/dashboard/signin/signup"
          className="font-medium text-zinc-950 dark:text-white text-sm"
        >
          {t('links.signup')}
        </Link>
      </p>
    </div>
  );
}
