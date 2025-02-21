import Settings from '@/components/dashboard/settings';
import { redirect } from 'next/navigation';
import { createServerSideClient } from '@/utils/supabase/server';
import {  getUser } from '@/utils/supabase/queries';

export default async function SettingsPage() {
  const supabase = await createServerSideClient();
  const { user, userDetails } = await getUser(supabase);
  if (!user) {
    return redirect('/dashboard/signin');
  }

  return <Settings userDetails={userDetails} user={user} />;
}
