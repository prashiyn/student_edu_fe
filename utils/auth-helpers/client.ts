'use client'
import { type Provider } from '@supabase/supabase-js';
import { signInWithOAuth, handleAuthRequest } from '@/utils/actions/auth';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export async function handleRequest(
  e: React.FormEvent<HTMLFormElement>,
  requestFunc: (formData: FormData) => Promise<string>,
  router: AppRouterInstance | null = null
): Promise<void> {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);

  try {
    const redirectUrl = await handleAuthRequest(formData, requestFunc);
    if (router) {
      router.push(redirectUrl);
    } else {
      window.location.href = redirectUrl;
    }
  } catch (error) {
    console.error('Auth error:', error);
  }
}

export async function handleOAuthSignIn(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const provider = String(formData.get('provider')).trim() as Provider;
  
  try {
    await signInWithOAuth(provider);
  } catch (error) {
    console.error('OAuth sign in error:', error);
  }
}
