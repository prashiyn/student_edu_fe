'use server';

import { createServerSideClient } from '@/utils/supabase/server';
import { getURL, getStatusRedirect } from '@/utils/helpers';

export async function updateUserEmail(newEmail: string) {
  const supabase = await createServerSideClient();
  const callbackUrl = getURL(
    getStatusRedirect(
      '/dashboard/settings',
      'Success!',
      `Your email has been updated.`
    )
  );

  const { error } = await supabase.auth.updateUser(
    { email: newEmail },
    { emailRedirectTo: callbackUrl }
  );

  if (error) throw error;
  return { success: true };
}

export async function updateUserName(userId: string, fullName: string) {
  const supabase = await createServerSideClient();

  // Update user_details
  const { error: detailsError } = await supabase
    .from('user_details')
    .update({ full_name: fullName })
    .eq('id', userId);

  if (detailsError) throw detailsError;

  // Update auth metadata
  const { error: authError } = await supabase.auth.updateUser({
    data: { full_name: fullName }
  });

  if (authError) throw authError;
  return { success: true };
} 