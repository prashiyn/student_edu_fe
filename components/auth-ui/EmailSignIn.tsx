'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signInWithEmail } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '../ui/input';
import { useTranslations } from 'next-intl';

// Define prop type with allowPassword boolean
interface EmailSignInProps {
  allowPassword: boolean;
  redirectMethod: string;
  disableButton?: boolean;
}

export default function EmailSignIn({
  allowPassword,
  redirectMethod
}: EmailSignInProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations('auth.email_signin');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, signInWithEmail, router);
    setIsSubmitting(false);
  };

  return (
    <div className="mb-8">
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
              className="mr-2.5 mb-2 h-full min-h-[44px] w-full px-4 py-3 text-sm font-medium focus:outline-0 dark:placeholder:text-zinc-400"
              id="email"
              placeholder={t('email.placeholder')}
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
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
      {allowPassword && (
        <>
          <p>
            <Link
              href="/dashboard/signin/password_signin"
              className="font-medium text-sm dark:text-white"
            >
              {t('links.password')}
            </Link>
          </p>
          <p>
            <Link
              href="/dashboard/signin/signup"
              className="font-medium text-sm dark:text-white"
            >
              {t('links.signup')}
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
