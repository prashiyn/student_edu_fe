'use server';

import { createServerSideClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Provider } from '@supabase/supabase-js';
import { getURL } from '@/utils/helpers';

export async function signOut() {
  const supabase = await createServerSideClient();
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw error;
  }

  redirect('/dashboard/signin');
}

export async function signInWithOAuth(provider: Provider) {
  const supabase = await createServerSideClient();
  const redirectURL = getURL('/auth/callback');
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectURL
    }
  });

  if (error) throw error;
  
  if (data.url) {
    redirect(data.url);
  }
}

export async function handleAuthRequest(
  formData: FormData,
  requestFunc: (formData: FormData) => Promise<string>
): Promise<string> {
  const redirectUrl: string = await requestFunc(formData);
  return redirectUrl;
} 